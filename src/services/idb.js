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

async function idb_get(key) {
  return (await dbPromise).get("keyval", key);
}

async function idb_set(key, val) {
  console.log("SET", key, val);
  return (await dbPromise).put("keyval", val, key);
}

async function idb_keys() {
  console.log("---KEYS");
  return (await dbPromise).getAllKeys("keyval");
}

async function idb_getAll() {
  return (await dbPromise).getAll("keyval");
}

async function idb_fileToBlob(url) {
  let response = await fetch(url);
  let data = await response.blob();
  let metadata = {
    type: "image/jpg",
  };
  console.log("metadata", metadata);
  // let file = new File([data], "test.jpg", metadata);
  // ... do something with the file or return it
  return data;
}

async function idb_arrayBufferToBlob(buffer, type = "data:image/jpeg;base64") {
  return new Blob([buffer], { type: type });
}

async function idb_blobToArrayBuffer(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("loadend", () => {
      resolve(reader.result);
    });
    reader.addEventListener("error", reject);
    reader.readAsArrayBuffer(blob);
  });
}

module.exports = {
  idb_get,
  idb_set,
  idb_keys,
  idb_getAll,
  idb_fileToBlob,
  idb_arrayBufferToBlob,
  idb_blobToArrayBuffer,
};
