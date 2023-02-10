<template>
  <div class="modalDownload">
    <p>Download dauert.... nur bei guter Verbindung ....</p>
    <div class="buttons">
      <button class="btn" @click="setModal(false, '')">OK</button>
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
}
</style>
