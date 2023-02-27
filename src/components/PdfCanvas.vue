<template>
  <div
    class="showPage"
    :style="'--zoom: calc(' + zoom + ' / 100)'"
    :data-no="no"
  >
    <div
      xv-touch:drag="movingHandler()"
      :data-page="'page-' + no"
      class="imgContent"
      :class="{ showMarkers: showMarkers }"
      draggable="true"
      @click="setNewMarker($event)"
    >
      <ImgMarkerSvg
        v-for="(marker, index) in filteredMarkers"
        :key="index"
        :box="box"
        :pos-x="(box.width / 100) * marker.x - 8"
        :pos-y="(box.height / 100) * marker.y - 8"
        :color="marker.color"
        @edit-marker="editMarker(index)"
      >
      </ImgMarkerSvg>
      <pdf
        :src="dataurl + 'buch.pdf'"
        :page="no"
        :resize="true"
        @loading="resizeEvent($event)"
      >
        <template #loading> loading content here... </template>
      </pdf>
    </div>
    <div v-if="no > 0" class="pageno">Seite {{ no }}</div>
    <div v-else class="pageno">&nbsp;</div>
    {{ box.width }} x {{ box.height }}
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import pdf from "pdfvuer";
// import "pdfjs-dist/build/pdf.worker.entry";
import ImgMarkerSvg from "@/components/ImgMarkerSvg.vue";

export default {
  name: "ImageCanvas",
  components: {
    ImgMarkerSvg,
    pdf,
  },
  props: {
    // eslint-disable-next-line
    observer: {
      type: Object,
    },
    dataurl: {
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
    ...mapState(["curMarker", "markers", "markerToEdit"]),
    ...mapGetters(["getBooks", "getMarkersByBookpage"]),
    filteredMarkers() {
      return this.getMarkersByBookpage({
        page: this.no,
      }).markers;
    },
  },
  mounted() {
    this.observer.observe(this.$el);
    let bookId = this.$store.state.currentBook.id;
    // console.log("bookId-->", bookId);
    this.books = this.getBooks;
    this.book = this.books.find((b) => b.id == bookId);
    // this.getMarkersFromDb();
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
    movingHandler() {
      console.log("myTouchStartHandler");
    },
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
    // deleteMarker(marker,i) {
    //   console.log(marker.index);
    //   // this.pageMarkers.splice(marker.index, 1);
    //   // tod marker data to store
    //   this.markerToEdit.content = {
    //     index: -1,
    //     desc: "",
    //     x: 1,
    //     y: 1,
    //     color: this.curMarker,
    //   };
    //   this.markerToEdit.content = this.pageMarkers[i];
    //   this.markerToEdit.todo = "del";
    //   this.markerToEdit.bookId = this.book.id;
    //   this.markerToEdit.page = this.no;
    //   this.setModal({ state: true, content: "MarkerEdit" });

    //   this.saveMarkersToDB();
    // },
    editMarker(i) {
      // console.log("index: ", i);
      this.state.setNewMarker = false;
      this.markerToEdit.content = this.filteredMarkers[i];
      this.markerToEdit.todo = "edit";
      this.markerToEdit.bookId = this.book.id;
      this.markerToEdit.page = this.no;
      // this.showModal(true);
      this.setModal({ state: true, content: "MarkerEdit" });
    },
    getMarkersByPage() {
      // console.log("getMarkersByPage", this.no);
      let pagema = this.getMarkersByBookpage({
        // bookId: this.book.id,
        page: this.no,
      });
      console.log("pagema", pagema);
      if (pagema.lendth == 0) {
        this.pageMarkers = [];
      } else {
        this.pageMarkers = pagema.markers;
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
    setNewMarker(e) {
      console.log("setNewMarker", this.state.showMarkerEdit);
      if (this.curMarker != "" && !this.state.showMarkerEdit) {
        this.getBox(e.target);
        var x = (e.clientX - this.box.posX) / this.box.faktorX; // x position within the element. <->
        var y = (e.clientY - this.box.posY) / this.box.faktorY; // y position within the element.  |
        this.markerToEdit.content = {
          index: -1,
          desc: "",
          x: Math.round(x),
          y: Math.round(y),
          color: this.curMarker,
        };
        this.markerToEdit.todo = "new";
        this.markerToEdit.bookId = this.book.id;
        this.markerToEdit.page = this.no;
        this.setModal({ state: true, content: "MarkerEdit" });
      }
    },
    showModal(state) {
      console.log("showModal");
      this.state.showMarkerEdit = state;
      if (!state) {
        this.state.setNewMarker = false;
      }
    },
    resizeEvent(st) {
      console.log("resizeEvent", st, this.target);
      if (!st) {
        this.getBox(this.target);
      }
    },
  },
};
</script>
<style>
.textLayer > span {
  pointer-events: none;
}
#viewerContainer {
  overflow: hidden;
}
</style>
<style lang="scss" scoped>
.click {
  cursor: pointer;
}

.showPages {
  position: relative;
}
.showPage {
  position: relative;
  width: calc(var(--zoom) * 100%);
  overflow: hidden;
  margin: 0px auto;
  .imgContent {
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  }
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
  /*transform: scale(1);*/
  overflow: hidden;
  /* transform: scale(var(--zoom, 1));*/
  img {
    width: 100%;
  }
  outline: 2px solid red;
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
</style>
