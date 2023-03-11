<template>
  <div class="modalDownload" style="text-align: center">
    <div v-if="true">
      <!-- // Der download wird angeboten -->
      <div>
        <br /><br />
        <h2>Hilfe</h2>
        <p>Was bewirkt die Sprechblase und das Auge?</p>
        <img class="tutGif" src="@/assets/MarkerToolsTutorial.gif" />
        <!-- <video width="320" height="240" controls>
          <source src="@/assets/MarkerToolsTutorial.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video> -->
        <!-- <video
          src="@/assets/MarkerToolsTutorial.mp4"
          style="max-width: 360px"
          controls="false"
        >
          No video support in this browser.
        </video> -->
        <!-- <iframe
          src="@/assets/MarkerToolsTutorial.mp4"
          frameborder="0"
          scrolling="no"
        ></iframe> -->
      </div>
      <div class="buttons">
        <button class="btn" @click="setModal(false, '')">Ok</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "ModalBookHelper",
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
#loader-1 path {
  fill: #2799fa;
}
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
  width: 50%;
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
    width: 100%;
  }
}
.btn:hover {
  background: #2799fa;
  color: #fff;
}

img.tutGif {
  width: 50%;
  @media (max-width: 650px) {
    width: 80%;
    margin-top: 15px;
  }
}
</style>
