<template>
  <div class="edit-area inner">
    <div class="comment-title">
      <img src="@/assets/images/icons/kommentar-active.svg" />
      <h2>Notiz hinzufügen</h2>
      <!-- <p>Dieser Kommentar ist für Ihre lizenzierten Benutzer sichtbar.</p> -->
    </div>
    <div class="text-input">
      <!-- MARKERS: {{ markers }}--- <br />
      TO EDIT: {{ markerToEdit }}--- <br />
      FILTERED: {{ filteredMarkers }} -->
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
      <button
        v-if="markerToEdit.todo == 'edit'"
        type="button"
        class="button denie modBtn"
        @click="deleteMarker()"
      >
        Löschen
      </button>
      <div style="clear: both"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "MarkerEdit",
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
        // bookId: this.markerToEdit.bookId,
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
        console.log("xfilteredMarkersxx", this.filteredMarkers);
        if (this.markerToEdit.content.desc != "") {
          // Zeilenumbrüche sind in json nicht erlaubt
          this.markerToEdit.content.desc =
            this.markerToEdit.content.desc.replace(/\n/g, "\\n");
          this.filteredMarkers.push(this.markerToEdit.content);
          // console.log("----------filteredMarkersxx", this.filteredMarkers);
        }
        this.setIndex();
      } else {
        // console.log("UPDATE MARKER");
        this.markerToEdit.content.desc = this.markerToEdit.content.desc.replace(
          /\n/g,
          "\\n"
        );
        this.filteredMarkers[this.markerToEdit.content.index] =
          this.markerToEdit.content;
        this.saveMarkersToDB();
      }
      this.setModal(false, "");
    },
    setIndex() {
      console.log("xfilteredMarkersxx", this.filteredMarkers);
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
  color: #000;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 19px 20px;
  background: #fafbfe;
  width: 100%;
  font-family: "Roboto", sans-serif;
  border-radius: 10px;
  border: 1px solid #efefef;
}
button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
.mod__inner-footer {
  padding: 20px 0px;
  padding-bottom: 0px;
}

.comment-title {
  width: 100%;
  margin-top: -30px;
  img {
    float: left;
    width: 4%;
    margin-top: 5px;
    @media (max-width: 650px) {
      width: 6.5%;
    }
  }
  h2 {
    width: 93.5%;
    float: right;
    font-size: 20px;
    font-family: roboto;
    padding-bottom: 20px;
    @media (max-width: 650px) {
      width: 89%;
    }
  }
  p {
    width: 100%;
    float: right;
    font-size: 16px;
  }
}

.edit-footer {
  display: block;
  button {
    margin: 0px;
    float: right;
    &.denie {
      float: left;
      @media (max-width: 650px) {
        width: 47.5%;
        float: left;
      }
    }
    &.save {
      @media (max-width: 650px) {
        width: 100%;
        float: right;
        margin-right: 0px;
        margin-bottom: 10px;
      }
    }
    &.conc {
      margin-right: 15px;
      @media (max-width: 650px) {
        width: 47.5%;
        float: right;
        margin-right: 0px;
        margin-bottom: 15px;
      }
    }
  }
}
</style>
