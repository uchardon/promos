<template>
  <div class="showPage" :style="'--zoom: calc(' + zoom + ' / 100)'">
    <MarkerEdit
      v-if="state.showMarkerEdit"
      :new-marker="state.setNewMarker"
      :current-marker="currentMarker"
      @del-marker="deleteMarker($event)"
      @save-marker="saveMarker($event)"
      @close-modal="showModal(false)"
    />
    <div
      :data-page="'page-' + no"
      class="imgContent"
      :class="{ showMarkers: showMarkers }"
      @click="setNewMarker($event)"
    >
      <ImgMarkerSvg
        v-for="(marker, index) in pageMarkers"
        :key="index"
        :box="box"
        :pos-x="(box.width / 100) * marker.x"
        :pos-y="(box.height / 100) * marker.y"
        :color="marker.color"
        @edit-marker="editMarker(index)"
      >
      </ImgMarkerSvg>
      <img :src="imgurl" :alt="book.title" @load="resizeEvent()" />
    </div>
    <div v-if="no > 0" class="pageno">Seite {{ no }}</div>
    <div v-else class="pageno">&nbsp;</div>
    {{ pageMarkers }}

    <button @click="getMarkersByPage()">get</button>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import ImgMarkerSvg from "@/components/ImgMarkerSvg.vue";
import MarkerEdit from "@/components/MarkerEdit.vue";

export default {
  name: "ImageCanvas",
  components: {
    ImgMarkerSvg,
    MarkerEdit,
  },
  props: {
    imgurl: {
      type: String,
      required: true,
    },
    no: {
      type: Number,
      required: true,
    },
    zoom: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      state: {
        showMarkerEdit: false,
        setNewMarker: true,
      },
      books: [],
      book: {},
      target: null,
      box: {
        width: 0,
        height: 0,
        posX: 0,
        posY: 0,
        faktorX: 0,
        faktorY: 0,
      },
      colors: ["#ff0000", "#ffff00", "#0000ff"],
      currentColor: "",
      pageMarkers: [],
      showMarkers: true,
      currentMarker: {},
    };
  },
  computed: {
    ...mapState(["curMarker"]),
    ...mapGetters(["getBooks", "getMarkersByBookpage"]),
  },
  mounted() {
    let bookId = this.$store.state.currentBook.id;
    // console.log("bookId-->", bookId);
    this.books = this.getBooks;
    this.book = this.books.find((b) => b.id == bookId);
    this.getMarkersByPage();
    const target = this.getElement();
    this.getBox(target, "mo");
    // [{bookId: xx, page: pp, markers: [{index: i, desc: d, x: p.x, y: p.y, color: c}, ...]}, ...]
    // TODO
    window.addEventListener("resize", this.resizeEvent);
  },
  // unmounted() {
  //   window.removeEventListener("resize", this.resizeEvent);
  // },
  methods: {
    ...mapActions(["setModal", "setMarkersForBook", "saveMarkersToDB"]),
    getElement() {
      let arg = "[data-page=page-" + this.no + "]";
      // console.log("arg", arg);
      this.target = document.querySelector(arg);
      return this.target;
    },
    debug(p) {
      console.log(p);
      this.resizeEvent();
    },
    deleteMarker(marker) {
      console.log(marker.index);
      this.pageMarkers.splice(marker.index, 1);
      this.showModal(false);
      this.setMarkersForBook({
        bookId: this.book.id,
        page: this.no,
        markers: this.pageMarkers,
      });
      this.saveMarkersToDB();
    },
    editMarker(i) {
      // console.log("index: ", i);
      this.state.setNewMarker = false;
      this.currentMarker = this.pageMarkers[i];
      this.showModal(true);
    },
    getMarkersByPage() {
      // console.log("getMarkersByPage", this.no);
      let pm = this.getMarkersByBookpage({
        bookId: this.book.id,
        page: this.no,
      });
      // console.log("pm", pm);
      if (pm == -1) {
        this.pageMarkers = [];
      } else {
        this.pageMarkers = pm.markers;
      }
    },
    getBox(target) {
      // console.log("getBox", target);
      let rect = target.getBoundingClientRect();
      let width = target.offsetWidth;
      let height = target.offsetHeight;
      this.box = {
        width: width,
        height: height,
        posX: rect.left,
        posY: rect.top,
        faktorX: width / 100,
        faktorY: height / 100,
      };
    },
    setIndex() {
      this.pageMarkers.forEach((m, i) => {
        m.index = i;
      });
    },
    saveMarker(marker) {
      console.log("saveMarker");
      if (marker.index == -1) {
        console.log("NEW MARKER");
        // NEW MARKER
        this.pageMarkers.push(marker);
        this.setIndex();
        this.setMarkersForBook({
          bookId: this.book.id,
          page: this.no,
          markers: this.pageMarkers,
        });
      } else {
        // UPDATE MARKER
        console.log("NEW UPDATE");
        this.pageMarkers[marker.index] = marker;
        this.setMarkersForBook({
          bookId: this.book.id,
          page: this.no,
          markers: this.pageMarkers,
        });
      }
      this.showModal(false);
      this.saveMarkersToDB();
      // TODO save to store
    },
    setNewMarker(e) {
      console.log("setNewMarker");
      if (this.curMarker != "" && !this.state.showMarkerEdit) {
        this.getBox(e.target);
        var x = (e.clientX - this.box.posX) / this.box.faktorX; // x position within the element. <->
        var y = (e.clientY - this.box.posY) / this.box.faktorY; // y position within the element.  |
        this.currentMarker = {
          index: -1,
          desc: "",
          x: Math.round(x),
          y: Math.round(y),
          color: this.curMarker,
        };
        // openModal
        console.log("setNewMarker2");
        this.showModal(true);
      }
    },
    showModal(state) {
      console.log("showModal");
      this.state.showMarkerEdit = state;
      if (!state) {
        this.state.setNewMarker = false;
      }
    },
    showIndex() {
      // console.log("showIndex");
      this.setModal({ state: true, content: "ShowBookIndex" });
    },
    resizeEvent() {
      // console.log("resizeEvent");
      this.getBox(this.target);
    },
  },
};
</script>

<style lang="scss" scoped>
.click {
  cursor: pointer;
}
.showPage {
  position: relative;
}
nav.pageNav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #101820;
  padding: 0px 2.5%;
  color: #fff;
  position: fixed;
  z-index: 3;
  bottom: 0px;
  width: 95%;
  max-width: 1600px;
  height: 70px;
  div {
    gap: 10px;
    display: flex;
    align-items: center;
  }
}
.imgContent {
  position: relative;
  transform: scale(1);
  overflow: auto;
  transform: scale(var(--zoom, 1));
  img {
    width: 100%;
  }
}
.big {
  font-size: 1.7em;
}
.centerNav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.marker {
  position: absolute;
  z-index: 10;
}
.hideMarkers .marker {
  display: none;
}
circle {
  stroke: #000;
}
.active circle {
  stroke: #fff;
}
.showPages {
  position: relative;
}
</style>
