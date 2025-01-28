import axios from "axios";

export const apiAddress = "wss://reg-websocket.helpdesk-maraba.cloud/";
export const apiAddressApi = "https://reg-api.helpdesk-maraba.cloud/";

const api = axios.create({
  baseURL: "https://reg-api.helpdesk-maraba.cloud/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;
      if (status >= 200 && status < 600) {
        return Promise.resolve(error.response);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
