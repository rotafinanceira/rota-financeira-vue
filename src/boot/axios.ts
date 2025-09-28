import axios from 'axios';

// Função para obter o token JWT do localStorage, sessionStorage ou Pinia store
function getToken() {
  // Tente buscar do localStorage, sessionStorage ou dos cookies
  const local = localStorage.getItem('jwt');
  const session = sessionStorage.getItem('jwt');
  if (local) return local;
  if (session) return session;
  // Busca nos cookies
  const cookieToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('token='))
    ?.split('=')[1];
  return cookieToken || null;
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
      console.log('[Axios] Enviando JWT:', token);
    } else {
      console.log('[Axios] Nenhum JWT encontrado para esta requisição.');
    }
    return config;
  });

  return instance;
}
