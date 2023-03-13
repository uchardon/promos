<template>
  <div class="licenseManager">
    <div class="main_header">
      <div class="header-content">
        <h1>Lizenzen</h1>
      </div>
    </div>

    <div
      v-if="state.offline"
      id="info-offline-lizenzen-benutzer"
      class="info active"
      data-bl="all"
    >
      <div class="info_icon">
        <img src="images/icons/attentRed.svg" alt="" />
      </div>
      <div class="info_content">
        <h6>Sie sind offline.</h6>
        <p>
          Im Offlinemodus können Lizenzen und Benutzer nicht verwaltet werden.
          Bitte stellen Sie eine Internetverbindung her.
        </p>
      </div>
    </div>

    <div class="main_body">
      <div class="lmmWrap">
        <div class="lmmLeft">
          <img
            :src="`${$store.state.dataUrl}${currentBook.id}/thumb.jpg`"
            :alt="currentBook.title"
          />
        </div>
        <div class="lmmRight">
          <h6 class="sm">
            {{ currentBook.title }}
          </h6>
          <div class="lmm-state">
            <div class="lmm-state-left">
              <span>
                <!-- {{ currentBook.usedLicense - 1 }}/ -->
                {{
                  parseInt(currentBook.maxLicense, 10) -
                  parseInt(currentBook.usedLicense, 10)
                }}
              </span>
              Verfügbare Lizenzen
            </div>
            <div class="lmm-state-right">
              <span>{{ parseInt(currentBook.usedLicense, 10) - 1 }}</span>
              Lizenzen in Verwendung
            </div>
            <div class="lmm-clear"></div>
          </div>
        </div>
        <div class="lmm-clear"></div>
      </div>
      <div v-if="subusers.length > 0" class="licensList">
        <h3>Vergebene Lizenzen</h3>
        <ul>
          <li
            v-for="sub in subusers"
            :key="sub.id"
            :class="{ used: sub.lastuse != '0000-00-00' }"
          >
            <span>{{ sub.email }}</span>
            <button
              v-if="sub.lastuse == '0000-00-00'"
              class="button delete"
              @click="delSubuser(sub.id)"
            >
              <img src="@/assets/images/icons/close.svg" />
            </button>
          </li>
        </ul>
      </div>
      <div
        v-if="
          parseInt(currentBook.usedLicense, 10) <
          parseInt(currentBook.maxLicense, 10)
        "
        class="new_license"
      >
        <h6>Neue Lizenz für diese Buch vergeben</h6>
        <form @submit.prevent="saveNewSub()">
          <input
            v-model="subuser.email"
            type="email"
            onfocus="this.select()"
            onblur="this.placeholder=!this.placeholder?'E-Mail Adresse' : 
          this.placeholder;"
            placeholder="E-Mail Adresse"
            required
          />
          <button class="button save">Speichern</button>
        </form>
        <p>
          Die Zugangsdaten werden dem neuen Benutzer per Mail zugestellt. Mit
          dem ersten Login beginnt die Lizenzlaufzeit. Solange kein Login
          stattgefunden hat, können Sie die Vergabe jederzeit löschen.
        </p>
      </div>
      <div id="info-lizenzen" class="info active">
        <div class="info_icon">
          <img src="@/assets/images/icons/attentBlue.svg" alt="" />
        </div>
        <div class="info_content">
          <p>
            Wenn Sie Bücher für Ihre Schüler erwerben, werden Ihrem Konto
            zusätzliche Nutzerlizenzen zur Verfügung gestellt. Anschließend
            können Sie diese Nutzerlizenzen an Ihre Schüler via E-Mail zuweisen.
            Ihre Schüler werden automatisch mit persönlichen Zugangsdaten
            eingeladen und haben Zugriff auf ihre eigene Ebookversion.
          </p>
          <p>
            Bitte beachten Sie, das die Aktivierung nach Erwerb neuer Bücher
            inkl. Ebook 1-2 Werktage in Anspruch nehmen könnte, da jede
            Bestellung aus Sicherheitsgründen manuell geprüft / aktiviert wird.
          </p>
          <p>
            Die Lizenzen haben jeweils eine Laufzeit von 25 Monaten, beginnend
            ab dem ersten Login des Nutzers. Nach Ablauf wird das Buch
            automatisch aus dem jeweiligen Benutzeraccount entfernt.
          </p>
          <p>
            <a @click="supportlink()"
              >Weitere Informationen zu Nutzerlizenzen / Laufzeiten</a
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "BookLicense",
  props: [],
  emits: [],
  data() {
    return {
      id: 0,
      currentUser: {},
      currentBook: {
        title: "Hallo Welt",
      },
      subuser: {},
      state: {
        subPage: "BookLicense",
        offline: false,
      },
    };
  },

  // id	int(11) Auto-Inkrement
  // kunde_id	int(11)
  // book_id	int(11)
  // lastuse	date
  // email	varchar(255)
  // password	varchar(255)
  // book_kunde_id	int(11)

  computed: {
    ...mapState(["subusers", "online", "user"]),
  },
  mounted() {
    this.$store.commit("setMainMenu", "book");
    this.currentBook = this.$store.getters.getBook;
    this.currentUser = this.$store.getters.getUser;
    this.getSubusers();
  },
  methods: {
    ...mapActions([
      "saveNewSubuser",
      "getSubusers",
      "deleteSubuser",
      "sendNotificationToSubuser",
      "setModal",
    ]),
    supportlink() {
      this.$router.push({ name: "support" });
      this.setModal(false);
    },
    chgSubPage(page) {
      this.state.subPage = page;
    },
    delSubuser(sid) {
      // console.log("delSubuser", lid);
      let payload = {
        subid: sid,
        kbid: this.currentBook.kb_id,
      };
      this.deleteSubuser(payload);
      this.currentBook.usedLicense--;
      // let currentindex = this.subusers.findIndex((s) => s.id == lid);
      // this.subusers.splice(currentindex, 1);
      // this.currentBook.usedLicense--;
    },
    generatePassword(length = 8) {
      let password = "";
      let possibleCharacters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*()_+=";

      for (let i = 0; i < length; i++) {
        password += possibleCharacters.charAt(
          Math.floor(Math.random() * possibleCharacters.length)
        );
      }

      return password;
    },
    saveNewSub() {
      console.log("saveNewSub");
      this.currentBook.usedLicense++;
      this.id++;
      let pw = this.generatePassword();
      let newSubuser = {
        kunde_id: this.currentUser.id,
        book_id: this.currentBook.id,
        email: this.subuser.email,
        password: pw,
        book_kunde_id: this.currentBook.kb_id,
        lastuse: "0000-00-00",
      };
      this.saveNewSubuser(newSubuser);
      let payload = {
        username: this.user.vorname + " " + this.user.nachname,
        email: this.subuser.email,
        book: this.currentBook.title,
        password: pw,
      };
      this.sendNotificationToSubuser(payload);
      this.subuser.email = "";
    },
    updateSubUser() {
      console.log("saveNewSub");
    },
  },
  template: "#book-license",
};
</script>

