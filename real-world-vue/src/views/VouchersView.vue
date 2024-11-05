<template>
  <div class="container mt-5">
    <h2 class="title-page">Meus Vouchers</h2>
    <div v-if="loading" class="alert alert-info">Carregando...</div>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <div class="row">
      <div
        class="col-md-4 mb-3"
        v-for="voucher in filteredVouchers"
        :key="voucher.id"
      >
        <div class="card h-100 d-flex flex-row">
          <div class="card-body d-flex flex-grow-1">
            <div class="flex-grow-1">
              <h5 class="card-title">{{ getViagemInfo(voucher.id_viagem).titulo }}</h5>
              <p class="card-text">Origem: {{ getViagemInfo(voucher.id_viagem).origem }}</p>
              <p class="card-text">Destino: {{ getViagemInfo(voucher.id_viagem).destino }}</p>
              <p class="card-text">Valor: R$ {{ getViagemInfo(voucher.id_viagem).valores.Comum.toFixed(2) }}</p>
            </div>
            <div class="quantity-circle">{{ voucher.quantidade }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="filteredVouchers.length === 0">Não há vouchers disponíveis para este usuário.</div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const vouchers = ref([]);
const viagens = ref([]);
const loading = ref(true);
const error = ref(null);
const userId = 1; // ID do usuário que queremos filtrar

// Função para buscar os vouchers
const fetchVouchers = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/vouchers');
    vouchers.value = response.data; // A resposta é um array de vouchers
  } catch (err) {
    error.value = 'Erro ao carregar os vouchers.';
    console.error('Erro ao carregar os vouchers:', err.response ? err.response.data : err.message);
  } finally {
    loading.value = false;
  }
};

// Função para buscar todas as viagens
const fetchViagens = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/viagens');
    viagens.value = response.data; // A resposta é um array de viagens
  } catch (err) {
    error.value = 'Erro ao carregar as viagens.';
    console.error('Erro ao carregar as viagens:', err.response ? err.response.data : err.message);
  }
};

// Chamando as funções para buscar dados
onMounted(async () => {
  await Promise.all([fetchVouchers(), fetchViagens()]);
});

// Computed para filtrar os vouchers do usuário específico
const filteredVouchers = computed(() => {
  return vouchers.value.filter(voucher => voucher.id_usuario === userId);
});

// Função para obter informações da viagem pelo ID
const getViagemInfo = (id) => {
  const viagem = viagens.value.find(v => v.id === id);
  return viagem || {};
};
</script>

<style scoped>
.alert {
  margin-bottom: 1rem;
}

.card {
  border: 1px solid #007bff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.card-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.quantity-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #007bff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-left: 10px;
}
</style>
