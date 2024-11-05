<template>
    <div class="container mt-5">
      <h2 class="title-page">Viagens</h2>
      <div v-if="loading" class="alert alert-info">Carregando...</div>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
  
      <div class="row">
        <div
          class="col-md-4 mb-3"
          v-for="viagem in filteredViagens"
          :key="viagem.id"
        >
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">{{ viagem.titulo }}</h5>
              <p class="card-text">Origem: {{ viagem.origem }}</p>
              <p class="card-text">Destino: {{ viagem.destino }}</p>
              <b>Valores</b>
              <p class="card-text">Comum: R$ {{ viagem.valores.Comum.toFixed(2) }}</p>
              <p class="card-text">Idoso: R$ {{ viagem.valores.Idoso.toFixed(2) }}</p>
              <p class="card-text">Meia: R$ {{ viagem.valores.Meia.toFixed(2) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import axios from 'axios';
  
  const viagens = ref([]);
  const loading = ref(true);
  const error = ref(null);
  const searchQuery = ref('');
  
  const fetchViagens = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/viagens');
      viagens.value = response.data; // A estrutura correta é um array de viagens
    } catch (err) {
      error.value = 'Erro ao carregar as viagens.';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(fetchViagens);
  
  const filteredViagens = computed(() => {
    if (!searchQuery.value) {
      return viagens.value;
    }
    const query = searchQuery.value.toLowerCase();
    return viagens.value.filter(viagem =>
      viagem.titulo.toLowerCase().includes(query) ||
      viagem.origem.toLowerCase().includes(query) ||
      viagem.destino.toLowerCase().includes(query)
    );
  });
  </script>
  
  <style scoped>
  .card {
    border: 1px solid #007bff;
  }
  
  .card-title {
    font-size: 1.25rem;
    font-weight: bold;
  }
  </style>
  