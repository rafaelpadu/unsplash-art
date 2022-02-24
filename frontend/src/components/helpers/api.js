import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    "Content-Type": "application/json;charset=UTF-8",
    responseType: "json",
  },
});
