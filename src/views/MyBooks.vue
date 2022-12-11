<template>
  <div class="main my-book">
    <div v-if="$store.state.online" id="info-online" class="info active">
      <div class="info__icon">
        <span class="online"></span>
      </div>
      <div class="info__content">
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
      <div class="info__content">
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
          class="bookCard"
          @click.prevent="showBook(book)"
        >
          <svg
            v-if="book.maxLicense > 0"
            class="license"
            title="Lizenzen verwalten"
          >
            <use xlink:href="#group"></use>
          </svg>
          <div class="bookCard__image">
            <img
              :src="`${$store.state.dataUrl}${book.id}/thumb.jpg`"
              :alt="book.title"
            />
          </div>
          <div class="bookCard__content">
            <h6>
              {{ book.title }}
            </h6>
            <p>{{ book.isbn }}</p>
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

export default {
  props: [],
  emits: [],
  data() {
    return {
      user: {},
      books: [],
      secretMessage: "",
      state: {
        confirm: false,
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
    chgPage(page) {
      // this.currentMenu = page
      console.log("->", page);
    },
    showBook(book) {
      this.$store.commit("setCurrentBookId", book.id);
      this.$router.push({ name: "showBook" });
    },
  },
  template: "#my-book",
};
</script>
<style lang="scss" scoped>
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
</style>
