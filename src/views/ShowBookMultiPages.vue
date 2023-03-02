<template>
  <div
    class="showPages"
    :class="{ hideMarkers: !showMarkers }"
    :pageInViewport="pageInViewport"
  >
    <AppHeaderEbook
      v-if="$route.name == 'showBook'"
      :maxpages="parseInt(book.pages)"
    >
    </AppHeaderEbook>
    <nav class="pageNav">
      <div class="centerNav">
        <svg
          v-for="(color, index) in colors"
          :key="index"
          :color="color"
          :curMarker="curMarker"
          :class="{ active: curMarker == color }"
          viewBox="0 0 38.57 36.004"
          xmlns="http://www.w3.org/2000/svg"
          style="width: 30px; height: 30px"
          @click="setNewMarkerColor(color)"
        >
          <g v-if="curMarker != color">
            <path
              id="Pfad_462"
              data-name="Pfad 462"
              d="M7.715,28.286c-1.326,0-2.609.022-3.89-.006A3.766,3.766,0,0,1,.518,26.344,3.506,3.506,0,0,1,.006,24.51Q0,14.147.01,3.783A3.816,3.816,0,0,1,3.861.008c3.213-.015,6.427,0,9.64,0H34.429a3.871,3.871,0,0,1,4.14,4.141q0,10.082,0,20.165a3.826,3.826,0,0,1-2.873,3.837,4.942,4.942,0,0,1-1.23.134c-4.994.009-9.988,0-14.983.016a1.179,1.179,0,0,0-.679.238q-4.31,3.419-8.6,6.865c-.125.1-.25.2-.378.3a1.243,1.243,0,0,1-1.392.161,1.256,1.256,0,0,1-.718-1.206q0-2.932,0-5.865v-.5m2.571,3.747c.173-.135.269-.208.362-.283,2.3-1.84,4.6-3.673,6.893-5.524a2.189,2.189,0,0,1,1.466-.518q7.772.022,15.544.008A1.3,1.3,0,0,0,36,24.277q0-10.121,0-20.243a1.31,1.31,0,0,0-1.465-1.458H4.048A1.317,1.317,0,0,0,2.573,4.064q0,10.081,0,20.163a1.312,1.312,0,0,0,1.475,1.489c1.62,0,3.24,0,4.86,0A1.286,1.286,0,0,1,10.285,27.1c0,1.486,0,2.972,0,4.458v.474"
              transform="translate(0 0)"
              :fill="color"
            />
            <path
              id="Pfad_463"
              data-name="Pfad 463"
              d="M83.454,95.835q5.082,0,10.163,0a1.282,1.282,0,0,1,1.3,1.724A1.25,1.25,0,0,1,93.8,98.4c-.119.012-.241,0-.361,0q-10,0-20,0a2.611,2.611,0,0,1-.559-.034,1.281,1.281,0,0,1,.3-2.533c1.834-.008,3.669,0,5.5,0h4.78"
              transform="translate(-64.149 -85.546)"
              :fill="color"
            />
            <path
              id="Pfad_464"
              data-name="Pfad 464"
              d="M78.306,146.32q-2.49,0-4.981,0a1.293,1.293,0,1,1,0-2.57q5,0,10,0a1.291,1.291,0,1,1,0,2.57q-2.511,0-5.021,0"
              transform="translate(-64.171 -128.318)"
              :fill="color"
            />
          </g>
          <g v-if="curMarker == color" transform="translate(519.022 80.948)">
            <path
              id="Pfad_471"
              data-name="Pfad 471"
              d="M-511.308-52.67c-1.267,0-2.471,0-3.676,0a3.863,3.863,0,0,1-4.037-4.043q0-10.1,0-20.2a3.86,3.86,0,0,1,4.046-4.033q15.244,0,30.488,0a3.855,3.855,0,0,1,4.032,4.046q0,10.1,0,20.2a3.856,3.856,0,0,1-4.05,4.029q-7.491,0-14.983-.006a1.177,1.177,0,0,0-.8.283q-4.272,3.434-8.557,6.852c-.125.1-.248.2-.378.3a1.241,1.241,0,0,1-1.359.151,1.249,1.249,0,0,1-.729-1.2q0-2.952,0-5.9Zm11.589-18h-4.861c-1.808,0-3.615,0-5.423,0a1.281,1.281,0,0,0-1.3,1.132,1.289,1.289,0,0,0,1,1.4,2.624,2.624,0,0,0,.559.033q10,0,20,0c.12,0,.242.007.361,0a1.25,1.25,0,0,0,1.122-.842,1.282,1.282,0,0,0-1.3-1.723Q-494.638-70.669-499.719-70.665Zm-5.143,5.141q-2.49,0-4.981,0a1.3,1.3,0,0,0-1.464,1.3,1.307,1.307,0,0,0,1.447,1.274q4.981,0,9.961,0a1.306,1.306,0,0,0,1.444-1.277,1.3,1.3,0,0,0-1.428-1.293Q-502.372-65.526-504.863-65.524Z"
              transform="translate(0 0)"
              :fill="color"
            />
            <path
              id="Pfad_472"
              data-name="Pfad 472"
              d="M-435.412,15.061q5.081,0,10.163,0a1.282,1.282,0,0,1,1.3,1.723,1.25,1.25,0,0,1-1.122.842c-.119.012-.241,0-.361,0q-10,0-20,0a2.624,2.624,0,0,1-.559-.033,1.289,1.289,0,0,1-1-1.4,1.281,1.281,0,0,1,1.3-1.132c1.808-.008,3.615,0,5.423,0Z"
              transform="translate(-64.308 -85.726)"
              fill="#fff"
            />
            <path
              id="Pfad_473"
              data-name="Pfad 473"
              d="M-440.533,63.077q2.49,0,4.981,0a1.3,1.3,0,0,1,1.428,1.293,1.306,1.306,0,0,1-1.444,1.277q-4.981,0-9.961,0a1.307,1.307,0,0,1-1.447-1.274,1.3,1.3,0,0,1,1.464-1.3Q-443.023,63.075-440.533,63.077Z"
              transform="translate(-64.329 -128.6)"
              fill="#fff"
            />
          </g>
        </svg>
        <!-- <img src="@/assets/images/icons/kommentar-icon.svg" />
        <img src="@/assets/images/icons/kommentar-active.svg" /> -->

        <!-- <img src="@/assets/images/icons/kommentar-private.svg" />
        <img src="@/assets/images/icons/kommentar-private-active.svg" /> -->

        <div @click="toggleShowMarkers()">
          <IconShow size="35px" fill="#fff" :on="showMarkers" />
        </div>
      </div>
      <div class="rightNav">
        <span class="addbtn click" @click="zoomin('out')"
          ><img src="@/assets/images/icons/zoom-minus.svg"
        /></span>
        <span class="zoomAnzeige">{{ zoom }}%</span>
        <span class="addbtn click" @click="zoomin('in')"
          ><img src="@/assets/images/icons/zoom-plus.svg"
        /></span>
        <div class="tools-arrows">
          <span
            class="big click"
            :class="{ notActive: curPage <= 0 }"
            @click="chgPage('prev')"
          >
            <img src="@/assets/images/icons/toolnav-left.svg" />
          </span>
          &nbsp;
          <span
            class="big click"
            :class="{ notActive: curPage >= book.pages - 1 }"
            @click="chgPage('next')"
          >
            <img src="@/assets/images/icons/toolnav-right.svg" />
          </span>
        </div>
        <!-- span> Seite {{ curPage + 1 }} / {{ book.pages }} </span -->
      </div>
    </nav>
    <h1>{{ currentBook.title }}</h1>
    <div
      v-if="offline != -1"
      class="showAllPages"
      :class="seitenAnsicht"
      :style="'--zoom: calc(' + zoom + ' / 100)'"
    >
      <ImageCanvas
        v-for="(page, index) in pages"
        :key="index"
        :offline="offline"
        :no="index + 1"
        :zoom="zoom"
        :showmarkers="showMarkers"
        :bookid="currentBook.id"
      />
    </div>
    <div style="clear: both"></div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
