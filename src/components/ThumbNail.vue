<template>
  <div>
    <img :class="`thumbimg${book.id}`" :alt="book.title" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ThumbNail",
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(["localdata"]),
  },
  mounted() {
    // console.log("box: ", this.box);
    this.imgurl();
  },
  methods: {
    async imgurl() {
      let newurl = "";
      let imageURL = `${this.localdata}${this.book.id}/thumb.jpg`;
      // console.log("imgurl not offline");
      await fetch(imageURL)
        .then((response) => {
          return response.blob();
        })
        .then((blob) => {
          newurl = URL.createObjectURL(blob);
        });
      let img = document.querySelector(`.thumbimg${this.book.id}`);
      // console.log("IMG: ", img);
      img.src = newurl;
    },
  },
};
</script>

<style lang="scss" scoped>
.marker {
  width: 25px;
  cursor: pointer;
  @media (max-width: 650px) {
    width: 15px;
  }
}
</style>
