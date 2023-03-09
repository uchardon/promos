<template>
  <div class="modalDownload" style="text-align: center">
    <div v-if="true">
      <!-- // Der download wird angeboten -->
      <div>
        <br /><br />
        <img
          src="@/assets/images/no-wifi.svg"
          style="width: 10%; text-align: center"
        />
        <br /><br />
        <h2>Hilfe</h2>
        <br />
        <p>
          Im Offlinemodus kann das Ebook nur geöffnet werden, wenn Sie es vorab
          mit vorhandener Internetverbindung heruntergeladen haben.
        </p>
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
</style>
