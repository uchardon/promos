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
      <div class="bookLic_">
        <div class="bookLic_image">
          <img
            :src="`${$store.state.dataUrl}${currentBook.id}/thumb.jpg`"
            :alt="currentBook.title"
          />
        </div>
        <div class="bookLic__content">
          <div class="bookLic_content-text">
            <h6 class="sm">{{ currentBook.title }}</h6>
          </div>
          <div class="license_row">
            <div class="license user">
              <div class="license_number">
                <p class="sm">
                  Verfügbare<br />
                  Lizenzen
                </p>
                <div>
                  {{ currentBook.maxLicense - currentBook.usedLicense }}
                </div>
              </div>
            </div>
            <div class="license">
              <div class="license_number">
                <p class="sm">in Verwendung</p>
                <div>
                  {{ currentBook.usedLicense - 1 }}
                </div>
              </div>
            </div>
          </div>
          <div class="license uniq">
            <div class="license__number">
              <div>
                {{ currentBook.usedLicense }}/{{ currentBook.maxLicense }}
              </div>
            </div>
            <p class="sm">Verfügbare Lizenzen</p>
          </div>
        </div>
      </div>
      <div v-if="subusers.length > 0" class="licensList">
        <h3>Vergebene Lizenzen</h3>
        <ul>
          <li v-for="sub in subusers" :key="sub.id">
            <span>{{ sub.email }}</span>
            <button
              v-if="sub.lastuse == '0000-00-00'"
              class="button delete"
              @click="delSubuser(sub.id)"
            >
              Löschen
            </button>
          </li>
        </ul>
      </div>
      <div
        v-if="currentBook.usedLicense < currentBook.maxLicense"
        class="new_license"
      >
        <h6>Neue Lizenz für diese Buch vergeben</h6>
        <p>
          Dem neuen Benutzer wird eine EMail mit seinem Passwort zugesendet.<br />Bis
          zu ersen Verwndung kann diese Lizenz vergabe gelöscht werden.
        </p>
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
      </div>
      <div id="info-lizenzen" class="info active">
        <div class="info_icon">
          <img src="@/assets/images/icons/attentBlue.svg" alt="" />
        </div>
        <div class="info_content">
          <h6>Hinweis</h6>
          <p>
            Sie können zusätzlich zu Ihrer erworbenen Ebook Version auch
            Nutzungslizenzen für weitere Nutzer (z.B. Schüler) im
            <a href="https://shop.strato.de/epages/244823.sf/" target="blank"
              >Onlineshop erwerben</a
            >. Bitte beachten Sie, das die Aktivierung nach Erwerb der Lizenzen
            1-2 Werktage in Anspruch nehmen könnte, da jede Bestellung aus
            sicherheitsgründen manuell geprüft und aktiviert wird.
          </p>
          <p>
            Die Lizenzen haben jeweils eine Laufzeit von 12 Monaten, beginnend
            ab dem ersten Login des Nutzers. Zugangsdaten zum lizensierten
            Nutzer werden an die hinterlegte Mailadresse zugesendet.
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
    ...mapState(["subusers"]),
  },
  mounted() {
    this.$store.commit("setMainMenu", "book");
    this.currentBook = this.$store.getters.getBook;
    this.currentUser = this.$store.getters.getUser;
    this.getSubusers();
  },
  methods: {
    ...mapActions(["saveNewSubuser", "getSubusers", "deleteSubuser"]),
    chgSubPage(page) {
      this.state.subPage = page;
    },
    delSubuser(lid) {
      // console.log("delSubuser", lid);
      let payload = {
        subid: lid,
        kbid: this.currentBook.kb_id,
      };
      this.deleteSubuser(payload);
      let currentindex = this.subusers.findIndex((s) => s.id == lid);
      this.subusers.splice(currentindex, 1);
      this.currentBook.usedLicense--;
    },
    generatePassword(length = 8) {
      let password = "";
      let possibleCharacters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=-";

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
      let newSubuser = {
        kunde_id: this.currentUser.id,
        book_id: this.currentBook.id,
        email: this.subuser.email,
        password: this.generatePassword(),
        book_kunde_id: this.currentBook.kb_id,
        lastuse: "0000-00-00",
      };
      this.saveNewSubuser(newSubuser);
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
.button {
  padding: 6px 20px 6px 20px;
}
.licenseManager {
  text-align: left;
  padding: 0px;
}
.bookLic_ {
  display: grid;
  grid-template-columns: minmax(auto, 70px) 1fr;
  gap: 20px;
  img {
    max-width: 100%;
  }
  .bookLic__content {
    display: grid;
    grid-template-rows: auto auto;
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
  background: #efefef;
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  font-family: "Roboto", sans-serif;
  color: #333333;
  padding: 14px 16px;
  border-radius: 10px;
  width: calc(100% - 160px);
}
.new_license {
  text-align: left;
  border-radius: 10px;
  align-items: flex-start;
  background: #fff;
  margin-bottom: 15px;
  form {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
}
.licensList {
  ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 500px;
    gap: 10px;
    &:nth-child(even) {
      background-color: #eee;
    }
    span:nth-child(-1) {
      background-color: #fff;
    }
  }
}
</style>
