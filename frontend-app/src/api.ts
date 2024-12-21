import axios from "axios";

export const api = axios.create({
  baseURL: "https://lone-soldier.onrender.com",
  headers: {
    Authorization: `Barener ${sessionStorage.getItem("token")}`,
    "Access-Control-Allow-Methods": "true",
    "Content-Type": "application/json",
  },
});
