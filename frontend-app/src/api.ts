import axios from "axios";

export const api = axios.create({
  baseURL: "http://85.250.92.38:5000",
  headers: {
    "Access-Control-Allow-Methods": "true",
    "Content-Type": "application/json",
  },
});