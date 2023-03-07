<template>
  <div class="modal mod modEvent">
    <div class="mod__inner">
      <div class="mod__inner-header">
        <h2></h2>
        <div class="mod__inner-close modClose" @click="setModal(false, '')">
          <img src="@/assets/images/icons/delete.svg" alt="" />
        </div>
      </div>
      <div class="mod__inner-body">
        <BookLicense v-if="modal.content == 'BookLicense'" />
        <ModalVerify v-if="modal.content == 'ModalVerify'" />
        <ModalDownload v-if="modal.content == 'ModalDownload'" />
        <ModalAppDownload v-if="modal.content == 'ModalAppDownload'" />
        <ModalPassword v-if="modal.content == 'ModalPassword'" />
        <BriefDescription v-if="modal.content == 'BriefDescription'" />
        <ShowBookIndex v-if="modal.content == 'ShowBookIndex'" />
        <MarkerEdit v-if="modal.content == 'MarkerEdit'" />
        <BuyLicense v-if="modal.content == 'BuyLicense'" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import BookLicense from "@/components/BookLicense.vue";
import ModalDownload from "@/components/ModalDownload.vue";
import ModalAppDownload from "@/components/ModalAppDownload.vue";
import ModalPassword from "@/components/ModalPassword.vue";
import BriefDescription from "@/components/BriefDescription.vue";
import ShowBookIndex from "@/components/ShowBookIndex.vue";
import MarkerEdit from "@/components/MarkerEdit.vue";
import ModalVerify from "@/components/ModalVerify.vue";
import BuyLicense from "@/components/BuyLicense.vue";

export default {
  name: "ModalBox",
  components: {
    BookLicense,
    ModalDownload,
    ModalAppDownload,
    ModalPassword,
    BriefDescription,
    ShowBookIndex,
    MarkerEdit,
    ModalVerify,
    BuyLicense,
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

<style scoped lang="scss">
.mod__inner-body {
  background: #fff;
  border-radius: 0 0 20px 20px;
  padding-top: 0px;
  margin-top: -20px;
  text-align: left;
}
</style>
