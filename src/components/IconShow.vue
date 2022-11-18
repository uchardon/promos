<template>
  <div class="icon">
    <svg
      v-if="on"
      class="icon"
      :style="`width: ${size}; height: ${size}; fill:${fillColor}`"
    >
      <use xlink:href="#visibility" />
    </svg>
    <svg
      v-if="!on"
      class="icon"
      :style="`width: ${size}; height: ${size}; fill:${fillColor}`"
    >
      <use xlink:href="#visibilityOff" />
    </svg>
  </div>
</template>

<script>
export default {
  name: "IconShow",
  props: {
    size: {
      type: String,
      default: "20px",
    },
    fillColor: {
      type: String,
      default: "#fff",
    },
    on: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
span {
  display: flex;
}
</style>
