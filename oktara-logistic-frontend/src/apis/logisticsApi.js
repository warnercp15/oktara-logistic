import axios from "axios";

const logisticsApi = axios.create({
  baseURL: "https://oktara-logistic-backend.herokuapp.com/",
});

export default logisticsApi;