import axios from 'axios';

// Função para obter o token JWT do localStorage, sessionStorage ou Pinia store
function getToken() {
  // Tente buscar do localStorage, sessionStorage ou de uma store
  return localStorage.getItem('jwt') || sessionStorage.getItem('jwt');
}

// Função para criar instância de Axios
export function api() {
  const instance = axios.create({
    // baseURL pode ser customizada por serviço, se necessário
    // baseURL: serviceName ? ... : ...
  });

  // Interceptor para adicionar o token JWT
  instance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
}
