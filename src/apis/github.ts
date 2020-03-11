import axios from "axios";

axios.defaults.adapter = require("axios/lib/adapters/http");

export const github = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github.v3+json"
  }
});
