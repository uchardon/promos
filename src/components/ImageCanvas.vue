<template>
  <div class="showPage" :data-page="'page-' + no">
    <div
      :data-page="'page-' + no"
      class="imgContent"
      :class="{ showMarkers: showMarkers }"
      @click="setNewMarker($event)"
    >
      <ImgMarkerSvg
        v-for="(marker, index) in markers"
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
    {{ imgurl }}{{ no }}
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ImgMarkerSvg from "@/components/ImgMarkerSvg.vue";

export default {
  name: "ImageCanvas",
  components: {
    ImgMarkerSvg,
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
  },
  data() {
    return {
      state: {
        showMarkerEdit: false,
        setNewMarker: true,
      },
      books: [],
      book: {},
      currentPage: 0,
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
      markers: [],
      showMarkers: true,
      currentMarker: {},
    };
  },
  mounted() {
    let bookId = this.$store.state.currentBook.id;
    // console.log("bookId-->", bookId);
    this.books = this.$store.getters.getBooks;
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
    ...mapActions(["setModal"]),
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
    chgPage(dir) {
      if (dir == "next") {
        if (this.currentPage < this.book.pages - 1) {
          this.currentPage++;
        }
      }
      if (dir == "prev") {
        if (this.currentPage > 0) {
          this.currentPage--;
        }
      }
      this.getMarkersByPage();
    },
    deleteMarker(marker) {
      console.log(marker.index);
      this.markers.splice(marker.index, 1);
      this.showModal(false);
      this.$store.dispatch("setMarkersForBook", {
        bookId: this.book.id,
        page: this.currentPage,
        markers: this.markers,
      });
    },
    editMarker(i) {
      // console.log("index: ", i);
      this.state.setNewMarker = false;
      this.setNewMarkerColor(this.currentColor);
      this.markers[i].index = i;
      this.currentMarker = this.markers[i];
      this.showModal(true);
    },
    getMarkersByPage() {
      let pm = this.$store.getters.getMarkersByBookpage({
        bookId: this.book.id,
        page: this.currentPage,
      });
      console.log("pm", pm);
      if (pm == -1) {
        this.markers = [];
      } else {
        this.markers = pm.markers;
      }
    },
    getBox(target) {
      console.log("getBox", target);
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
    saveMarker(marker) {
      if (marker.index == -1) {
        // NEW MARKER
        this.markers.push(marker);
        this.$store.dispatch("setMarkersForBook", {
          bookId: this.book.id,
          page: this.currentPage,
          markers: this.markers,
        });
        this.showModal(false);
      } else {
        // UPDATE MARKER
        this.markers[marker.index] = marker;
        this.$store.dispatch("setMarkersForBook", {
          bookId: this.book.id,
          page: this.currentPage,
          markers: this.markers,
        });
        this.showModal(false);
      }
      // TODO save to store
    },
    setNewMarker(e) {
      if (this.currentColor != "" && !this.state.showMarkerEdit) {
        this.getBox(e.target);
        var x = (e.clientX - this.box.posX) / this.box.faktorX; // x position within the element. <->
        var y = (e.clientY - this.box.posY) / this.box.faktorY; // y position within the element.  |
        this.currentMarker = {
          index: -1,
          desc: "",
          x: Math.round(x),
          y: Math.round(y),
          color: this.currentColor,
        };
        // openModal
        this.showModal(true);
      }
    },
    setNewMarkerColor(color) {
      // console.log("setNewMarkerColor: ", color);
      if (color == this.currentColor) {
        // console.log("reset: ", color);
        this.currentColor = "";
      } else {
        // console.log("chg: ", color);
        this.currentColor = color;
        this.state.setNewMarker = true;
      }
    },
    showModal(state) {
      this.state.showMarkerEdit = state;
      if (!state) {
        this.setNewMarkerColor(this.currentColor);
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

<style lang="scss">
.click {
  cursor: pointer;
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
  img {
    width: 100%;
  }
  &.showMarkers {
    svg {
      display: block;
    }
  }
  svg {
    display: none;
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
