<template>
  <div>
    <input type="file" multiple @change="saveImages" />
    <div v-for="(imageUrl, index) in imageUrls" :key="index">
      <img :src="imageUrl" />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { openDB, deleteDB, wrap, unwrap } from "idb";
export default {
  data() {
    return {
      imageUrls: [],
      db: null,
      dbstore: null,
      dbname: "imagedb",
      dbversion: 1,
      storeName: "Lager",
    };
  },
  async created() {
    // let db_store = this.dbstore
    this.db = await openDB(this.dbname, this.dbversion, {
      upgrade(db, oldVersion, newVersion, transaction, event) {
        console.log("db", db);
        console.log("oldVersion", oldVersion);
        console.log("newVersion", newVersion);
        console.log("transaction", transaction);
        console.log("event", event);
        db_store = db.createObjectStore('Lager');
      },
      blocked(currentVersion, blockedVersion, event) {
        console.log("currentVersion", currentVersion);
        console.log("blockedVersion", blockedVersion);
        console.log("event", event);
      },
      blocking(currentVersion, blockedVersion, event) {
        console.log("currentVersion", currentVersion);
        console.log("blockedVersion", blockedVersion);
        console.log("event", event);
      },
      terminated() {
        console.log("terminated");
      },
    });
  },
  methods: {
    saveImages(event) {
      const files = event.target.files;
      const tx = this.db.transaction(this.storeName, 'readwrite')
      const store = tx.objectStore(this.storeName)
      // const transaction = this.getIndexedDBTransaction();

      for (let i = 0; i < files.length; i++) {
        // const file = files[i];
        // const reader = new FileReader();
        console.log("drin");
        let val = store.put("Hello world!", "Hello");

        // reader.onload = (event) => {
        //   const imageData = event.target.result;
        //   const id = Date.now().toString();

        //   this.saveToIndexedDB(transaction, id, imageData);
        //   this.imageUrls.push(imageData);
        // };

        // reader.readAsDataURL(file);
      }
      tx.done
    },
    // getIndexedDBTransaction() {
    //   let dbVersion = 1;
    //   let dbName = "imagesDB";
    //   const request = window.indexedDB.open(dbName, dbVersion);
    //   let db, transaction;

    //   request.onerror = (event) => {
    //     console.error("Error opening database", event);
    //   };

    //   request.onsuccess = (event) => {
    //     db = event.target.result;
    //     transaction = db.transaction("images", "readwrite");
    //   };

    //   request.onupgradeneeded = (event) => {
    //     db = event.target.result;
    //     db.createObjectStore("images", { keyPath: "id" });
    //     transaction = db.transaction("images", "readwrite");
    //   };

    //   return transaction;
    // },
    // saveToIndexedDB(transaction, id, imageData) {
    //   const store = transaction.objectStore("images");
    //   store.put({ id, imageData });
    // },
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
