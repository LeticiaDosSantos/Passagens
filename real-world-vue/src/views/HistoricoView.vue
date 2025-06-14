<template>
    <div class="container mt-5">
      <h2 class="title-page">Histórico</h2>
      <div class="mb-3 input-group">
        <span class="input-group-text">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.08 1.08l3.77 3.77a1 1 0 0 0 1.415-1.415l-3.77-3.77zM6.5 11a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z"/>
          </svg>
        </span>
        <input
          type="text"
          class="form-control"
          placeholder="Pesquisar por passageiro, tipo, CPF ou data"
          v-model="searchQuery"
        />
        <span class="input-group-text" @click="clearSearch" style="cursor: pointer;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 1 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 1 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </span>
      </div>
  
      <div v-if="loading" class="alert alert-info">Carregando...</div>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
  
      <table class="table table-striped" v-if="!loading && !error">
        <thead>
          <tr>
            <th>ID</th>
            <th>Passageiro</th>
            <th>CPF</th>
            <th>Viagem</th>
            <th>Data</th>
            <th>Tipo</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="registro in filteredHistorico" :key="registro.id">
            <td>{{ registro.id }}</td>
            <td>{{ registro.passageiro }}</td>
            <td>{{ registro.cpf }}</td>
            <td>{{ registro.viagem }}</td>
            <td>{{ registro.data }}</td>
            <td>{{ registro.tipo }}</td>
            <td>R$ {{ registro.valor.toFixed(2).replace('.', ',') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, computed } from 'vue';
  import axios from 'axios';
  
  export default {
    name: 'HistoricoView',
    setup() {
      const historico = ref([]);
      const loading = ref(true);
      const error = ref(null);
      const searchQuery = ref('');
  
      const fetchHistorico = async () => {
        try {
          const response = await axios.get('http://localhost:3001/api/historico');
          historico.value = response.data;
        } catch (err) {
          error.value = 'Erro ao carregar o histórico.';
          console.error(err);
        } finally {
          loading.value = false;
        }
      };
  
      onMounted(fetchHistorico);
  
      const filteredHistorico = computed(() => {
        if (!searchQuery.value) return historico.value;
        const query = searchQuery.value.toLowerCase();
        return historico.value.filter(registro =>
          registro.passageiro?.toLowerCase().includes(query) ||
          registro.tipo?.toLowerCase().includes(query) ||
          registro.cpf?.includes(query) ||
          registro.data?.toLowerCase().includes(query)
        );
      });
  
      const clearSearch = () => {
        searchQuery.value = '';
      };
  
      return {
        historico,
        loading,
        error,
        searchQuery,
        filteredHistorico,
        clearSearch
      };
    }
  };
  </script>
  
  <style scoped>
  .container {
    margin-top: 20px;
  }
  </style>
  