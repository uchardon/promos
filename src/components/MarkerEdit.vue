<template>
  <div class="markerEdit outer">
    <div class="edit-area inner">
      <div class="edit-nav">
        <div class="mod__inner-close modClose" @click="$emit('closeModal')">
          <img src="@/assets/images/icons/delete.svg" alt="" />
        </div>
      </div>
      <div class="text-input">
        <textarea
          id="marker-text"
          v-model="marker.desc"
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
            v-if="!newMarker"
            type="button"
            class="button denie modBtn"
            @click="deleteMarker()"
          >
            Löschen
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
            @click="$emit('closeModal')"
          >
            Schließen
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MarkerEdit",
  props: {
    currentMarker: {
      type: Object,
      required: true,
    },
    newMarker: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["closeModal", "saveMarker", "delMarker"],
  data() {
    return {
      marker: {},
    };
  },
  mounted() {
    this.marker = { ...this.currentMarker };
  },
  methods: {
    deleteMarker() {
      this.$emit("delMarker", this.marker);
    },
    saveMarker() {
      // console.log("met: saveMarker");
      if (this.marker.desc != "") {
        this.$emit("saveMarker", this.marker);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.outer {
  position: absolute;
  inset: 0;
  z-index: 100;
  backdrop-filter: blur(3px);
  background-color: rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
.edit-area.inner {
  --modal-width: 80%;
  --max-modal-width: 700px;
  z-index: 110;
  position: absolute;
  width: var(--modal-width);
  max-width: var(--max-modal-width);
  height: 50vh;
  background: #fff;
  display: grid;
  grid-template-rows: 50px 1fr 120px;
  align-items: center;
  box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  padding: 0px;
}
.edit-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.edit-nav {
  padding: 20px;
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
}
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
