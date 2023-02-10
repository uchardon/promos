<template>
  <div class="hello">
    <h2>Inhaltsverzeichniss</h2>
    <!-- eslint-disable vue/no-v-html -->
    <p>{{ currentBook.tableofcontens }}</p>
    <!--eslint-enable-->
    <button class="btn" @click="setModal(false, '')">zurück zum Buch</button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "ShowBookIndex",
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
