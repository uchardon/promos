const { openDB } = require("idb");
const dbPromise = openDB("bookImages", 1, {
  upgrade(db) {
    db.createObjectStore("keyval");
  },
  blocked(event) {
    console.log("DB is blocked", event);
  },
  blocking(event) {
    console.log("DB is blocking", event);
  },
  terminated(event) {
    console.log("DB is terminated", event);
  },
});

async function get(key) {
  return (await dbPromise).get("keyval", key);
}

async function set(key, val) {
  console.log("SET", key, val);
  return (await dbPromise).put("keyval", val, key);
}

async function keys() {
  console.log("---KEYS");
  return (await dbPromise).getAllKeys("keyval");
}

async function getAll() {
  return (await dbPromise).getAll("keyval");
}
async function fileToBlob(url) {
  let response = await fetch(url);
  let data = await response.blob();
  let metadata = {
    type: "application/pdf",
  };
  console.log("metadata", metadata);
  // let file = new File([data], "test.jpg", metadata);
  // ... do something with the file or return it
  return data;
}

module.exports = { get, set, keys, getAll, fileToBlob };
