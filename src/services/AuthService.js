// src/services/AuthService.js
import axios from "axios";

// const url = 'http://localhost:3000/api/';
// const url = "http://promos-verlag.de/v2/api/";
const url = "https://bib.promosverlag.de/api/";
// const url = "https://bib.promosverlag.net/api/";

export default {
  async login(payload) {
    const response = await axios.post(url + "login.php", payload);
    // console.log("RESPONSE: ", response);
    return response.data;
  },
  // signUp (payload) {
  //   return axios
  //     .post(url + 'sign-up/', payload)
  //     .then(response => response.data);
  // },
  getSecretContent() {
    // return axios.get(url + 'secret-route/').then(response => response.data);
    return "202cb963ac59075b964b07152d234b70";
  },
  async checkSecret(secret) {
    const response = await axios.post(url + "checkSecret.php", {
      secret: secret,
    });
    return response.data;
  },
};
