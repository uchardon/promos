<template>
  <div class="showPage" :data-no="no">
    <div
      :data-page="'page-' + no"
      class="imgContent"
      :class="{ showMarkers: showMarkers }"
      @click="setNewMarker($event)"
    >
      <ImgMarkerSvg
        v-for="(marker, index) in filteredMarkers"
        :key="zoom + index"
        :box="box"
        :pos-x="(box.width / 100) * marker.x"
        :pos-y="(box.height / 100) * marker.y"
        :color="marker.color"
        @edit-marker="editMarker(index)"
      >
      </ImgMarkerSvg>
      <div v-if="no > 0" class="pageno">Seite {{ no }}</div>
      <div v-else class="pageno">&nbsp;</div>
      <img :alt="book.title" :data-imgno="no" @load="resizeEvent()" />
    </div>

    <!-- {{ box.width }} x {{ box.height }} -->
  </div>
</template>

<script>
// import { keys, get } from "@/services/idb.js";
import { mapActions, mapState, mapGetters } from "vuex";
// import "pdfjs-dist/build/pdf.worker.entry";
import ImgMarkerSvg from "@/components/ImgMarkerSvg.vue";

export default {
  name: "ImageCanvas",
  components: {
    ImgMarkerSvg,
  },
  props: {
    bookid: {
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
    offline: {
      type: Number,
      default: 0,
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
      dbKeys: [],
      zoomOld: 100,
    };
  },

  computed: {
    ...mapState([
      "curMarker",
      "markers",
      "markerToEdit",
      "localdata",
      "dataUrl",
    ]),
    ...mapGetters(["getBooks", "getMarkersByBookpage"]),
    filteredMarkers() {
      return this.getMarkersByBookpage({
        page: this.no,
      }).markers;
    },
  },
  mounted() {
    // console.log("bookId-->", bookId);
    this.books = this.getBooks;
    this.book = this.books.find((b) => b.id == this.bookid);
    // this.getMarkersFromDb();
    this.getMarkersByPage();
    this.getBox();
    console.log("get offline from ... ", this.offline);
    this.imgurl(this.offline);
    // [{bookId: xx, page: pp, markers: [{index: i, desc: d, x: p.x, y: p.y, color: c}, ...]}, ...]
    // TODO
    const myobserver = new ResizeObserver(() => {
      this.getBox();
    });
    myobserver.observe(document.querySelector(`[data-no="${this.no}"]`));
  },
  methods: {
    ...mapActions([
      "setModal",
      "setMarkersForBook",
      "saveMarkersToDB",
      "getImageURL",
    ]),
    zoomFaktor() {
      return this.zoom / 100;
    },
    // async getKeys() {
    //   this.dbKeys = await keys();
    //   console.log("is KEY-yyy: ", this.dbKeys);
    // },
    async imgurl(offline) {
      // let key = "buch_" + this.bookid;
      console.log("imgurl", offline);
      let newurl = "";
      if (offline != 1) {
        // nicht offline verfügbar
        // newurl = `${this.dataUrl}${this.bookid}/page-${this.no - 1}.jpg`;
        let imageURL = `${this.localdata}${this.bookid}/page-${
          this.no - 1
        }.jpg`;
        // console.log("imgurl not offline");
        await fetch(imageURL)
          .then((response) => {
            return response.blob();
          })
          .then((blob) => {
            newurl = URL.createObjectURL(blob);
          });
      } else {
        // offline verfügbar
        console.log("imgurl is offline");
        let key = `b${this.bookid}p${this.no - 1}`;
        newurl = await this.getImageURL(key);
      }
      let img = document.querySelector(`[data-imgno="${this.no}"]`);
      // console.log("IMG: ", img);
      img.src = newurl;
    },
    getElement() {
      let arg = "[data-page=page-" + this.no + "]";
      // console.log("arg", arg);
      this.target = document.querySelector(arg);
      return this.target;
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
      if (pagema.lendth == 0) {
        this.pageMarkers = [];
      } else {
        this.pageMarkers = pagema.markers;
      }
    },
    async getBox() {
      const ele = `[data-page="page-${this.no}"]`;
      const target = document.querySelector(ele);
      // console.log("getBox", target, from);
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
      // console.log("setNewMarker", this.state.showMarkerEdit);
      if (this.curMarker != "" && !this.state.showMarkerEdit) {
        this.getBox();
        var x = (e.clientX - this.box.posX) / this.box.faktorX; // x position within the element. <->
        var y = (e.clientY - this.box.posY) / this.box.faktorY; // y position within the element.  |
        this.markerToEdit.content = {
          index: -1,
          desc: "",
          x: Math.round(x),
          y: Math.round(y),
          color: this.curMarker,
        };
        console.log(
          "Marker: X Y color",
          Math.round(x),
          Math.round(y),
          this.curMarker
        ),
          this.curMarker;
        this.markerToEdit.todo = "new";
        this.markerToEdit.bookId = this.book.id;
        this.markerToEdit.page = this.no;
        this.setModal({ state: true, content: "MarkerEdit" });
      }
    },
    showModal(state) {
      // console.log("showModal");
      this.state.showMarkerEdit = state;
      if (!state) {
        this.state.setNewMarker = false;
      }
    },
    resizeEvent() {
      // console.log("resize from ", from);
      this.getBox();
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
  overflow: visible;
  position: relative;
  // width: calc(var(--zoom) * 100%);
  // overflow: hidden;
  margin: 0px auto;
  div {
    overflow: visible;
  }
  .imgContent {
    img {
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    }
  }
  @media (max-width: 650px) {
    margin-top: 50px;
    width: 90%;
    margin: 2.5% 5%;
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

.pageno {
  text-align: left;
  font-size: 12px;
  color: #999;
  margin-top: 15px;
}
</style>
