<template>
  <div class="modalDownload" style="text-align: center">
    <br /><br />
    <img
      src="@/assets/images/add-user-image.jpeg"
      style="width: 80%; text-align: center"
    />
    <br /><br />
    <h2>
      Haben Sie gewusst?<br />Sie können die Ebooks Ihrer Schüler mitverwalten.
    </h2>
    <br />
    <p>
      Wenn Sie Bücher für Ihre Schüler erwerben, werden Ihrem Konto zusätzliche
      Nutzerlizenzen zur Verfügung gestellt. Anschließend können Sie diese
      Nutzerlizenzen an Ihre Schüler via E-Mail zuweisen. Ihre Schüler werden
      automatisch mit persönlichen Zugangsdaten eingeladen und haben Zugriff auf
      ihre eigene Ebookversion.
    </p>

    <p v-if="!online">offline</p>

    <div class="buttons">
      <button href="https://shop.promosverlag.de" class="btn" target="_blank">
        Onlineshop
      </button>
      <button class="btn" @click="setModal(false, '')">Ok</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "BuyLicense",
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
