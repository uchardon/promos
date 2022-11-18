import Axios from "axios";
import Vuex from "vuex";

export default new Vuex.createStore({
  state: {
    url: "http://promos-verlag.de/v2/api/",
    dataUrl: "http://promos-verlag.de/v2/data/",
    online: true,
    mainMenu: "book",
    token: "",
    secret: "",
    user: {},
    books: [],
    currentBookId: 0,
    markers: [],
  },
  getters: {
    isLoggedIn: (state) => {
      return state.token;
    },
    getUser: (state) => {
      return state.user;
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
    setBooks: (state, payload) => {
      state.books = payload;
    },
    setCurrentBookId: (state, bookId) => {
      state.currentBookId = bookId;
    },
    setMainMenu: (state, payload) => {
      // ...
      state.mainMenu = payload;
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
    setMarkersForBook: ({ commit }, payload) => {
      commit("setMarkersForBook", payload);
    },
  },
  modules: {},
});
