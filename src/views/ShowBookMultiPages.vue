<template>
  <div
    class="showPages"
    :class="{ hideMarkers: !showMarkers }"
    :pageInViewport="pageInViewport"
  >
    <AppHeaderEbook v-if="$route.name == 'showBook'" :maxpages="book.pages">
      {{ $store.state.user.vorname }}
      {{ $store.state.user.nachname }}
    </AppHeaderEbook>
    <nav class="pageNav">
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
        <div @click="toggleShowMarkers()">
          <IconShow size="35px" fill="#fff" :on="showMarkers" />
        </div>
      </div>
      <div class="rightNav">
        <span class="addbtn click" @click="zoomin('in')">+</span>
        <span>{{ zoom }}%</span>
        <span class="addbtn click" @click="zoomin('out')">-</span>
        <span
          class="big click"
          :class="{ notActive: curPage <= 0 }"
          @click="chgPage('prev')"
        >
          &#10092;
        </span>
        &nbsp;
        <span
          class="big click"
          :class="{ notActive: curPage >= book.pages - 1 }"
          @click="chgPage('next')"
        >
          &#10093;
        </span>
        <!-- span> Seite {{ curPage + 1 }} / {{ book.pages }} </span -->
      </div>
    </nav>
    <div v-if="false">
      <ImageCanvas
        v-for="(page, index) in pages"
        :key="index"
        :no="index"
        :imgurl="page"
        :zoom="zoom"
        :showmarkers="showMarkers"
      />
    </div>

    <PdfCanvas
      v-for="(page, index) in pages"
      :key="index"
      :no="index + 1"
      :dataurl="getDataUrl()"
      :zoom="zoom"
      :showmarkers="showMarkers"
      :observer="observer"
    />
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import IconShow from "@/components/IconShow.vue";
import ImageCanvas from "@/components/ImageCanvas.vue";
import PdfCanvas from "@/components/PdfCanvas.vue";
import AppHeaderEbook from "@/components/AppHeaderEbook.vue";

export default {
  name: "ShowBookMultiPages",
  components: {
    IconShow,
    ImageCanvas,
    AppHeaderEbook,
    PdfCanvas,
  },
  data() {
    return {
      state: {
        showMarkerEdit: false,
        setNewMarker: true,
      },
      books: [],
      book: {},
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
      showMarkers: false,
      currentMarker: {},
      pages: [],
      zoom: 75,
      observer: null,
      pageInViewport: 1,
    };
  },
  computed: {
    ...mapState(["curMarker", "markers", "currentBook", "curPage"]),
    ...mapGetters(["getBooks"]),
  },
  created() {
    this.observer = new IntersectionObserver(this.onElementObserved, {
      root: this.$el,
      threshold: 1.0,
    });
  },
  beforeUnmount() {
    this.observer.disconnect();
  },
  mounted() {
    let bookId = this.currentBook.id;
    this.setCurPage(1);
    // console.log("bookId-->", bookId);
    this.books = this.getBooks;
    this.book = this.books.find((b) => b.id == bookId);
    // console.log("book-----", this.book);
    this.setPagesArray();
    this.getMarkersFromDb();
    // [{bookId: xx, page: pp, markers: [{index: i, desc: d, x: p.x, y: p.y, color: c}, ...]}, ...]
    // TODO
  },
  // unmounted() {
  //   window.removeEventListener("resize", this.resizeEvent);
  // },
  methods: {
    ...mapActions([
      "setModal",
      "setCurrentMarker",
      "getMarkersFromDb",
      "setCurPage",
    ]),
    onElementObserved(entries) {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) {
          return;
        }

        this.observer.unobserve(target);

        setTimeout(() => {
          const i = target.getAttribute("data-no");
          this.pageInViewport = i;
          // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", i);
        }, 1000);
        // console.log("----------");
      });
    },
    toggleShowMarkers() {
      this.showMarkers = !this.showMarkers;
      if (!this.showMarkers) {
        this.setNewMarkerColor("");
      }
    },
    zoomin(inout) {
      const max = 150;
      const min = 50;
      if (inout == "in") {
        this.zoom = this.zoom + 25;
      }
      if (inout == "out") {
        this.zoom = this.zoom - 25;
      }
      if (this.zoom < min) {
        this.zoom = min;
      }
      if (this.zoom > max) {
        this.zoom = max;
      }
    },
    setPagesArray() {
      this.pages = [];
      for (let i = 0; this.book.pages > i; i++) {
        this.pages.push(this.getImgUrl(i));
      }
    },
    getElement(no) {
      let arg = "[data-page=page-" + no + "]";
      // console.log("arg", arg);
      this.target = document.querySelector(arg);
      return this.target;
    },
    chgPage(dir) {
      // console.log("chgPage", this.curPage);
      let newPageNo = 1;
      if (dir == "next") {
        if (this.curPage < this.book.pages - 1) {
          newPageNo = this.curPage + 1;
          this.setCurPage(newPageNo);
        }
      }
      if (dir == "prev") {
        if (this.curPage > 1) {
          newPageNo = this.curPage - 1;
          this.setCurPage(newPageNo);
        }
      }
      let pageBox = this.getElement(this.curPage);
      pageBox.scrollIntoView();
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
    getDataUrl() {
      return `data/${this.book.id}/`;
    },
    setNewMarkerColor(color) {
      // console.log("setNewMarkerColor: ", color);
      if (color == this.curMarker) {
        this.setCurrentMarker("");
      } else {
        this.setCurrentMarker(color);
        this.state.setNewMarker = true;
      }
      if (color != "") {
        this.showMarkers = true;
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
  },
};
</script>

<style scroped lang="scss">
.addbtn {
  font-size: 1.6em;
}
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
  z-index: 13;
  bottom: 0px;
  width: 95%;
  max-width: 100%;
  height: 70px;
  div {
    gap: 10px;
    display: flex;
    align-items: center;
  }
  @media (max-width: 650px) {
    height: 50px;
  }
}
.imgContent {
  position: relative;
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
circle {
  stroke: #000;
}
.active circle {
  stroke: #fff;
}
.showPages {
  position: relative;
  margin-top: 70px;
}
@media (max-width: 650px) {
  .showPage {
    margin-top: 50px;
  }
}
</style>
