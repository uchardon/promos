<template>
  <div class="edit-area inner">
    <div class="text-input">
      <textarea
        id="marker-text"
        ref="textinput"
        v-model="markerToEdit.content.desc"
        name="marker-text"
        cols="30"
        rows="10"
        placeholder="Bitte Text einfügen"
      >
      </textarea>
    </div>

    <div class="mod__inner-footer uniq edit-footer">
      <span class="leftnav">
        <button
          v-if="markerToEdit.todo == 'edit'"
          type="button"
          class="button denie modBtn"
          @click="deleteMarker()"
        >
          LöschenXXX
        </button>
      </span>
      <span class="right">
        <button
          type="submit"
          class="button save"
          :disabled="!marker.desc != ''"
          @click="saveMarker()"
        >
          Speichern
        </button>
        <button
          type="reset"
          class="button conc modClose"
          @click="setModal(false, '')"
        >
          Schließen
        </button>
      </span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "MarkerEdit",
  emits: ["closeModal", "saveMarker"],
  data() {
    return {
      marker: {},
    };
  },
  computed: {
    ...mapState(["markers", "markerToEdit"]),
    ...mapGetters(["getMarkersByBookpage"]),
    filteredMarkers() {
      return this.getMarkersByBookpage({
        bookId: this.markerToEdit.bookId,
        page: this.markerToEdit.page,
      }).markers;
    },
  },
  mounted() {
    this.marker = this.markerToEdit.content;
    this.$refs.textinput.focus();
  },
  methods: {
    ...mapActions(["setModal", "saveMarkersToDB"]),
    deleteMarker() {
      this.filteredMarkers.splice(this.markerToEdit.content.index, 1);
      this.setIndex();
      this.setModal(false, "");
    },
    saveMarker() {
      // console.log("met: saveMarker");

      if (this.markerToEdit.content.index == -1) {
        // console.log("NEW MARKER");
        if (this.markerToEdit.content.desc != "") {
          this.filteredMarkers.push(this.markerToEdit.content);
        }
        this.setIndex();
      } else {
        // console.log("UPDATE MARKER");
        this.filteredMarkers[this.markerToEdit.content.index] =
          this.markerToEdit.content;
        this.saveMarkersToDB();
      }
      this.setModal(false, "");
    },
    setIndex() {
      this.filteredMarkers.forEach((m, i) => {
        m.index = i;
      });
      this.saveMarkersToDB();
    },
  },
};
</script>

<style lang="scss" scoped>
textarea {
  resize: none;
  font-size: 16px;
  line-height: 21px;
  font-weight: 400;
  color: #333333;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 19px 20px;
  background: #fff;
  width: 100%;
  font-family: "Roboto", sans-serif;
  border-radius: 10px;
  border: 1px solid #efefef;
}
button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
