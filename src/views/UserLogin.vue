<template>
  <section class="login">
    <div v-if="pagestate == 'checkOK'" class="login__inner">
      <div class="login__image">
        <img src="@/assets/images/sample.png" alt="" />
      </div>

      <form action="#" class="login__form" @submit.prevent="login">
        <div class="login__form-inner">
          <div class="login__form-logo" style="width: 100%">
            <!-- <<h2>Hallo {{ vorname }} {{ nachname }}</h2>> -->
            <img
              style="width: 40%"
              src="@/assets/images/promos-icon-startseite.svg"
            />
          </div>
          <h3 v-if="msg != ''" class="error">{{ msg }}</h3>
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
          <a v-if="online" class="passwort-vergessen-link" @click="sendPW()"
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
import { mapState, mapActions } from "vuex";
import AuthService from "@/services/AuthService.js";
import { idb_get, idb_set } from "@/services/idb.js";
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
    ...mapState(["url", "online", "books"]),
  },
  async created() {
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
    ...mapActions(["SET_USERDATA", "getBooks", "SET_BOOKSINSTORE"]),
    async login() {
      console.log(" methode LOGIN ");
      let books = [];
      // console.log(" methods login try ");
      if (this.online) {
        try {
          const payload_ = {
            email: this.email,
            password: this.password,
            // secret: this.$route.params.secret,
          };
          const response = await AuthService.login(payload_);

          if (response.error) {
            this.msg = "Falsche Logindaten";
          } else {
            // set userdata in db
            const payload = {
              token: response.token,
              user: response.user,
              secret: "",
            };
            console.log("uid", response.user.id);
            this.SET_USERDATA(payload); // userdaten in store schreiben Bücher einlesen
            books = await this.getBooks(response.user.id);

            await idb_set(this.password, payload);
            // console.log("BOOKS", books);
            await idb_set("books", books);
            this.$router.push("/mybooks"); // Nächste Seite
          }
        } catch (error) {
          this.msg = "Ein unerwarteter Fehler ist aufgetreten";
        }
      } else {
        let data = await idb_get(this.password);
        if (
          this.password == data.user.password &&
          this.email == data.user.email
        ) {
          // console.log("DB_DATA", data.user); // offline Login erfolgreich
          const payload = {
            token: data.token,
            user: data.user,
            secret: "",
          };
          this.login(payload); // userdaten in store schreiben Bücher einlesen
          books = await idb_get("books");
          await this.SET_BOOKSINSTORE(books);
          this.$router.push("/mybooks"); // Nächste Seite
        } else {
          this.msg = "Falsche Logindaten";
        }
      }
    },

    async sendPW() {
      console.log("sendPW");
      if (this.email != "") {
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
