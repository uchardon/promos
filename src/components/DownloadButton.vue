<template>
  <div>
    <button
      v-if="
        state.offlinedownload == 'onlyOnline' && state.online && offline == 0
      "
      class="download btn startdownload"
      @click="loadForOfflineUse()"
    >
      Download
    </button>

    <button
      v-if="offline == 1 && state.online"
      class="download btn offline"
      title="Buch offline verfügbar"
      @click="freeMemory()"
    >
      Speicher freigeben
    </button>
    <button v-if="!state.online" class="download btn disabled">
      Download nicht möglich
    </button>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "DownloadButton",
  props: {
    maxpages: {
      type: String,
      default: "0",
    },
    bookid: {
      type: String,
      default: "0",
    },
  },

  data() {
    return {
      offline: 0, // offline verfügbar = 1
      state: {
        online: true,
        offlinedownload: "onlyOnline",
      },
    };
  },
  computed: {
    ...mapState(["dataUrl", "localdata", "bookDownload"]),
  },
  async created() {
    // const res = await this.checkIDBForKey(this.bookid);
    // // console.log("buch--verfügbar", res);
    // if (res) {
    //   // offline verfügbar
    //   this.offline = 1;
    // } else {
    //   this.offline = 0;
    // }
    this.checkBookOfflinestatus();
  },
  mounted() {},
  methods: {
    ...mapActions([
      "setModal",
      "checkIDBForKey",
      "delImageIDB",
      "SET_BOOKDOWNLOAD",
    ]),
    // async delImages() {
    //   for (let i = 0; this.bookDownload.maxpages > i; i++) {
    //     let key = `b${this.bookDownload.bookid}p${i}`;
    //     let payload = {
    //       key: key,
    //     };
    //     await this.delImageIDB(payload);
    //   }
    // },
    async checkBookOfflinestatus() {
      const res = await this.checkIDBForKey(this.bookid);
      // console.log("buch--verfügbar", res);
      if (res) {
        // offline verfügbar
        this.offline = 1;
      } else {
        this.offline = 0;
      }
    },
    checkLoop() {
      for (let i = 0; i < 10; i++) {
        setTimeout(this.checkBookOfflinestatus(), i * 500);
      }
    },
    loadForOfflineUse() {
      // console.log("bookid", this.bookid);
      // console.log("maxpages", this.maxpages);
      // console.log("state start");
      this.SET_BOOKDOWNLOAD({ key: "bookid", value: this.bookid });
      this.SET_BOOKDOWNLOAD({ key: "maxpages", value: this.maxpages });
      this.SET_BOOKDOWNLOAD({ key: "state", value: "start" });
      this.setModal({ state: true, content: "ModalDownload" });
    },
    async freeMemory() {
      this.SET_BOOKDOWNLOAD({ key: "bookid", value: this.bookid });
      this.SET_BOOKDOWNLOAD({ key: "maxpages", value: this.maxpages });
      for (let i = 0; this.bookDownload.maxpages > i; i++) {
        let key = `b${this.bookDownload.bookid}p${i}`;
        let payload = {
          key: key,
        };
        await this.delImageIDB(payload);
      }
      this.checkBookOfflinestatus();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100px;
  width: 47.5%;
  padding: 15px 0px;
  margin: 12px 0 0;
  border-radius: 10px;
  font-weight: bold;
  font-family: roboto;
  font-size: 14px;
  cursor: pointer;
  --current: 0;
  background: #00e4cb;
  background: linear-gradient(
    90deg,
    #00e4cb 0%,
    #00e4cb calc(var(--current) * 1%),
    #efefef calc(var(--current) * 1%),
    #efefef 100%
  );
}
.btn:hover {
  background: #2799fa;
  color: #fff;
}

.btn.offline {
  background: #fff;
  border: 1px solid #00e4cc;
  color: #00e4cc;
  font-size: 13px;
}
</style>
