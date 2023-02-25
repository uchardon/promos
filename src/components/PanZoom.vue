<template>
  <div class="pan-zoom">
    <div
      class="pan-zoom__wrapper"
      :style="{
        transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
      }"
    >
      <img class="pan-zoom__image" :src="imageSrc" @load="onImageLoad" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imageSrc: {
      type: String,
      required: true,
    },
    maxZoom: {
      type: Number,
      default: 3,
    },
    minZoom: {
      type: Number,
      default: 0.5,
    },
  },
  data() {
    return {
      position: { x: 0, y: 0 },
      zoom: 1,
      imageWidth: 0,
      imageHeight: 0,
    };
  },
  mounted() {
    this.$refs.wrapper.addEventListener("mousedown", this.handleMouseDown);
    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mouseup", this.handleMouseUp);
    this.$refs.wrapper.addEventListener("wheel", this.handleWheel);
  },
  beforeUnmount() {
    this.$refs.wrapper.removeEventListener("mousedown", this.handleMouseDown);
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseup", this.handleMouseUp);
    this.$refs.wrapper.removeEventListener("wheel", this.handleWheel);
  },
  methods: {
    onImageLoad(event) {
      // get image dimensions
      this.imageWidth = event.target.naturalWidth;
      this.imageHeight = event.target.naturalHeight;
    },
    handleMouseDown(event) {
      event.preventDefault();
      this.startPosition = { x: event.clientX, y: event.clientY };
      this.dragging = true;
    },
    handleMouseMove(event) {
      if (this.dragging) {
        const dx = event.clientX - this.startPosition.x;
        const dy = event.clientY - this.startPosition.y;
        this.position.x += dx;
        this.position.y += dy;
        this.startPosition = { x: event.clientX, y: event.clientY };
      }
    },
    handleMouseUp() {
      this.dragging = false;
    },
    handleWheel(event) {
      event.preventDefault();
      const delta = event.deltaY > 0 ? -0.1 : 0.1;
      const newZoom = this.zoom + delta;
      if (newZoom >= this.minZoom && newZoom <= this.maxZoom) {
        this.zoom = newZoom;
        const rect = event.target.getBoundingClientRect();
        const dx = (event.clientX - rect.left - this.position.x) * delta;
        const dy = (event.clientY - rect.top - this.position.y) * delta;
        this.position.x += dx;
        this.position.y += dy;
      }
    },
  },
};
</script>

<style>
.pan-zoom {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.pan-zoom__wrapper {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pan-zoom__image {
  max-width: 100%;
  max-height: 100%;
  user-select: none;
}
</style>
