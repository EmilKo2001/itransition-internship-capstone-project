import { create } from "axios";

const axios = create({
  baseURL: process.env.REACT_APP_API,
  timeout: 5000,
});

export default axios;
