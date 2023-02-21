<template>
  <div class="hello">
    <h2>Inhaltsverzeichniss</h2>
    <!-- eslint-disable vue/no-v-html -->
    <ul>
      <li
        v-for="pageitem in contens"
        :key="pageitem.page"
        class="contensPage"
        @click="chgPage(pageitem.page)"
      >
        <div>{{ pageitem.text }}</div>
        <div>{{ pageitem.page }}</div>
      </li>
    </ul>
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
      contens: [],
    };
  },
  computed: {
    ...mapState(["currentBook"]),
  },
  mounted() {
    this.contens = JSON.parse(this.currentBook.tableofcontens);
  },
  methods: {
    ...mapActions(["setModal"]),
    getElement(no) {
      let arg = "[data-page=page-" + no + "]";
      // console.log("arg", arg);
      this.target = document.querySelector(arg);
      return this.target;
    },
    chgPage(pageNo) {
      let pageBox = this.getElement(pageNo);
      pageBox.scrollIntoView();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.contensPage {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #999;
  cursor: pointer;
}
</style>
