import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:4000/",
});

export const API = {
  POST: async (url: string, payload: any) => {
    return await instance.post(url, payload);
  },
};
