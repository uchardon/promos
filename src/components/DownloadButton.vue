<template>
  <div>
    <button
      v-if="state.offlinedownload == 'onlyOnline' && state.online"
      class="download btn startdownload"
      @click="loadForOfflineUse()"
    >
      Herunterladen
    </button>
    <button
      v-if="state.offlinedownload == 'loading' && state.online"
      class="download btn loading"
      :style="'--current:' + loadingNum"
    >
      {{ loadingNum }} %
    </button>
    <button
      v-if="state.offlinedownload == 'offline' && state.online"
      class="download btn offline"
    >
      Offline verfügbar
    </button>
    <button v-if="!state.online" class="download btn disabled">
      Download nicht möglich
    </button>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "DownloadButton",
  data() {
    return {
      loadingNum: 0,
      state: {
        online: true,
        offlinedownload: "onlyOnline",
      },
    };
  },
  methods: {
    ...mapActions(["setModal"]),
    loadForOfflineUse() {
      this.setModal({ state: true, content: "ModalDownload" });
      this.loadingNum = 0;
      console.log("loadForOfflineUse");
      this.state.offlinedownload = "loading";
      let myInterval = setInterval(() => {
        this.loadingNum++;
        if (this.loadingNum >= 100) {
          clearInterval(myInterval);
          this.state.offlinedownload = "offline";
        }
      }, 200);
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
  width: 100%;
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
  --current: 100;
}
</style>
