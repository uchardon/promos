<template>
  <div class="hello">
    <h2>{{ currentBook.title }}</h2>
    <!-- eslint-disable vue/no-v-html -->
    <p v-html="currentBook.kurzbeschreibung"></p>
    <!--eslint-enable-->
    <button class="btn" @click="showBook()">Buch anzeigen</button>
    <button class="btn" @click="setModal(false, '')">
      zurück zur Übersicht
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "BriefDescription",
  props: {},
  data() {
    return {
      key: 0,
    };
  },
  computed: {
    ...mapState(["currentBook"]),
  },
  methods: {
    ...mapActions(["setModal"]),
    showBook() {
      this.setModal(false, "");
      this.$router.push({ name: "showBook" });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
