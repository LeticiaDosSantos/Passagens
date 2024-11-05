import axios from 'axios';

// Configuração do cliente Axios para se comunicar com o backend
const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api', // Endereço do servidor backend
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default {
  // Pega a lista completa de usuários
  getUsuarios() {
    return apiClient.get('/usuarios');
  },
  
  // Pega um usuário específico pelo ID
  getUsuario(id) {
    return apiClient.get(`/usuarios/${id}`);
  },
  
  // Cria um novo usuário (envia os dados para o backend)
  createUsuario(userData) {
    return apiClient.post('/usuarios', userData);
  }
};
