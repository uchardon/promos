<template>
  <div>
    <input type="file" multiple @change="saveImages" />
    <div v-for="(imageUrl, index) in imageUrls" :key="index">
      <img :src="imageUrl" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrls: [],
    };
  },
  created() {
    const transaction = this.getIndexedDBTransaction();
    // const store = transaction.objectStore("images");
    // const request = store.getAll();

    // request.onerror = (event) => {
    //   console.error("Error getting images", event);
    // };

    // request.onsuccess = (event) => {
    //   const images = event.target.result;
    //   images.forEach((image) => {
    //     this.imageUrls.push(image.imageData);
    //   });
    // };
    console.log("t-", transaction);
  },
  methods: {
    saveImages(event) {
      const files = event.target.files;
      const transaction = this.getIndexedDBTransaction();

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = (event) => {
          const imageData = event.target.result;
          const id = Date.now().toString();

          this.saveToIndexedDB(transaction, id, imageData);
          this.imageUrls.push(imageData);
        };

        reader.readAsDataURL(file);
      }
    },
    getIndexedDBTransaction() {
      let dbVersion = 1;
      let dbName = "imagesDB";
      const request = window.indexedDB.open(dbName, dbVersion);
      let db, transaction;

      request.onerror = (event) => {
        console.error("Error opening database", event);
      };

      request.onsuccess = (event) => {
        db = event.target.result;
        transaction = db.transaction("images", "readwrite");
      };

      request.onupgradeneeded = (event) => {
        db = event.target.result;
        db.createObjectStore("images", { keyPath: "id" });
        transaction = db.transaction("images", "readwrite");
      };

      return transaction;
    },
    saveToIndexedDB(transaction, id, imageData) {
      const store = transaction.objectStore("images");
      store.put({ id, imageData });
    },
  },
};
</script>


<style scoped lang="scss">
.contensPage {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #999;
  cursor: pointer;
}
</style>
