import axios from "axios";
// const baseURL = "https://lucred.herokuapp.com/api/v1/";
const baseURL = "https://lucred-backend.onrender.com/api/v1/";
// const token = localStorage.getItem("b2b_token");
// const string = token;

export default {
  get(todo) {
    const token = localStorage.getItem("b2b_token")?.replace(/^"(.+(?="$))"$/, "$1")
    return axios.get(baseURL + todo, {
      headers: {
        "x-admin-token": token,
      },
    });
  },
  create(todo, payload) {
    return axios.post(baseURL + todo, payload);
  },
  post(todo, payload) {
    const token = localStorage.getItem("b2b_token")?.replace(/^"(.+(?="$))"$/, "$1")
    console.log(token);
    return axios.post(baseURL + todo, payload, {
      headers: {
        "x-admin-token": token,
      },
    });
  },
  upload(todo, payload) {
    const token = localStorage.getItem("b2b_token")?.replace(/^"(.+(?="$))"$/, "$1")
    console.log(token);
    return axios.post(baseURL + todo, payload, {
      headers: {
        "x-admin-token": token,
        "Content-Type": "multipart/form-data",
      },
    });
  },
  update(todo, payload) {
    const token = localStorage.getItem("b2b_token")?.replace(/^"(.+(?="$))"$/, "$1")
    return axios.put(baseURL + todo, payload, {
      headers: {
        "x-admin-token": token,
        "Content-Type": "multipart/form-data",
      },
    });
  },
  put(todo, payload) {
    const token = localStorage.getItem("b2b_token")?.replace(/^"(.+(?="$))"$/, "$1")
    return axios.put(baseURL + todo, payload, {
      headers: {
        "x-admin-token": token,
      },
    });
  },
  updateUpload(todo, payload) {
    const token = localStorage.getItem("b2b_token")?.replace(/^"(.+(?="$))"$/, "$1")
    return axios.patch(baseURL + todo, payload, {
      headers: {
        "x-admin-token": token,
        "Content-Type": "multipart/form-data",
      },
    });
  },
  delete(todo) {
    const token = localStorage.getItem("b2b_token")?.replace(/^"(.+(?="$))"$/, "$1")
    return axios.delete(baseURL + todo, {
      headers: {
        "x-admin-token": token,
      },
    });
  },
};
