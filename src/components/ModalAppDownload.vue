<template>
  <div class="modalDownload" style="text-align: center">
    <div>
      <div class="ios-tut">
        <br /><br />
        <img
          src="@/assets/AppLogo.svg"
          style="width: 10%; text-align: center"
        />
        <br /><br />
        <h2>WebApp Download für Iphones / iPads</h2>

        <div class="tut-wrapper">
          <p>
            In der Safari Navigation auf den Button
            <img
              src="@/assets/ios-a2hs.svg"
              style="width: 15px; display: inline-block"
            />
            klicken,<br />runterscrollen und
            <span>Zum Home-Bildschirm</span> auswählen.
          </p>
          <img src="@/assets/1.png" class="ios-tut-img" />
          <img src="@/assets/3.png" class="ios-tut-img" />
          <div style="clear: both"></div>
        </div>
        <div class="tut-wrapper">
          <p>
            <span>Hinzufügen</span><br />Damit ist die WebApp auf Ihrem
            Iphone/Ipad installiert.
          </p>
          <img src="@/assets/4.png" class="ios-tut-img" />
          <img src="@/assets/5.jpg" class="ios-tut-img" />
          <div style="clear: both"></div>
        </div>
      </div>

      <div class="buttons">
        <button class="btn" @click="setModal(false, '')">Schließen</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "ModalAppDownload",
  data() {
    return {
      loadingNum: 0,
    };
  },
  computed: {
    ...mapState(["modal", "online", "bookDownload", "localdata"]),
  },
  methods: {
    ...mapActions(["setModal", "saveImageIDB", "SET_BOOKDOWNLOAD"]),
    async saveImages() {
      this.SET_BOOKDOWNLOAD({ key: "state", value: "loading" });
      for (let i = 0; this.bookDownload.maxpages > i; i++) {
        let key = `b${this.bookDownload.bookid}p${i}`;
        let url = `${this.localdata}${this.bookDownload.bookid}/page-${i}.jpg`;
        let payload = {
          key: key,
          url: url,
        };
        await this.saveImageIDB(payload);
      }
      this.SET_BOOKDOWNLOAD({ key: "state", value: "end" });
    },
  },
};
</script>

<style scoped lang="scss">
#loader-1 path {
  fill: #2799fa;
}
.buttons {
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: center;
  width: 60%;
  margin: 0px auto;
  margin-bottom: 50px;
  margin-top: 50px;
  @media (max-width: 650px) {
    display: block;
    width: 100%;
    margin: 50px 0px 25px 0px;
  }
}
.btn {
  min-width: 100px;
  width: 100%;
  margin: 0px auto;
  padding: 15px 0px;
  border-radius: 10px;
  background: #efefef;
  font-weight: bold;
  font-family: roboto;
  font-size: 14px;
  cursor: pointer;
  @media (max-width: 650px) {
    margin-top: 10px;
  }
  &:first-child {
    background: #2799fa;
    color: #fff;
    &:hover {
      background: #217fcf;
    }
  }
}
.btn:hover {
  background: #2799fa;
  color: #fff;
}

.ios-tut {
  .tut-wrapper {
    background: #fff;
    padding: 5%;
    display: block;
    border-radius: 10px;
    border: 1px solid #ccc;
    margin-top: 35px;
  }
  .ios-tut-img {
    width: 45%;
    float: left;
    margin: 2.5%;
    border-radius: 10px;
  }
  span {
    color: #2799fa;
  }
  p {
    margin-bottom: 25px;
    margin-top: 5px;
  }
}
</style>
