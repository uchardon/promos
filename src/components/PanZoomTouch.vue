<template>
  <div class="pan-zoom">
    <div
      class="pan-zoom__wrapper"
      :style="{
        transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
      }"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
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
    handleTouchStart(event) {
      event.preventDefault();
      if (event.touches.length === 1) {
        this.startPosition = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
        };
        this.dragging = true;
      } else if (event.touches.length === 2) {
        this.startDistance = this.getDistance(
          event.touches[0],
          event.touches[1]
        );
        this.startZoom = this.zoom;
      }
    },
    handleTouchMove(event) {
      event.preventDefault();
      if (event.touches.length === 1 && this.dragging) {
        const dx = event.touches[0].clientX - this.startPosition.x;
        const dy = event.touches[0].clientY - this.startPosition.y;
        this.position.x += dx;
        this.position.y += dy;
        this.startPosition = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
        };
      } else if (event.touches.length === 2) {
        const distance = this.getDistance(event.touches[0], event.touches[1]);
        const delta = distance - this.startDistance;
        const newZoom = this.startZoom + delta / 100;
        if (newZoom >= this.minZoom && newZoom <= this.maxZoom) {
          this.zoom = newZoom;
          const rect = event.target.getBoundingClientRect();
          const center = {
            x: (event.touches[0].clientX + event.touches[1].clientX) / 2,
            y: (event.touches[0].clientY + event.touches[1].clientY) / 2,
          };
          const dx =
            ((center.x - rect.left - this.position.x) * delta) / distance;
          const dy =
            ((center.y - rect.top - this.position.y) * delta) / distance;
          this.position.x += dx;
          this.position.y += dy;
        }
      }
    },
    handleTouchEnd(event) {
      event.preventDefault();
      if (event.touches.length === 0) {
        this.dragging = false;
      }
    },
    getDistance(touch1, touch2) {
      const dx = touch1.clientX - touch2.clientX;
      const dy = touch1.clientY - touch2.clientY;
      return Math.sqrt(dx * dx + dy * dy);
    },
  },
};
</script>

<style>
.pan-zoom {
  overflow: hidden;
  height: 100%;
  width: 100%;
}

.pan-zoom__wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pan-zoom__image {
  max-width: 100%;
  max-height: 100%;
  user-drag: none;
  user-select: none;
  touch-action: none;
}
</style>
