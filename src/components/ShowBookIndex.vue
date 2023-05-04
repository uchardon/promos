<template>
  <div class="hello">
    <h2>Inhaltsverzeichnis</h2>
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
    <button class="btn" @click="setModal(false, '')">Schließen</button>
    <div style="clear: both"></div>
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
    ...mapState(["currentBook", "curPage"]),
  },
  mounted() {
    this.contens = JSON.parse(this.currentBook.tableofcontens);
  },
  methods: {
    ...mapActions(["setModal", "setCurPage"]),
    getElement(no) {
      let arg = "[data-page=page-" + no + "]";
      // console.log("arg", arg);
      this.target = document.querySelector(arg);
      return this.target;
    },
    chgPage(pageNo) {
      let pNomb = pageNo + 1;
      let pageBox = this.getElement(pNomb);
      this.setCurPage(pageNo);
      pageBox.scrollIntoView({ behavior: "smooth" });
      this.setModal(false);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.btn {
  min-width: 100px;
  width: 100%;
  margin: 0px auto;
  padding: 15px 0px;
  border-radius: 10px;
  background: #2699fb;
  font-weight: bold;
  font-family: roboto;
  font-size: 14px;
  cursor: pointer;
  margin-top: 30px;
  margin-bottom: 15px;
  color: #fff;
  &:hover {
    background: #217fcf;
  }
}
ul {
  margin-top: 25px;
}
.contensPage {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #efefef;
  cursor: pointer;
  // height: 50px;
  // line-height: 50px;
  line-height: 20px;
  padding: 15px 25px;
  background: #fafbfe;
  margin-bottom: 10px;
  border-radius: 10px;
  // padding: 0px 25px;
  &:hover {
    background-color: #2699fb;
    color: #fff;
  }
  :nth-child(2) {
    font-weight: bold;
  }
}
</style>
