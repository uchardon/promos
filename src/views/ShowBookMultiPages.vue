<template>
  <div class="showPages">
    <nav class="pageNav">
      <div class="leftNav">
        <div class="big click" @click="$router.push({ name: 'mybooks' })">
          &larr;
        </div>
        <div class="inhalt pointer" @click="showIndex()">Index</div>
      </div>
      <div class="centerNav">
        <svg
          v-for="(color, index) in colors"
          :key="index"
          :class="{ active: curMarker == color }"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          style="width: 30px; height: 30px"
          @click="setNewMarkerColor(color)"
        >
          <circle cx="50" cy="50" r="40" stroke-width="7px" :fill="color" />
        </svg>
        <div @click="showMarkers = !showMarkers">
          <IconShow size="35px" fill="#fff" :on="showMarkers" />
        </div>
      </div>
      <div class="rightNav">
        <span
          class="big click"
          :class="{ notActive: currentPage <= 0 }"
          @click="chgPage('prev')"
        >
          &#10092;
        </span>
        &nbsp;
        <span
          class="big click"
          :class="{ notActive: currentPage >= book.pages - 1 }"
          @click="chgPage('next')"
        >
          &#10093;
        </span>
        <span> Seite {{ currentPage + 1 }} / {{ book.pages }} </span>
      </div>
    </nav>
    <ImageCanvas
      v-for="(page, index) in pages"
      :key="index"
      :no="index"
      :imgurl="page"
    />
    {{ markers }}
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import IconShow from "@/components/IconShow.vue";
import ImageCanvas from "@/components/ImageCanvas.vue";

export default {
  name: "ShowBookMultiPages",
  components: {
    IconShow,
    ImageCanvas,
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
      pages: [],
    };
  },
  computed: {
    ...mapState(["curMarker"]),
  },
  mounted() {
    let bookId = this.$store.state.currentBook.id;
    // console.log("bookId-->", bookId);
    this.books = this.$store.getters.getBooks;
    this.book = this.books.find((b) => b.id == bookId);
    this.setPagesArray();
    // [{bookId: xx, page: pp, markers: [{index: i, desc: d, x: p.x, y: p.y, color: c}, ...]}, ...]
    // TODO
  },
  // unmounted() {
  //   window.removeEventListener("resize", this.resizeEvent);
  // },
  methods: {
    ...mapActions(["setModal", "setCurrentMarker"]),
    setPagesArray() {
      this.pages = [];
      for (let i = 0; this.book.pages > i; i++) {
        this.pages.push(this.getImgUrl(i));
      }
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
    },
    deleteMarker(marker) {
      // console.log(marker.index);
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
    getBox(target) {
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
    getImgUrl(i) {
      return `${this.$store.state.dataUrl}${this.book.id}/page-${i}.jpg`;
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
      if (color == this.curMarker) {
        this.setCurrentMarker("");
      } else {
        this.setCurrentMarker(color);
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
      const target = document.getElementById("imgcanvas");
      this.getBox(target);
      // TODO make it work
      // this.getBox();
    },
  },
};
</script>

<style lang="scss">
.click {
  cursor: pointer;
}
.wrapper {
  width: 100%;
  max-width: 100%;
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
  max-width: 100%;
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
@media (max-width: 650px) {
  .pageNav {
    position: fixed;
    top: 0px;
  }
  .showPage {
    margin-top: 70px;
  }
}
</style>
