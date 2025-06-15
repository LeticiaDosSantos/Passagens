<template>
  <div class="container mt-5">
    <h2 class="title-page">Viagens</h2>

    <div class="mb-3 text-end">
      <button class="btn btn-primary" @click="showModal">Novo</button>
    </div>

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

    <!-- Modal -->
    <div class="modal fade" id="modalViagem" tabindex="-1" aria-labelledby="modalViagemLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalViagemLabel">Cadastrar Nova Viagem</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitViagem">
              <div class="mb-3">
                <label class="form-label">Título</label>
                <input type="text" class="form-control" v-model="novaViagem.titulo" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Origem</label>
                <input type="text" class="form-control" v-model="novaViagem.origem" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Destino</label>
                <input type="text" class="form-control" v-model="novaViagem.destino" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Valor Comum</label>
                <input type="number" class="form-control" v-model.number="novaViagem.valores.Comum" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Valor Idoso</label>
                <input type="number" class="form-control" v-model.number="novaViagem.valores.Idoso" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Valor Meia</label>
                <input type="number" class="form-control" v-model.number="novaViagem.valores.Meia" required />
              </div>
              <button type="submit" class="btn btn-primary">Salvar</button>
            </form>
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

const novaViagem = ref({
  titulo: '',
  origem: '',
  destino: '',
  valores: {
    Comum: 0,
    Idoso: 0,
    Meia: 0
  }
});

const fetchViagens = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/viagens');
    viagens.value = response.data;
  } catch (err) {
    error.value = 'Erro ao carregar as viagens.';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchViagens);

const filteredViagens = computed(() => {
  if (!searchQuery.value) return viagens.value;
  const query = searchQuery.value.toLowerCase();
  return viagens.value.filter(v =>
    v.titulo.toLowerCase().includes(query) ||
    v.origem.toLowerCase().includes(query) ||
    v.destino.toLowerCase().includes(query)
  );
});

const showModal = () => {
  const modal = new bootstrap.Modal(document.getElementById('modalViagem'));
  modal.show();
};

const submitViagem = async () => {
  try {
    await axios.post('http://localhost:3001/api/viagens', novaViagem.value);
    alert('Viagem cadastrada com sucesso!');
    fetchViagens();
    novaViagem.value = {
      titulo: '', origem: '', destino: '',
      valores: { Comum: 0, Idoso: 0, Meia: 0 }
    };
    bootstrap.Modal.getInstance(document.getElementById('modalViagem')).hide();
  } catch (err) {
    console.error(err);
    alert('Erro ao cadastrar viagem.');
  }
};
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
