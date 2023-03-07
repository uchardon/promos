<template>
  <div class="modalDownload" style="text-align: center">
    <div v-if="true">
      <!-- // Der download wird angeboten -->
      <div v-if="bookDownload.state == 'start'">
        <br /><br />
        <img
          src="@/assets/images/internet-wifi.svg"
          style="width: 10%; text-align: center"
        />
        <br /><br />
        <h2>Download</h2>
        <br />
        <p>
          Sie können das Ebook zur lokalen Offline-Nutzung herunterladen.<br />Damit
          können Sie anschließend auch ohne Internetverbindung die Bibliothek
          und das jeweilige Ebook nutzen.
        </p>
        <p style="font-size: 12px; line-height: 18px; color: #ccc">
          Der Download kann je nach Geschwindigkeit der Internetverbindung
          einige Zeit in Anspruch nehmen. Bitte vergewissern Sie sich, dass eine
          <strong>schnelle Internetverbindung</strong>
          existiert und Sie <strong>keine mobile Daten</strong> verwenden.
        </p>
      </div>
      <!-- // Der download läuft -->
      <div v-if="bookDownload.state == 'loading'">
        <br /><br />
        <svg
          id="loader-1"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="60px"
          height="60px"
          viewBox="0 0 40 40"
          enable-background="new 0 0 40 40"
          xml:space="preserve"
        >
          <path
            opacity="0.2"
            fill="#2799fa"
            d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
          />
          <path
            fill="#fff"
            d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z"
          >
            <animateTransform
              attributeType="xml"
              attributeName="transform"
              type="rotate"
              from="0 20 20"
              to="360 20 20"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
        <br /><br />
        <h2>Download</h2>
        <br />
        <p>
          Das Buch wird für die Offline-Nutzung heruntergeladen. Bitte das
          Fenster nicht schließen und die Internetverbindung nicht trennen.
        </p>
        <br />
      </div>

      <!-- // Der download ist beendet -->
      <div v-if="bookDownload.state == 'end'">
        <br /><br />
        <img
          src="@/assets/images/icons/tick.svg"
          style="width: 10%; text-align: center"
        />
        <br /><br />
        <h2>Download erfolgreich</h2>
        <p>Sie können das Buch jetzt offline nutzen.</p>
      </div>
      <div v-if="bookDownload.state != 'loading'" class="buttons">
        <button
          v-if="bookDownload.state == 'start'"
          class="btn"
          @click="saveImages()"
        >
          Download
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
        Offline können keine Bücher heruntergeladen werden.<br />Bitte stellen
        Sie eine Internetverbindung her.
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
  name: "ModalDownload",
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
</style>
