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
    <p v-if="online">
      Der Download kann je nach Geschwindigkeit der Internetverbindung einige
      Zeit in Anspruch nehmen. Bitte vergewissern Sie sich, dass eine
      <strong>schnelle Internetverbindung</strong>
      existiert und Sie <strong>keine mobile Daten</strong> verwenden.
    </p>

    <p v-if="!online">offline</p>

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
    ...mapState(["modal", "online"]),
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
  width: 60%;
  margin: 0px auto;
  margin-bottom: 50px;
  margin-top: 50px;
  @media (max-width: 650px) {
    display: block;
    width: 100%;
    margin: 50px 0px 25px 0px;
  }
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
  @media (max-width: 650px) {
    margin-top: 10px;
  }
  &:first-child {
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
</style>
