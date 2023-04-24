<template>
  <div class="modalDownload" style="text-align: center">
    <div v-if="pwstate == 'start' && online">
      <form @submit.prevent="sendPW()">
        <div>
          <br /><br />
          <img
            src="@/assets/images/icons/padlock.svg"
            style="width: 10%; text-align: center"
          />
          <br /><br />
          <h2>Passwort zusenden</h2>
          <br />
          <p>
            Geben Sie Ihre E-Mail Adresse ein und klicken Sie auf jetzt
            zusenden. Anschließend wird Ihnen Ihr Passwort per Mail zugesendet.
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
        <div class="buttons">
          <button type="submit" class="btn">Zusenden</button>
        </div>
      </form>
    </div>

    <!-- // Der Passwort wird gesendet -->
    <div v-if="pwstate == 'wait'">
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
    </div>

    <!-- // Der download ist beendet -->
    <div v-if="pwstate == 'send'">
      <div>
        <br /><br />
        <img
          src="@/assets/images/icons/tick.svg"
          style="width: 10%; text-align: center"
        />
        <br /><br />
        <h2>Erfolgreich versendet</h2>
        <p>Das Passwort wurde Ihnen erfolgreich versendet.</p>
      </div>
      <div class="buttons">
        <button class="btn" style="width: 50%" @click="setModal(false, '')">
          Ok
        </button>
      </div>
    </div>

    <div v-if="!online">
      <div>
        <br /><br />
        <img
          src="@/assets/images/no-wifi.svg"
          style="width: 10%; text-align: center"
        />
        <br /><br />
        <h2>Kein Internet</h2>
        <br />
        <p>
          Um ein neues Passwort beantragen zu können, benötigen Sie eine
          Internetverbindung.
        </p>
        <div class="buttons">
          <button class="btn" style="width: 50%" @click="setModal(false, '')">
            Ok
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import { mapState, mapActions } from "vuex";

export default {
  name: "ModalPassword",
  data() {
    return {
      loadingNum: 0,
      email: "",
      pwstate: "start",
      error: "",
    };
  },
  computed: {
    ...mapState(["url", "modal", "online"]),
  },
  methods: {
    ...mapActions(["setModal"]),
    async sendPW() {
      console.log("sendPW");
      this.pwstate = "wait";
      if (this.email != "") {
        const response = await Axios.post(this.url + "mailpw.php", {
          email: this.email,
        });
        console.log("response emailpw", response);
        this.pwstate = "send";
      } else {
        this.error = "Bitte tragen Sie eine E-Mailadresse ein!";
      }
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
