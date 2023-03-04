<template>
  <div class="modalDownload" style="text-align: center">
    <div v-if="true">
      <!-- // Der download wird angeboten -->
      <div v-if="bookDownload.state == 'start'">
        <br /><br />
        <img
          src="@/assets/images/icons/padlock.svg"
          style="width: 10%; text-align: center"
        />
        <br /><br />
        <h2>Passwort zusenden</h2>
        <br />
        <p>
          Geben Sie Ihre E-Mail Adresse ein und klicken Sie auf jetzt zusenden.
          Anschließend wird Ihnen Ihr Passwort per Mail zugesendet.
        </p>
        <div class="input">
          <input
            v-model="email"
            type="email"
            onclick="this.placeholder=''"
            onfocus="this.select()"
            onblur="this.placeholder=!this.placeholder?'E-Mail':this.placeholder;"
            placeholder="E-Mail"
            required
          />
        </div>
      </div>

      <!-- // Der download ist beendet -->
      <div v-if="bookDownload.state == 'end'">
        <br /><br />
        <img
          src="@/assets/images/icons/tick.svg"
          style="width: 10%; text-align: center"
        />
        <br /><br />
        <h2>Erfolgreich versendet</h2>
        <p>Das Passwort wurde Ihnen erfolgreich versendet.</p>
      </div>
      <div v-if="bookDownload.state != 'loading'" class="buttons">
        <button
          v-if="bookDownload.state == 'start'"
          class="btn"
          @click="saveImages()"
        >
          Zusenden
        </button>
        <button
          v-if="bookDownload.state == 'start'"
          class="btn"
          @click="setModal(false, '')"
        >
          Abbrechen
        </button>
        <button
          v-if="bookDownload.state == 'end'"
          class="btn"
          style="width: 50%"
          @click="setModal(false, '')"
        >
          Ok
        </button>
      </div>
    </div>

    <div v-if="false">
      <br /><br />
      <img
        src="@/assets/images/no-wifi.svg"
        style="width: 10%; text-align: center"
      />
      <br /><br />
      <h2>Kein Internet</h2>
      <br />
      <p>
        Um das Passwort beantragen zu können, benötigen Sie eine
        Internetverbindung.
      </p>
      <div class="buttons">
        <button class="btn" style="width: 50%" @click="setModal(false, '')">
          Ok
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "ModalPassword",
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

.modalDownload {
  padding: 0px 50px;
  @media (max-width: 650px) {
    padding: 0px 25px;
  }
}
</style>
