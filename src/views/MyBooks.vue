<template>
  <div class="main my-book">
    <div v-if="$store.state.online" id="info-online" class="info active">
      <div class="info__icon">
        <span class="online"></span>
      </div>
      <div class="info_content">
        <h6>Hallo {{ user.vorname }} {{ user.nachname }},</h6>
        <p>
          Sie sind online. Damit stehen Ihnen alle Ebooks und Einstellungen zur
          Verfügung.
        </p>
      </div>
    </div>
    <div v-if="!$store.state.online" id="info-offline" class="info active">
      <div class="info__icon">
        <span class="offline"></span>
      </div>
      <div class="info_content">
        <h6>Hallo {{ user.vorname }} {{ user.nachname }},</h6>
        <p>
          Sie sind offline, damit stehen Ihnen nur auf diesem Gerät
          heruntergeladene Ebooks zur Verfügung.
        </p>
      </div>
    </div>
    <div class="main__header">
      <h2 class="solo">Meine Bücher</h2>
    </div>
    <div v-if="state.showBooks" class="main__body">
      <div class="bookCard__row">
        <div
          v-for="book in books"
          :key="book.id"
          href="my-book-saved.html"
          class="bookCard"
        >
          <div
            v-if="book.maxLicense > 1"
            class="adminlicences license pointer"
            @click="showLicense(book)"
          >
            {{ book.maxLicense - 1 }}
          </div>
          <div class="bookCard__image" @click.prevent="showBookJPGs(book)">
            <ThumbNail :book="book" />
          </div>
          <div class="bookCard__content">
            <h6 @click.prevent="showBookJPGs(book)">
              {{ book.title }}
            </h6>
            <p @click.prevent="showBook(book)">Mehr Informationen</p>
          </div>
          <div class="buttons">
            <button class="bopen btn" @click="showBookJPGs(book)">
              Buch öffnen
            </button>
            <button
              v-if="book.maxLicense <= 1 && userstate == 'customer'"
              class="adminlicences btn"
              @click="showBuyLicense()"
            >
              Lizenzen
            </button>
            <button
              v-if="book.maxLicense > 1 && userstate == 'customer'"
              class="adminlicences btn"
              @click="showLicense(book)"
            >
              Lizenzen
            </button>
            <DownloadButton :maxpages="book.pages" :bookid="book.id" />
          </div>
        </div>
      </div>
    </div>

    <div v-if="!state.showBooks" id="info-buecher" class="info active">
      <div class="info__icon">
        <img src="@/assets/images/icons/cancel.svg" alt="" />
      </div>
      <div class="info__content">
        <h6>Es konnten keine Ebooks auf diesem Gerät gefunden werden.</h6>
        <p>
          Bitte stellen Sie eine Internetverbindung her und laden Sie die
          gewünschten Ebooks auf dieses Gerät herunter.
        </p>
        <a class="link" href="#">
          ???? Warum können keine Ebooks auf diesem Gerät gefunden werden?
        </a>
      </div>
    </div>

    <div class="info-appdownload">
      <div class="icon-appdownload">
        <img src="@/assets/AppLogo-white.svg" />
      </div>
      <div class="content-appdownload">
        <h6>bib.promos als App herunterladen</h6>
        <p>Laden Sie die digitale Bibliothek als App herunter.</p>
      </div>
      <button v-if="isChrome" class="btn appdlbutton" @click="appInstall()">
        WebApp Download
      </button>
      <button
        v-if="!isChrome"
        class="btn appdlbutton"
        @click="modalAppDownload()"
      >
        WebApp Download
      </button>
      <div style="clear: both"></div>
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/AuthService.js";
import DownloadButton from "@/components/DownloadButton.vue";
import ThumbNail from "@/components/ThumbNail.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    DownloadButton,
    ThumbNail,
  },
  props: [],
  emits: [],
  data() {
    return {
      user: {},
      books: [],
      secretMessage: "",
      loadingNum: 0,
      state: {
        confirm: false,
        online: true,
        offlinedownload: "onlyOnline",
        showBooks: false,
      },
      checkCount: 0,
      deferredPrompt: null,
    };
  },

  computed: {
    ...mapState(["token", "isChrome", "userstate"]),
  },
  async created() {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      console.log("deferredPrompt event was fired eee", e);
      this.deferredPrompt = e;
      console.log("deferredPrompt event was fired", this.deferredPrompt);
      // showInstallPromotion();
    });
    if (this.token != "202cb963ac59075b964b07152d234b70") {
      this.$router.push("/login");
    }
  },

  async mounted() {
    this.user = await this.$store.getters.getUser;
    this.books = await this.$store.getters.getBooks;
    this.checkForBooks();
    this.secretMessage = await AuthService.getSecretContent();
    this.$store.commit("setMainMenu", "book");
  },

  methods: {
    ...mapActions(["setModal", "setCurrentBook"]),
    async appInstall() {
      this.hideInstallPromotion();
      this.deferredPrompt.prompt();
      const { outcome } = await this.deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      this.deferredPrompt = null;
    },
    hideInstallPromotion() {
      console.log("hideInstallPromotion");
    },
    modalAppDownload() {
      this.setModal({ state: true, content: "ModalAppDownload" });
    },
    checkForBooks() {
      if (this.books.length > 0) {
        this.state.showBooks = true;
      } else {
        if (this.checkCount < 10) {
          this.checkCount++;
          setTimeout(() => {
            this.checkForBooks();
          }, 700);
        }
      }
      console.log("->", this.books.length, this.checkCount);
    },
    showBook(book) {
      // console.log("book->", book);
      this.setCurrentBook(book);
      this.setModal({ state: true, content: "BriefDescription" });
    },
    showBookJPGs(book) {
      this.setCurrentBook(book);
      this.$router.push({ name: "showBook" });
    },
    showLicense(book) {
      this.setCurrentBook(book);
      this.setModal({ state: true, content: "BookLicense" });
      // this.$router.push({ name: "license" });
    },
    showBuyLicense() {
      this.setModal({ state: true, content: "BuyLicense" });
      // this.$router.push({ name: "license" });
    },
  },
  template: "#my-book",
};
</script>
<style lang="scss" scoped>
.main__header {
  margin-bottom: 15px;
  margin-top: 50px;
  text-align: left !important;
}
.buttons {
  clear: both;
  padding-top: 30px;
}
.license {
  --size: 25px;
  width: var(--size);
  height: var(--size);
  position: absolute;
  top: 15px;
  right: 15px;
  transition: all 0.2s ease;
}
.license:hover {
  --size: 30px;
}
.info_content {
  width: 100%;
  text-align: left;
}
.adminlicences.license {
  --seize: 30px;
  --blue: #2799fa;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: var(--seize);
  height: var(--seize);
  background-color: var(--blue);
  z-index: 2;
  font-size: 12px;
  font-weight: bold;
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
  &.adminlicences {
    width: 47.5%;
    float: right;
    margin-top: 12px;
  }
  &.bopen {
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

.bookCard {
  margin: 18px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: calc(25% - 36px);
  background: #fff;
  border-radius: 10px;
  padding: 50px 36px 40px;
  -webkit-transition: all 0.2s ease-in-out 0s;
  transition: all 0.2s ease-in-out 0s;
  -moz-transition: all 0.2s ease-in-out 0s;
  position: relative;
}
.bookCard:hover {
  -webkit-box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
}
.bookCard__row {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin: 0 -18px 34px -18px;
}

.bookCard p {
  font-size: 12px;
  text-align: left;
}
.bookCard__image {
  width: 100%;
  padding-bottom: 80%;
  position: relative;
  margin-bottom: 0px !important;
}
.bookCard__image img {
  position: absolute;
  top: 45%;
  left: 50%;
  max-height: 80%;
  max-width: 80%;
  transform: translate(-50%, -50%);
  -moz-ransform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  width: 100%;
  -o-object-fit: contain;
  object-fit: contain;
  height: 100%;
  cursor: pointer;
}
.bookCard__image img:hover {
  transition: 0.3s;
  max-height: 85%;
  max-width: 85%;
}
.bookCard__content h6 {
  margin-bottom: 5px !important;
  text-align: left;
  cursor: pointer;
}
.bookCard__content p {
  font-size: 14px;
  opacity: 0.5;
  cursor: pointer;
}

.bookCard__content p:hover {
  opacity: 1;
  color: #2799fa;
}

@media (max-width: 1480px) {
  .main {
    padding: 38px 30px;
  }
}

@media (max-width: 1580px) {
  .bookCard__row {
    margin-bottom: 24px;
  }
}

@media (max-width: 1340px) {
  .bookCard {
    padding: 35px;
    margin: 12px;
    width: calc(33.3% - 24px);
  }
  .bookCard__image {
    margin-bottom: 30px;
  }
  .bookCard__row {
    margin: 0 -12px;
  }
}

@media (max-width: 1024px) {
  .bookCard {
    width: calc(50% - 24px);
  }
}

@media (max-width: 650px) {
  .main {
    padding: 35px 20px;
  }
}

@media (max-width: 650px) {
  .bookCard {
    display: block;
    padding: 50px 25px 35px;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    width: 100%;
    margin: 0 0 30px 0;
  }
  .bookCard__row {
    margin: 0;
  }
  .bookCard__image {
    width: 25%;
    margin: 0 25px 0 0;
    padding: 0;
    float: left;
  }
  .bookCard__image img {
    position: static;
    width: 100%;
    height: auto;
    transform: translate(0, 0);
    -moz-ransform: translate(0, 0);
    -o-transform: translate(0, 0);
    -ms-transform: translate(0, 0);
    -webkit-transform: translate(0, 0);
  }
  .bookCard__content {
    width: calc(100% - 130px);
    float: left;
    text-align: left;
  }
  .bookCard__content h5 {
    margin-bottom: 8px;
  }
  .main {
    padding: 35px 20px;
  }
}

.info-appdownload {
  display: block;
  background: #101820;
  width: 95%;
  border-radius: 10px;
  padding: 2.5%;
  margin-top: 25px;
  @media (max-width: 650px) {
    padding: 5%;
    width: 90%;
    margin-top: 0px;
  }
  .icon-appdownload {
    width: 55px;
    height: 55px;
    min-width: 55px;
    top: 0px;
    display: block;
    float: left;
  }
  .content-appdownload {
    float: left;
    margin-left: 35px;
    text-align: left;
    color: #666;
    h6 {
      color: #fff;
    }
  }
  .appdlbutton {
    min-width: 50px;
    max-width: 200px;
    display: block;
    float: right;
    background: #101820;
    border: 1px solid #fff;
    color: #fff;
    &:hover {
      background: #217fcf;
      border: 1px solid #217fcf;
      border: 0px;
    }
    @media (max-width: 650px) {
      clear: both;
      margin-top: 20px;
      width: 100%;
      min-width: 100%;
    }
  }
}
</style>
