<template>
  <svg
    class="marker"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    :style="`width:15px; height:15px; top: ${posY}px; left:  ${posX}px;`"
    @click.stop="$emit('editMarker')"
  >
    <circle cx="50" cy="50" r="50" :fill="color" />
  </svg>
</template>

<script>
export default {
  name: "ImgMarkerSvg",
  props: {
    box: {
      type: Object,
      required: true,
    },
    color: {
      type: String,
      default: "#666",
    },
    posX: {
      type: Number,
      required: true,
    },
    posY: {
      type: Number,
      required: true,
    },
  },
  emits: ["editMarker"],
  mounted() {
    console.log("box: ", this.box);
  },
};
</script>
