import axios from "axios";
import Cookies from "js-cookie";


class ApiService {
  static instance = null;
  axiosInstance;
  baseURL;

  constructor() {
    if (process.env.NODE_ENV === "production") {
      this.baseURL = "api-tarefas.up.railway.app/api/";
    } else {
      this.baseURL = "api-tarefas.up.railway.app/api/";
    }
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
    });
  }

  static getInstance() {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  handleAxiosError(error) {
    if (error.response) {
      console.error("Erro na resposta do servidor:", error.response);
      return new Error("Erro na resposta do servidor");
    } else if (error.request) {
      console.error("Sem resposta do servidor:", error.request);
      return new Error("Sem resposta do servidor");
    } else {
      console.error("Erro ao configurar a solicitação:", error.message);
      return new Error("Erro ao configurar a solicitação");
    }
  }

  async request(method, url, data) {
    const cookie = Cookies.get("access_token");
    try {
      const response = await this.axiosInstance.request({
        method,
        url,
        data,
        headers: {
          Authorization: `Bearer ${cookie}`,
          "Content-Type": "application/json",
        },
      });
      return {
        ...response,
      };
    } catch (error) {
      if (error.isAxiosError) {
        throw this.handleAxiosError(error);
      } else {
        throw error;
      }
    }
  }

  async get(url) {
    return this.request("GET", url);
  }

  async post(url, data) {
    return this.request("POST", url, data);
  }

  async put(url, data) {
    return this.request("PUT", url, data);
  }

  async delete(url) {
    return this.request("DELETE", url);
  }
}

export default ApiService.getInstance();