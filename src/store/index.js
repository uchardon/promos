import Axios from "axios";
import Vuex from "vuex";

export default new Vuex.createStore({
  state: {
    // url: "https://front.promosverlag.de/api/",
    // dataUrl: "https://front.promosverlag.de/data/",
    url: "https://bib.promosverlag.de/api/",
    dataUrl: "https://bib.promosverlag.de/data/",
    localdata: "data/",
    online: true,
    mainMenu: "book",
    token: "",
    secret: "",
    user: {},
    books: [],
    currentBook: {},
    curPage: 1,
    markers: [],
    markerToEdit: {
      todo: "",
      bookId: 0,
      page: -1,
      content: {
        index: -1,
        desc: "",
        x: 1,
        y: 1,
        color: "",
      },
    },
    curMarker: "",
    subusers: [],
    modal: {
      state: false,
      content: "",
    },
    idbBook: null,
    seitenAnsicht: "single",
    idb: {
      db: null, // The database object will eventually be stored here.
      name: "BookStorage", // The name of the database.
      version: 1, // Must be >= 1. Be aware that a database of a given name may only have one version at a time, on the client machine.
      storeName: "fileObjects", // The name of the database's object store. Each object in the object store is a file object.
      message: "",
      empty: true, // Indicates whether or not there's one or more records in the database object store. The object store is initially empty, so set this to true.
    },
  },
  getters: {
    getBookImages: (state) => {
      return state.bookImages;
    },
    getModal: (state) => {
      return state.modal;
    },
    isLoggedIn: (state) => {
      return state.token;
    },
    getUser: (state) => {
      return state.user;
    },
    getBook: (state) => {
      return state.currentBook;
    },
    getBooks: (state) => {
      return state.books;
    },
    getSubUsers: (state) => {
      return state.subusers;
    },
    getMarkersByBookpage: (state) => (payload) => {
      const result = state.markers.find((m) => m.page == payload.page);
      if (result !== undefined) {
        // console.log("undef---");
        return result;
      } else {
        // console.log("empt---");
        state.markers.push({ page: payload.page, markers: [] });
        return [];
      }
    },
  },
  mutations: {
    RESET: (state) => {
      // Object.assign(state, getDefaultState());
      console.log("STATE ", state);
    },
    SET_CURMARKER: (state, color) => {
      state.curMarker = color;
    },
    SET_SECRET: (state, secret) => {
      state.secret = secret;
    },
    SET_SUBUSERS: (state, payload) => {
      // console.log("SET_SUBUSERS");
      state.subusers = payload;
    },
    SET_SEITENANSICHT: (state, payload) => {
      state.seitenAnsicht = payload;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    onlineMode: (state, payload) => {
      state.online = payload;
      /*state.online = false;*/
    },
    setBooks: (state, payload) => {
      state.books = payload;
    },
    setCurrentBook: (state, book) => {
      state.currentBook = book;
    },
    SET_CURPAGE: (state, pageNo) => {
      state.curPage = pageNo;
    },
    setMainMenu: (state, payload) => {
      // ...
      state.mainMenu = payload;
    },
    setMarkers: (state, markers) => {
      state.markers = markers;
    },
    setModal: (state, payload) => {
      state.modal.state = payload.state;
      state.modal.content = payload.content;
    },
    setUserName: (state, payload) => {
      state.user = {
        vorname: payload.vorname,
        nachname: payload.nachname,
      };
    },
    setMarkersForBook: (state, payload) => {
      const indexOfObject = state.markers.findIndex((obj) => {
        return obj.bookId === payload.bookId && obj.page === payload.page;
      });
      if (indexOfObject != -1) {
        state.markers.splice(indexOfObject, 1);
      }

      let m = {
        bookId: payload.bookId,
        page: payload.page,
        markers: payload.markers,
      };
      state.markers.push(m);
    },
  },
  actions: {
    // putFileInDB: ({ state }, evt) => {
    //   console.log("handleFileSelection()");
    //   let files = evt.target.files; // The files selected by the user (as a FileList object).

    //   if (!state.idb.db) {
    //     console.log("db (i.e., dbGlobals.db) is null in handleFileSelection()");
    //     return;
    //   }

    //   try {
    //     var transaction = state.idb.db.transaction(
    //       state.idb.storeName,
    //       IDBTransaction.READ_WRITE ? IDBTransaction.READ_WRITE : "readwrite"
    //     ); // This is either successful or it throws an exception.
    //     // Note that the ternary operator is for browsers that only support the READ_WRITE value.
    //   } catch (ex) {
    //     console.log(
    //       "db.transaction exception in handleFileSelection() - " + ex.message
    //     );
    //     return;
    //   }

    //   transaction.onerror = (evt) => {
    //     console.log("transaction.onerror: " + evt.target.error);
    //   };
    //   transaction.onabort = function () {
    //     console.log("transaction.onabort fired in handleFileSelection()");
    //   };
    //   transaction.oncomplete = function () {
    //     console.log("transaction.oncomplete fired in handleFileSelection()");
    //   };

    //   try {
    //     var objectStore = transaction.objectStore(state.idb.storeName);
    //     // Note that multiple put()'s can occur per transaction.

    //     for (var i = 0, file; (file = files[i]); i++) {
    //       var putRequest = objectStore.put(file);
    //       // The put() method will update an existing record, whereas the add() method won't.
    //       putRequest.onsuccess = function () {
    //         state.idb.empty = false;
    //       }; // There's at least one object in the database's object store.
    //       // This info (i.e., state.idb.empty) is used in displayDB().
    //       putRequest.onerror = function (evt) {
    //         console.log("putRequest.onerror: " + evt.target.error);
    //       };
    //     }
    //   } catch (ex) {
    //     console.log("Transaction and/or put() exception " + ex.message);
    //     return;
    //   }
    // },
    // openDB: ({ state, dispatch }) => {
    //   console.log("openDB()");
    //   // displayMessage ("<p>Your request has been queued.</p>");

    //   if (!window.indexedDB.open) {
    //     console.log("window.indexedDB.open is null in openDB()");
    //     return;
    //   } // if

    //   try {
    //     var openRequest = window.indexedDB.open(
    //       state.idb.name,
    //       state.idb.version
    //     );

    //     openRequest.onerror = function (evt) {
    //       console.log("openRequest: " + evt.target.error);
    //     };
    //     openRequest.onblocked = dispatch("openDB_onblocked");
    //     // Called if the database is opened via another process, or similar.
    //     openRequest.onupgradeneeded = dispatch("openDB_onupgradeneeded");
    //     // Called if the database doesn't exist or the database version values don't match.
    //     openRequest.onsuccess = dispatch("openDB_onsuccess");
    //     // Attempts to open an existing database (that has a correctly matching version value).
    //   } catch (ex) {
    //     console.log(
    //       "window.indexedDB.open exception in openDB() - " + ex.message
    //     );
    //   }
    // },
    // openDB_onsuccess: ({ state }, evt) => {
    //   console.log("openDB_onsuccess()");
    //   // displayMessage ("<p>Your request has been queued.</p>");
    //   // Normally, this will be instantly blown away by the next displayMessage().

    //   state.idb.db = evt.target.result;
    //   // A successfully opened database results in a database object, which we place in our global IndexedDB variable.

    //   if (!state.idb.db) {
    //     console.log(
    //       "db (i.e., evt.target.result) is null in openDB_onsuccess()"
    //     );
    //     return;
    //   }

    //   state.idb.message += "<p>The database has been opened.</p>";
    //   // displayMessage(state.idb.message);
    //   state.idb.message = ""; // The message has been delivered to the user, "zero" it out just to be safe.
    // },
    // openDB_onupgradeneeded: ({ state }, evt) => {
    //   console.log("openDB_onupgradeneeded()");
    //   // displayMessage("<p>Your request has been queued.</p>");

    //   state.idb.db = evt.target.result; // A successfully opened database
    //   // results in a database object, which we place in our global IndexedDB variable.

    //   if (!state.idb.db) {
    //     console.log(
    //       "db (i.e., evt.target.result) is null in openDB_onupgradeneeded()"
    //     );
    //     return;
    //   }

    //   try {
    //     state.idb.db.createObjectStore(state.idb.storeName, {
    //       keyPath: "ID",
    //       autoIncrement: true,
    //     }); // Create the object store such that each object
    //     // in the store will be given an "ID" property that is auto-incremented monotonically.
    //     // Thus, files of the same name can be stored in the database.
    //   } catch (ex) {
    //     console.log("Exception in openDB_onupgradeneeded() - " + ex.message);
    //     return;
    //   }

    //   state.idb.message = "<p>The database has been created.</p>";
    //   // A means of communicating this information to the openDB_onsuccess handler.
    // },
    // openDB_onblocked: ({ state }, evt) => {
    //   console.log("openDB_onupgradeneeded()");

    //   state.idb.message =
    //     "<p>The database is blocked - error code: " +
    //     (evt.target.error ? evt.target.error : evt.target.errorCode) +
    //     "</p>";
    //   state.idb.message +=
    //     "</p>If this page is open in other browser windows, close these windows.</p>";

    //   // displayMessage (message);
    // },
    setSeitenAnsicht: ({ commit }, payload) => {
      commit("SET_SEITENANSICHT", payload);
    },
    getBooks: async ({ state, commit }, userId) => {
      const response = await Axios.post(state.url + "getBooks.php", {
        kid: userId,
      });
      // console.log("RESPONSE: ", response);
      if (!response.error) {
        commit("setBooks", response.data.books);
      }
    },
    getMarkersFromDb: async ({ state, commit }) => {
      state.markers = [];
      try {
        const response = await Axios.post(state.url + "marker.php", {
          toDo: "getMarker",
          customerId: state.user.id,
          bookId: state.currentBook.id,
        });
        commit("setMarkers", response.data.markers);
        console.log("MARKERSxxxx", response.data);
        console.log("MARKERS", response.data.markers);
      } catch (error) {
        console.error("Load Markers fom DB failed! (in store) ");
      }
    },
    saveMarkersToDB: async ({ state }) => {
      console.log("saveMarkersToDB", state.markers);
      try {
        const response = await Axios.post(state.url + "marker.php", {
          toDo: "saveMarker",
          customerId: state.user.id,
          bookId: state.currentBook.id,
          markers: state.markers,
        });
        console.log("RESULT", response);
      } catch (error) {
        console.error("Load Markers fom DB failed! (in store) ");
      }
    },
    getSubusers: async ({ state, commit }) => {
      const response = await Axios.post(state.url + "subuser.php", {
        todo: "getsubusers",
        userid: state.user.id,
        bookid: state.currentBook.id,
        kbid: state.currentBook.kb_id,
      });
      // console.log("RESPONSE: ", response);
      if (!response.error) {
        commit("SET_SUBUSERS", response.data);
      }
    },
    saveNewSubuser: async ({ state, dispatch }, payload) => {
      const response = await Axios.post(state.url + "subuser.php", {
        todo: "savesub",
        subData: payload,
      });
      // console.log("RESPONSE: ", response);
      if (!response.error) {
        dispatch("getSubusers");
        console.log("xxx");
      }
    },
    deleteSubuser: async ({ state, dispatch }, payload) => {
      console.log("delete subuser", payload);
      const response = await Axios.post(state.url + "subuser.php", {
        todo: "delsub",
        subId: payload.subid,
        kbId: payload.kbid,
      });
      console.log("RESPONSE: ", response);
      if (!response.error) {
        dispatch("getSubusers");
        console.log("x-x-x");
      }
    },
    // eslint-disable-next-line
    login: ({ commit, dispatch }, payload) => {
      // console.log('login', payload)
      commit("SET_TOKEN", payload.token);
      commit("SET_USER", payload.user);
      commit("SET_SECRET", payload.secret);
      dispatch("getBooks", payload.user.id);
      // set auth header
      Axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${payload.token}`;
    },
    logout: ({ commit }) => {
      commit("RESET", "");
    },
    setCurrentBook: ({ commit }, book) => {
      commit("setCurrentBook", book);
    },
    setCurrentMarker: ({ commit }, color) => {
      commit("SET_CURMARKER", color);
    },
    setOnlineMode: ({ commit }, payload) => {
      commit("onlineMode", payload);
    },
    setMarkersForBook: ({ commit }, payload) => {
      commit("setMarkersForBook", payload);
    },
    setModal: ({ commit }, payload) => {
      console.log("setModal", payload);
      commit("setModal", payload);
    },
    setCurPage: ({ commit }, pageNo) => {
      commit("SET_CURPAGE", pageNo);
    },
    sendNotificationToSubuser: async ({ state }, payload) => {
      const response = await Axios.post(state.url + "mail.php", {
        email: payload.email,
        book: payload.book,
        password: payload.password,
      });
      console.log("RESPONSE: ", response);
    },
  },
  modules: {},
});
