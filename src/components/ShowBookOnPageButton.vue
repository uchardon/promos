<template>
  <button
    class="bopen btn"
    :disabled="!offline"
    @click="$emit('showBookJpgs', book)"
  >
    <span v-if="offline">Weiterlesen</span>
    <span v-else>nicht verfügbar</span>
  </button>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "ShowBookOnPageButton",
  props: {
    // eslint-disable-next-line
    book: {
      type: Object,
    },
  },
  emits: ["showBookJpgs"],

  data() {
    return {
      offline: false, // offline/online verfügbar = 1
    };
  },
  computed: {
    ...mapState(["online"]),
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
    ...mapActions(["checkIDBForKey"]),
    /**
     * Checks if the book is available offline by calling the checkIDBForKey function.
     * If the book is available offline, sets the offline variable to true.
     * If the book is not available offline, sets the offline variable to false.
     * If the app is online, sets the offline variable to true.
     *
     * @return {Promise<void>} - A Promise that resolves when the function has finished executing.
     */
    async checkBookOfflinestatus() {
      if (!this.online) {
        const res = await this.checkIDBForKey(this.book.id);
        console.log("buch--verfügbar", res);
        if (res) {
          // offline verfügbar
          this.offline = true;
        } else {
          this.offline = false;
        }
      } else {
        // App ist online Buch ist ferfügbar
        this.offline = true;
      }
    },
    /**
     * Executes the checkBookOfflinestatus function every 500ms for 10 times.
     *
     * @return {void}
     */
    checkLoop() {
      for (let i = 0; i < 10; i++) {
        setTimeout(this.checkBookOfflinestatus(), i * 500);
      }
    },
    /**
     * Loads the book for offline use by setting the necessary data in the book download state
     * and opening the modal for download confirmation.
     *
     * @return {void}
     */
    loadForOfflineUse() {
      // console.log("bookid", this.bookid);
      // console.log("maxpages", this.maxpages);
      // console.log("state start");
      this.SET_BOOKDOWNLOAD({ key: "bookid", value: this.bookid });
      this.SET_BOOKDOWNLOAD({ key: "maxpages", value: this.maxpages });
      this.SET_BOOKDOWNLOAD({ key: "state", value: "start" });
      this.setModal({ state: true, content: "ModalDownload" });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
button.bopen.btn {
  background: #2799fa;
  background: var(--blue, #2799fa);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100px;
  padding: 15px 0px;
  margin: 12px 0 0;
  border-radius: 10px;
  font-weight: bold;
  font-family: roboto;
  font-size: 14px;
  cursor: pointer;
  --current: 0;
}
button.bopen.btn:hover {
  background: #217fcf;
  color: #fff;
}

.btn.offline {
  background: #fff;
  border: 1px solid #00e4cc;
  color: #00e4cc;
  font-size: 13px;
}
</style>
