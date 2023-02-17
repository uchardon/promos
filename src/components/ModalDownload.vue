<template>
  <div class="modalDownload" style="text-align: center">
    <br /><br />
    <img
      src="@/assets/images/internet-wifi.svg"
      style="width: 10%; text-align: center"
    />
    <br /><br />
    <h2>Download</h2>
    <br />
    <p>
      Der Download kann je nach Geschwindigkeit der Internetverbindung einige
      Zeit in Anspruch nehmen. Bitte vergewissern Sie sich, dass eine
      <strong>schnelle Internetverbindung</strong>
      existiert und Sie <strong>keine mobile Daten</strong> verwenden.
    </p>

    <div class="buttons">
      <button class="btn" @click="setModal(false, '')">Download</button>
      <button class="btn" @click="setModal(false, '')">Abbrechen</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "ModalDownload",
  data() {
    return {
      loadingNum: 0,
    };
  },
  computed: {
    ...mapState(["modal"]),
  },
  methods: {
    ...mapActions(["setModal"]),
  },
};
</script>

<style scoped lang="scss">
.buttons {
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: center;
  width: 50%;
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
