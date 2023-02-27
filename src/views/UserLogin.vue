<template>
  <section class="login">
    <div v-if="pagestate == 'checkOK'" class="login__inner">
      <div class="login__image">
        <img src="@/assets/images/sample.png" alt="" />
      </div>
      <form action="#" class="login__form" @submit.prevent="login">
        <div class="login__form-inner">
          <div class="login__form-logo" style="width: 100%">
            <h2>Hallo {{ vorname }} {{ nachname }}</h2>
          </div>
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
          <div class="input">
            <input
              v-model="password"
              type="password"
              onclick="this.placeholder=''"
              onfocus="this.select()"
              onblur="this.placeholder=!this.placeholder?'Passwort':this.placeholder;"
              placeholder="Passwort"
              required
            />
          </div>
          <button
            type="submit"
            class="button primary"
            style="padding: 20px 0px"
          >
            Login
          </button>
          <a class="passwort-vergessen-link" @click="sendPW()"
            >Passwort vergessen
          </a>
          <p v-if="msg">{{ msg }}</p>
        </div>
      </form>
    </div>
    <div v-if="pagestate == 'checkFail'" class="center">
      <h1>Bitte benutzen Sie ihren Link</h1>
    </div>
    <div v-if="pagestate == 'checkWait'" class="center">
      <h1>Loading...</h1>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import AuthService from "@/services/AuthService.js";
import Axios from "axios";

export default {
  data() {
    return {
      // TODO datenvorbelegung entfernen
      email: "kutschuk@schwarzkupfer.de",
      password: "cs42ufkj",
      vorname: "",
      nachname: "",
      msg: "",
      pagestate: "checkOK",
      // checkWait, checkFail, checkOK
    };
  },
  computed: {
    ...mapState(["url"]),
  },
  async created() {
    this.$store.dispatch("setOnlineMode", navigator.onLine);
    // TODO check secret;
    // console.log("secret: ", this.$route.params.secret);
    // if (this.$route.params.secret) {
    //   this.pagestate = "checkOK";
    //   try {
    //     const response = await AuthService.checkSecret(
    //       this.$route.params.secret
    //     );
    //     // console.log("response", response);
    //     if (response.error) {
    //       this.pagestate = "checkFail";
    //     } else {
    //       this.pagestate = "checkOK";
    //       this.vorname = response.vorname;
    //       this.nachname = response.nachname;
    //       this.$store.commit("setUserName", {
    //         vorname: response.vorname,
    //         nachname: response.nachname,
    //       });
    //     }
    //   } catch (error) {
    //     this.msg = error.response;
    //   }
    // } else {
    //   this.pagestate = "checkFail";
    // }
  },
  methods: {
    async login() {
      console.log(" methods login ");
      try {
        // console.log(" methods login try ");
        const payload_ = {
          email: this.email,
          password: this.password,
          // secret: this.$route.params.secret,
        };
        const response = await AuthService.login(payload_);

        this.msg = response.msg;

        const payload = {
          token: response.token,
          user: response.user,
          secret: this.$route.params.secret,
        };

        this.$store.dispatch("login", payload);

        this.$router.push("/mybooks");
      } catch (error) {
        this.msg = error.response.data.msg;
      }
    },

    async sendPW() {
      console.log("sendPW");
      if (this.email == "") {
        const response = await Axios.post(this.url + "mailpw.php", {
          email: this.email,
        });
        console.log("response", response);
        this.msg =
          "Ein neues Passwort wird an die Mailadresse " +
          this.email +
          " gesendet!";
      } else {
        this.msg = "Bitte tragen Sie eine E-Mailadresse ein!";
      }
    },
  },
};
</script>

<style lang="css" scoped>
a.passwort-vergessen-link {
  margin-top: 25px;
  display: block;
  color: #ccc;
}
a.passwort-vergessen-link:hover {
  color: #2699fb;
}
.center {
  text-align: center;
  padding-top: 20vh;
}
@media (max-width: 700px) {
  .login__form-inner {
    padding: 60px 30px;
  }
  .login__form-logo {
    margin-bottom: 50px;
  }
}
</style>
