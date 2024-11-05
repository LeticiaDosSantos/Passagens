<template>
    <div class="container mt-5">
      <h2 class="title-page">Meus Voucher2s</h2>
      <div v-if="loading" class="alert alert-info">Carregando...</div>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
  
      <ul v-if="filteredVouchers.length">
        <li v-for="voucher in filteredVouchers" :key="voucher.id">
          Voucher ID: {{ voucher.id }} | 
          Usuário ID: {{ voucher.id_usuario }} | 
          Viagem ID: {{ voucher.id_viagem[0] }} | 
          Quantidade: {{ voucher.quantidade }}
        </li>
      </ul>
      <div v-else>Não há vouchers disponíveis para este usuário.</div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import axios from 'axios';
  
  const vouchers = ref([]);
  const loading = ref(true);
  const error = ref(null);
  const userId = 1; // ID do usuário que queremos filtrar
  
  // Função para buscar os vouchers
  const fetchVouchers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/vouchers');
      console.log(response.data); // Log para depuração
      vouchers.value = response.data; // A resposta é um array de vouchers
    } catch (err) {
      error.value = 'Erro ao carregar os vouchers.';
      console.error('Erro ao carregar os vouchers:', err.response ? err.response.data : err.message);
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(fetchVouchers);
  
  // Computed para filtrar os vouchers do usuário específico
  const filteredVouchers = computed(() => {
    return vouchers.value.filter(voucher => voucher.id_usuario === userId);
  });
  </script>
  
  <style scoped>
  .alert {
    margin-bottom: 1rem;
  }
  </style>
  