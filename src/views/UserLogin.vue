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
          <a
            v-if="online"
            class="passwort-vergessen-link"
            @click="showModalPassword()"
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

export default {
  data() {
    return {
      // TODO datenvorbelegung entfernen
      email: "",
      password: "",
      vorname: "",
      nachname: "",
      msg: "",
      pagestate: "checkOK",
      deferredPrompt: null,
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
    if (window.location.href.indexOf("localhost") >= 0) {
      // Development mode
      console.log("Development mode");
      this.password = "krbb8jhg";
      this.email = "kutschuk@schwarzkupfer.de";
    }
  },
  mounted() {
    if (sessionStorage.getItem("us") && sessionStorage.getItem("pa")) {
      const pa = sessionStorage.getItem("pa");
      const us = sessionStorage.getItem("us");
      if (pa != "" && us != "") {
        this.email = us;
        this.password = pa;
        this.login();
      }
    }
  },
  methods: {
    ...mapActions([
      "SET_USERDATA",
      "getBooks",
      "SET_BOOKSINSTORE",
      "setModal",
      "GET_BOOKSSUBUSER",
    ]),
    showModalPassword() {
      // console.log("showIndex");
      this.setModal({ state: true, content: "ModalPassword" });
    },
    async login() {
      // console.log(" methode LOGIN ");
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
            sessionStorage.setItem("us", this.email);
            sessionStorage.setItem("pa", this.password);
            const payload = {
              token: response.token,
              user: response.user,
              secret: "",
              userstate: response.userstate,
            };
            // console.log("uid", response.user, response.userstate);
            this.SET_USERDATA(payload); // userdaten in store schreiben Bücher einlesen

            if (response.userstate == "subuser") {
              books = await this.GET_BOOKSSUBUSER(response.user.email);
              console.log(
                "userdaten in store schreiben Bücher einlesen",
                books
              );
            } else {
              books = await this.getBooks(response.user.id);
            }

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
            userstate: data.userstate,
          };
          this.SET_USERDATA(payload); // userdaten in store schreiben Bücher einlesen
          books = await idb_get("books");
          await this.SET_BOOKSINSTORE(books);
          this.$router.push("/mybooks"); // Nächste Seite
        } else {
          this.msg = "Falsche Logindaten";
        }
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
.installBtn {
  display: none;
}
@media all and (display-mode: browser) {
  .installBtn {
    display: block;
  }
}
</style>
