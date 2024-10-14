import Axios from "axios";
import Vuex from "vuex";
import {
  idb_set,
  idb_get,
  idb_del,
  idb_fileToBlob,
  idb_blobToArrayBuffer,
  idb_arrayBufferToBlob,
} from "@/services/idb.js";

export default new Vuex.createStore({
  state: {
    // url: "https://front.promosverlag.de/api/",
    // dataUrl: "https://front.promosverlag.de/data/",
    url: "https://bib.promosverlag.de/api/",
    dataUrl: "https://bib.promosverlag.de/data/",
    // url: "https://test.promos-verlag.de/api/",
    // dataUrl: "https://test.promo-sverlag.de/data/",
    // url: "/api/",
    // url: "https://bib.promosverlag.net/api/",
    // dataUrl: "https://bib.promosverlag.net/data/",
    // localdata: "data/",
    localdata: "data/",
    debug: false,
    deferredPrompt: null,
    online: true,
    isChrome: false,
    mainMenu: "book",
    token: "",
    secret: "",
    userstate: "subuser", // customer or subuser
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
    seitenAnsicht: "single",
    bookDownload: {
      bookid: -1,
      maxpages: 0,
      state: "start", // start - loading - end - error
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
      if (state.debug) {
        // console.log("STATE ", state);
      }
    },
    SET_BOOKSINSTORE: (state, books) => {
      state.books = books;
    },
    SET_CURMARKER: (state, color) => {
      state.curMarker = color;
    },
    SET_SECRET: (state, secret) => {
      state.secret = secret;
    },
    SET_USERSTATE: (state, userstate) => {
      state.userstate = userstate;
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

    UPDATE_BOOKDOWNLOAD: (state, payload) => {
      if (state.debug) {
        // console.log(`KEY ${payload.key} VAL ${payload.value}.`);
      }
      switch (payload.key) {
        case "bookid":
          state.bookDownload.bookid = payload.value;
          break;
        case "maxpages":
          state.bookDownload.maxpages = payload.value;
          break;
        case "state":
          state.bookDownload.state = payload.value;
          break;

        default:
        // console.log(`Sorry, we are out of ${payload.key}.`);
      }
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
    SET_ONLINE: (state, onlinestate) => {
      state.online = onlinestate;
    },
    SET_ISCHROME: (state, isChrome) => {
      state.isChrome = isChrome;
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
    saveImageIDB: async ({ state }, payload) => {
      // payload [key: 'b'bokkId'p'pageid, url:url]
      if (state.debug) {
        // console.log("saveImageIDB", payload, state.online);
      }
      const blob = await idb_fileToBlob(payload.url);
      const ab = await idb_blobToArrayBuffer(blob);
      await idb_set(payload.key, ab);
    },
    delImageIDB: async ({ state }, payload) => {
      // payload [key: 'b'bokkId'p'pageid, url:url]
      if (state.debug) {
        console.log("delImageIDB", payload);
      }
      await idb_del(payload.key);
    },
    getImageIDB: async ({ state }, key) => {
      if (state.debug) {
        // console.log("getImageIDB", key, state.online);
      }
      const ab = await idb_get(key);
      return ab;
    },
    getImageURL: async ({ state }, key) => {
      if (state.debug) {
        // console.log("getImageURL", key, state.online);
      }
      const ab = await idb_get(key);
      const blob = await idb_arrayBufferToBlob(ab);
      const uri = URL.createObjectURL(blob);
      // console.log("getImageURL==========", uri, key);
      return uri;
    },
    checkIDBForKey: async ({ state }, bookid) => {
      if (state.debug) {
        // console.log("checkIDBForKey x", bookid, state.online);
      }
      let key = `b${bookid}p0`;
      let res = await await idb_get(key);
      // console.log("checkIDBForKey res", res);
      // console.log("checkIDBForKey typeof res", typeof res);
      if (typeof res == "object") {
        // console.log("checkIDBForKey offline verfügbar", bookid);
        // offline verfügbar
        return true;
      } else {
        // console.log("checkIDBForKey online", bookid);
        // nicht offline verfügbar
        return false;
      }
    },
    setSeitenAnsicht: ({ commit }, payload) => {
      commit("SET_SEITENANSICHT", payload);
    },
    SET_BOOKDOWNLOAD: ({ commit }, payload) => {
      // console.log(`KEY ${payload.key} VAL ${payload.value}.`);
      commit("UPDATE_BOOKDOWNLOAD", payload);
    },
    SET_ONLINE: ({ commit }, onlinestate) => {
      commit("SET_ONLINE", onlinestate);
    },
    SET_ISCHROME: ({ commit }, isChrome) => {
      commit("SET_ISCHROME", isChrome);
    },
    SET_BOOKSINSTORE: ({ commit }, books) => {
      commit("SET_BOOKSINSTORE", books);
    },
    GET_BOOKSSUBUSER: async ({ state, commit }, email) => {
      const response = await Axios.post(state.url + "getBooksSub.php", {
        email: email,
      });
      // console.log("RESPONSE: ", response);
      if (!response.error) {
        commit("setBooks", response.data.books);
      }
      return response.data.books;
    },
    getBooks: async ({ state, commit }, userId) => {
      const response = await Axios.post(state.url + "getBooks.php", {
        kid: userId,
      });
      // console.log("RESPONSE: ", response);
      if (!response.error) {
        commit("setBooks", response.data.books);
      }
      return response.data.books;
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
        // console.log("MARKERSxxxx", response.data);
        // console.log("MARKERS", response.data.markers);
      } catch (error) {
        // console.error("Load Markers fom DB failed! (in store) ");
      }
    },

    saveMarkersToDB: async ({ state }) => {
      try {
        const response = await Axios.post(state.url + "marker.php", {
          toDo: "saveMarker",
          customerId: state.user.id,
          bookId: state.currentBook.id,
          markers: state.markers,
        });
        if (state.debug) {
          console.log("RESULT", response);
        }
      } catch (error) {
        // console.error("Load Markers fom DB failed! (in store) ");
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
      // console.log("RESPONSE saveNewSubuser: ", response);
      if (!response.error) {
        dispatch("getSubusers");
      }
      return response;
    },
    updateUserPassword: async ({ state }, payload) => {
      console.log("🚀 ~ updateUserPassword: ~ payload:", payload);
      console.log("🚀 ~ updateUserPassword: ~ user:", state.user.email);
      const response = await Axios.post(state.url + "kunden.php", {
        toDo: "updatePW",
        payload: payload, // { email: email, password: password, newpassword: newpassword }
      });
      console.log("RESPONSE saveNewSubuser: ", response);

      if (!response.error) {
        // todo dispatch("getSubusers");
      }
      return true;
    }, // TODO: update user password
    deleteSubuser: async ({ state, dispatch }, payload) => {
      const response = await Axios.post(state.url + "subuser.php", {
        todo: "delsub",
        subId: payload.subid,
        kbId: payload.kbid,
      });
      if (!response.error) {
        dispatch("getSubusers");
      }
    },
    // eslint-disable-next-line
    SET_USERDATA: ({ commit, dispatch }, payload) => {
      commit("SET_TOKEN", payload.token);
      commit("SET_USER", payload.user);
      commit("SET_SECRET", payload.secret);
      commit("SET_USERSTATE", payload.userstate);
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
    setMarkersForBook: ({ commit }, payload) => {
      commit("setMarkersForBook", payload);
    },
    setModal: ({ commit }, payload) => {
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
        username: payload.username,
      });
      if (state.debug) {
        console.log("RESPONSE: ", response);
      }
    },
  },
  modules: {},
});
