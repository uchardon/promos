import Axios from "axios";
import Vuex from "vuex";

export default new Vuex.createStore({
  state: {
    url: "https://front.promosverlag.de/api/",
    dataUrl: "https://front.promosverlag.de/data/",
    online: true,
    mainMenu: "book",
    token: "",
    secret: "",
    user: {},
    books: [],
    currentBook: {},
    markers: [],
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
    getMarkersByBookpage: (state) => (payload) => {
      const result = state.markers.find(
        (m) => m.bookId == payload.bookId && m.page == payload.page
      );
      if (result !== undefined) {
        return result;
      } else {
        return -1;
      }
    },
  },
  mutations: {
    RESET: (state) => {
      // Object.assign(state, getDefaultState());
      console.log("STATE ", state);
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_SECRET: (state, secret) => {
      state.secret = secret;
    },
    setModal: (state, payload) => {
      state.modal.state = payload.state;
      state.modal.content = payload.content;
    },
    setMarkers: (state, markers) => {
      state.markers = markers;
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
    onlineMode: (state, payload) => {
      state.online = payload;
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
      console.log("RESPONSE: ", response);
      if (!response.error) {
        commit("setBooks", response.data.books);
      }
    },
    getMarkersFromDb: async ({ state, commit }) => {
      let markers = [];
      try {
        markers = await Axios.post(state.url + "checkSecret.php", {
          userId: state.user.id,
        });
        commit("setMarkers", markers);
      } catch (error) {
        console.error("Load Markers fom DB failed! (in store) ");
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
  },
  modules: {},
});
