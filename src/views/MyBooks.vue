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
    <div v-if="books.length > 0" class="main__body">
      <div class="bookCard__row">
        <div
          v-for="book in books"
          :key="book.id"
          href="#"
          class="bookCard book"
        >
          <div
            v-if="book.maxLicense >= 1"
            class="adminlicences license pointer"
            @click="showLicense(book)"
          >
            {{ book.maxLicense }}
          </div>
          <div class="bookCard__image pointer" @click.prevent="showBook(book)">
            <img
              :src="`${$store.state.dataUrl}${book.id}/thumb.jpg`"
              :alt="book.title"
            />
          </div>
          <div class="bookCard_content pointer" @click.prevent="showBook(book)">
            <h6>
              {{ book.title }}
            </h6>
            <p>{{ book.isbn }}</p>
          </div>
          <div class="buttons">
            <button class="adminlicences btn" @click="showLicense(book)">
              Lizenzen verwalten
            </button>
            <DownloadButton />
          </div>
        </div>
      </div>
    </div>

    <div v-if="books.length <= 0" id="info-buecher" class="info active">
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
  </div>
</template>

<script>
import AuthService from "@/services/AuthService.js";
import DownloadButton from "@/components/DownloadButton.vue";
import { mapActions } from "vuex";

export default {
  components: {
    DownloadButton,
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
      },
    };
  },
  async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push("/login");
    }
  },
  async mounted() {
    this.user = await this.$store.getters.getUser;
    this.books = await this.$store.getters.getBooks;
    this.secretMessage = await AuthService.getSecretContent();
    this.$store.commit("setMainMenu", "book");
  },
  methods: {
    ...mapActions(["setModal", "setCurrentBook"]),
    chgPage(page) {
      // this.currentMenu = page
      console.log("->", page);
    },
    showBook(book) {
      // console.log("book->", book);
      this.setCurrentBook(book);
      this.setModal({ state: true, content: "BriefDescription" });
    },
    showLicense(book) {
      this.setCurrentBook(book);
      this.setModal({ state: true, content: "BookLicense" });
      // this.$router.push({ name: "license" });
    },
  },
  template: "#my-book",
};
</script>
<style lang="scss" scoped>
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border-radius: 5px;
}
.bookCard {
  position: relative;
}
.license {
  --size: 25px;
  width: var(--size);
  height: var(--size);
  position: absolute;
  top: 10px;
  right: 10px;
  transition: all 0.2s ease;
}
.license:hover {
  --size: 30px;
}
.bookCard.book {
  display: grid;
  gap: 20px;
  grid-template-rows: auto 1fr auto;
  .bookCard__image {
    margin-bottom: 0;
    margin: 0 auto;
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
    z-index: 202;
  }
}
@media (max-width: 540px) {
  .bookCard__image[data-v-5b43c814] {
    width: 85px;
  }
  .bookCard.book {
    display: grid;
    grid-template-columns: auto 1fr;
  }
  .buttons {
    grid-column: span 2;
  }
}
@media (max-width: 400px) {
  .bookCard.book {
    display: grid;
    grid-template-columns: 1fr;
  }
  .buttons {
    grid-column: span 1;
  }
}
</style>