// import { keys } from "@/services/idb.js";
import IconShow from "@/components/IconShow.vue";
import ImageCanvas from "@/components/ImageCanvas.vue";
import AppHeaderEbook from "@/components/AppHeaderEbook.vue";

export default {
  name: "ShowBookMultiPages",
  components: {
    IconShow,
    AppHeaderEbook,
    ImageCanvas,
  },
  data() {
    return {
      state: {
        showMarkerEdit: false,
        setNewMarker: true,
        showImages: 0,
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
      colors: ["#2699FB", "#FB2691"],
      currentColor: "",
      showMarkers: true,
      currentMarker: {},
      pages: [],
      zoom: 75,
      pageInViewport: 1,
      offline: -1, // nicht offline verfügbar
    };
  },
  computed: {
    ...mapState([
      "curMarker",
      "markers",
      "currentBook",
      "curPage",
      "seitenAnsicht",
      "PDF_URLs",
    ]),
    ...mapGetters(["getBooks"]),
  },
  async created() {
    const res = await this.checkIDBForKey(this.currentBook.id);
    console.log("offline verfügbar", this.currentBook.id, res);
    if (res) {
      this.offline = 1;
      // offline verfügbar
      console.log("offline verfügbar", this.currentBook.id);
    } else {
      this.offline = 0;
    }
  },
  mounted() {
    this.setCurPage(1);
    // console.log("bookId-->", bookId);
    this.books = this.getBooks;
    this.book = this.books.find((b) => b.id == this.currentBook.id);
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
      "checkIDBForKey",
    ]),
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
      return `${this.$store.state.dataUrl}${this.book.id}/page-${i}`;
    },
    getDataUrl() {
      return `https://bib.promosverlag.de/data/${this.book.id}/`;
      // return `data/${this.book.id}/`;
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
body {
  background: #efefef;
}
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
span.zoomAnzeige {
  min-width: 60px;
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
    .rightNav {
      display: none;
    }
  }
}
.imgContent {
  position: relative;
  img {
    width: 100%;
  }
}
.big {
  font-size: 1.3em;
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

.wrapper {
  background: #efefef;
}
.showAllPages {
  width: calc(var(--zoom) * 100%);
  margin: 0px auto;
  @media (max-width: 650px) {
    width: 100%;
  }
  &.double .showPage {
    width: 45.5%;
    float: left;
    margin-left: 3%;
    --zoom: 1;
    @media (max-width: 650px) {
      width: 95%;
      margin: 2.5%;
    }
  }
}
.centerNav {
  cursor: pointer;
  flex-direction: row;
  flex-wrap: wrap;
  width: 250px;
  margin: 0px;
  div {
    width: 30px;
  }
  @media (max-width: 650px) {
    width: 95%;
    margin: 0px 2.5%;
  }
}

.tools-arrows {
  display: flex;
  border-left: 1px solid #333;
  padding-left: 30px;
  margin-left: 20px;
  span:first-child {
    margin-right: 10px;
  }
}
</style>
