import axios from "axios";

// Criar uma instância do Axios
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000,
});

export default api;