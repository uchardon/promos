<template>
  <div class="modalDownload" style="text-align: center">
    <div v-if="true">
      <!-- // Der download wird angeboten -->
      <div>
        <br /><br />
        <img
          src="@/assets/images/internet-wifi.svg"
          style="width: 10%; text-align: center"
        />
        <br /><br />
        <h2>Buch nicht verfügbar</h2>
        <br />
        <p>
          Sie können das Ebook zur lokalen Offline-Nutzung herunterladen.<br />Damit
          können Sie anschließend auch ohne Internetverbindung die Bibliothek
          und das jeweilige Ebook nutzen.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "ModalBookNotAvailable",
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
</style>
