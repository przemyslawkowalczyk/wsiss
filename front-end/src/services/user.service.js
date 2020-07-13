import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

const getPublicList = () => {
  return axios.get(API_URL + "all", { headers: authHeader() });
};

const getMyBooks = () => {
  return axios.get(API_URL + "my_books", { headers: authHeader() });
}

const reserveBook = id => {
  return axios.post(API_URL + "reserve_book", { id }, { headers: authHeader() });
}

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

export default {
  getPublicList,
  getMyBooks,
  reserveBook,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};
