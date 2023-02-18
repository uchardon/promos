<template>
  <div class="hello">
    <h2>{{ currentBook.title }}</h2>
    <!-- eslint-disable vue/no-v-html -->
    <p v-html="currentBook.kurzbeschreibung"></p>
    <!--eslint-enable-->
    <div class="buttons">
      <button class="btn" @click="showBook()">Weiter zum Buch</button>
      <button class="btn" @click="setModal(false, '')">Schließen</button>
    </div>
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
<style scoped lang="scss">
.buttons {
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: center;
  width: 60%;
  margin: 0px auto;
  margin-bottom: 50px;
  margin-top: 50px;
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
}
.btn:hover {
  background: #2799fa;
  color: #fff;
}
</style>
