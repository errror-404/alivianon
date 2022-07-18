import axios from "axios";

export const BaseApiUrl = axios.create({
  baseURL: "http://192.168.1.9:3001/users/",
  // baseURL: "http://drpc-main.herokuapp.com",
});
