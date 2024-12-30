import axios from "axios";

export const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "/api"
      : "https://lone-soldier.onrender.com/api",
  headers: {
    Authorization: `Barener ${sessionStorage.getItem("token")}`,
    "Access-Control-Allow-Methods": "true",
    "Content-Type": "application/json",
  },
});