<style lang="scss" scoped>
#info-lizenzen {
  background: #fafbfe;
  font-size: 12px;
  line-height: 18px;
  .info_icon {
    display: none;
  }
  a {
    font-size: 12px;
  }
  p {
    margin-bottom: 10px;
  }
  p:last-child {
    margin-bottom: 0px;
  }
  h6 {
    font-size: 14px;
    margin-bottom: 10px;
  }
}

.button.delete {
  background: none;
  padding: 0px;
  height: 15px;
  width: 15px;
  margin-top: -5px;
  opacity: 0.5;
  img {
    height: 15px;
    width: 15px;
  }
  &:hover {
    opacity: 1;
  }
}
.licenseManager {
  text-align: left;
  padding: 0px;
}
.bookLic_ {
  display: grid;
  grid-template-columns: minmax(auto, 70px) 1fr;
  gap: 20px;
  background: #fafbfe;
  padding: 25px;
  border-radius: 10px;
  margin-top: 25px;
  margin-bottom: 25px;
  img {
    max-width: 100%;
  }
  .bookLic__content {
    display: grid;
    grid-template-rows: auto auto;
    width: 100%;
  }
  h6 {
    font-size: 16px;
  }
}
.license_row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  .license_number {
    display: grid;
    grid-template-columns: min-content auto;
    gap: 10px;
  }
}
input[type="email"] {
  box-sizing: border-box;
  background: #fff;
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  font-family: "Roboto", sans-serif;
  color: #333333;
  padding: 14px 16px;
  border-radius: 10px;
  width: calc(100% - 160px);
  border: 1px solid #ccc;
}
.new_license {
  text-align: left;
  border-radius: 10px;
  align-items: flex-start;
  background: #fff;
  margin-bottom: 15px;
  padding: 25px;
  background: #fafbfe;
  margin-top: 0px;
  border-radius: 10px;
  form {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 15px 0px;
  }
  p {
    margin-bottom: 0px;
  }
}
.licensList {
  margin-top: 35px;
  ul {
    display: flex;
    flex-direction: column;
    gap: 0px;
    background: #fff;
    margin-top: 15px;
    border-radius: 10px;
    border: 1px solid #efefef;
    margin-bottom: 25px;
  }
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0px;
    padding: 15px 25px;
    border-top: 1px solid #efefef;
    &:first-child {
      border-top: 0px !important;
    }
    &.used {
      color: #2699fb;
      button {
        display: none;
      }
    }
  }
}

.lmmWrap {
  background: #fafbfe;
  padding: 25px;
  border-radius: 10px;
  margin-top: 25px;
  margin-bottom: 25px;
}
.lmmLeft {
  width: 13%;
  float: left;
}
.lmmLeft img {
  width: 100%;
}
.lmmRight {
  width: 82%;
  float: right;
  h6 {
    font-size: 16px;
  }
}
.lmmAdd {
  clear: both;
  width: 100%;
  margin-top: 25px;
}

.lmm-state {
  width: 100%;
  clear: both;
  font-size: 14px;
  margin-top: 20px;
}
.lmm-state-left {
  width: 50%;
  float: left;
  height: 40px;
  line-height: 40px;
}
.lmm-state span {
  display: inline-block;
  background: #fff;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  text-align: center;
  margin-right: 10px;
}

.lmm-state-right {
  width: 50%;
  float: right;
  height: 40px;
  line-height: 40px;
  color: #2699fb;
  cursor: pointer;
}
.lmm-state-right span {
  background: #2699fb;
  color: #fff;
}

.lmm-clear {
  clear: both;
}
@media (max-width: 650px) {
  .lmmRight {
    width: 78%;
  }
  .lmm-state-left {
    width: 100%;
  }
  .lmm-state-right {
    width: 100%;
    margin-top: 15px;
  }
  .new_license {
    form {
      display: block;
      input {
        width: 100%;
        clear: both;
      }
      button {
        width: 100%;
        clear: both;
        margin-top: 10px;
        padding: 14px 30px !important;
      }
    }
  }
}
</style>
