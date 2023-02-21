import Axios from "axios";
import Vuex from "vuex";

export default new Vuex.createStore({
  state: {
    // url: "https://front.promosverlag.de/api/",
    // dataUrl: "https://front.promosverlag.de/data/",
    url: "https://bib.promosverlag.de/api/",
    dataUrl: "https://bib.promosverlag.de/data/",
    online: true,
    mainMenu: "book",
    token: "",
    secret: "",
    user: {},
    books: [],
    currentBook: {},
    markers: [],
    curMarker: "",
    subusers: [],
    modal: {
      state: false,
      content: "",
    },
  },
  getters: {
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
      const result = state.markers.find(
        (m) => m.bookId == payload.bookId && m.page == payload.page
      );
      if (result !== undefined) {
        return result;
      } else {
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
      state.subusers = payload;
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
      // console.log("RESPONSE: ", response);
      if (!response.error) {
        dispatch("getSubusers");
        console.log("xxx");
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
