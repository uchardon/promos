<template>
  <div class="showPages" :class="{ hideMarkers: !showMarkers }">
    <AppHeaderEbook v-if="$route.name == 'showBook'">
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
        <div @click="showMarkers = !showMarkers">
          <IconShow size="35px" fill="#fff" :on="showMarkers" />
        </div>
      </div>
      <div class="rightNav">
        <span class="addbtn click" @click="zoomin('in')">+</span>
        <span>{{ zoom }}%</span>
        <span class="addbtn click" @click="zoomin('out')">-</span>
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
        <!-- span> Seite {{ currentPage + 1 }} / {{ book.pages }} </span -->
      </div>
    </nav>
    <div class="ShowPageContainer">
      <h1>{{ book.title }}</h1>
      <ImageCanvas
        v-for="(page, index) in pages"
        :key="index"
        :no="index"
        :imgurl="page"
        :zoom="zoom"
        :showmarkers="showMarkers"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import IconShow from "@/components/IconShow.vue";
import ImageCanvas from "@/components/ImageCanvas.vue";
import AppHeaderEbook from "@/components/AppHeaderEbook.vue";

export default {
  name: "ShowBookMultiPages",
  components: {
    IconShow,
    ImageCanvas,
    AppHeaderEbook,
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
      showMarkers: false,
      currentMarker: {},
      pages: [],
      zoom: 50,
    };
  },
  computed: {
    ...mapState(["curMarker", "markers", "currentBook"]),
    ...mapGetters(["getBooks"]),
  },
  mounted() {
    let bookId = this.currentBook.id;
    // console.log("bookId-->", bookId);
    this.books = this.getBooks;
    this.book = this.books.find((b) => b.id == bookId);
    this.setPagesArray();
    this.getMarkersFromDb();
    // [{bookId: xx, page: pp, markers: [{index: i, desc: d, x: p.x, y: p.y, color: c}, ...]}, ...]
    // TODO
  },
  // unmounted() {
  //   window.removeEventListener("resize", this.resizeEvent);
  // },
  methods: {
    ...mapActions(["setModal", "setCurrentMarker", "getMarkersFromDb"]),
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
      let pageBox = this.getElement(this.currentPage);
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
  },
};
</script>

<style scroped lang="scss">
h1 {
  padding: 50px;
  text-align: left;
  @media (max-width: 650px) {
    padding: 0px 25px 25px 25px;
  }
}

.DoublePageAnsicht {
  background: #000;
}

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
