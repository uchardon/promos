<template>
  <div class="modal">
    <div class="modalContent">
      <div class="close">
        <img
          src="@/assets/images/icons/delete.svg"
          alt=""
          @click="setModal(false, '')"
        />
      </div>
      <BookLicense v-if="modal.content == 'BookLicense'" />
      <ModalDownload v-if="modal.content == 'ModalDownload'" />
      <BriefDescription v-if="modal.content == 'BriefDescription'" />
      <ShowBookIndex v-if="modal.content == 'ShowBookIndex'" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import BookLicense from "@/components/BookLicense.vue";
import ModalDownload from "@/components/ModalDownload.vue";
import BriefDescription from "@/components/BriefDescription.vue";
import ShowBookIndex from "@/components/ShowBookIndex.vue";

export default {
  name: "ModalBox",
  components: {
    BookLicense,
    ModalDownload,
    BriefDescription,
    ShowBookIndex,
  },
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

<style scoped lang="scss"></style>
