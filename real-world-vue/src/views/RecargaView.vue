<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import axios from 'axios'

const cpf = ref('')
const nome = ref('')
const viagemIdSelecionada = ref('')
const quantidade = ref(1)
const tipo = ref('Comum') // Novo campo

const viagens = ref([])
const carregandoViagens = ref(true)
const erroViagens = ref(null)

const erroCpf = ref(null)

const fetchViagens = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/viagens')
    viagens.value = response.data
  } catch (err) {
    erroViagens.value = 'Erro ao carregar as viagens.'
  } finally {
    carregandoViagens.value = false
  }
}

onMounted(fetchViagens)

const viagemSelecionada = computed(() =>
  viagens.value.find(v => v.id === viagemIdSelecionada.value)
)

const valorTotal = computed(() => {
  if (!viagemSelecionada.value || !viagemSelecionada.value.valores) return '0,00';
  const precoBase = viagemSelecionada.value.valores.Comum || 0;

  let precoComDesconto = precoBase;

  if (tipo.value === 'Estudante') {
    precoComDesconto *= 0.5;
  } else if (tipo.value === 'Idoso') {
    precoComDesconto = 0;
  }

  const total = precoComDesconto * quantidade.value;
  return total.toFixed(2).replace('.', ',');
})

watch(cpf, async (novoCpf) => {
  erroCpf.value = null
  nome.value = ''

  const cpfLimpo = novoCpf.replace(/\D/g, '')
  if (cpfLimpo.length === 11) {
    try {
      const response = await axios.get(`http://localhost:3001/api/usuarios?cpf=${cpfLimpo}`)
      if (response.data.length > 0) {
        nome.value = response.data[0].nome
      } else {
        erroCpf.value = 'CPF não encontrado.'
      }
    } catch (err) {
      erroCpf.value = 'Erro ao buscar CPF.'
      console.error(err)
    }
  }
})

const confirmarRecarga = () => {
  if (!quantidade.value || quantidade.value < 1) {
    alert('Quantidade inválida. Digite um número maior que zero.');
    return;
  }
  if (!viagemSelecionada.value) {
    alert('Selecione uma viagem.');
    return;
  }
  if (!nome.value) {
    alert('Informe um CPF válido e existente.');
    return;
  }

  alert(`Recarga confirmada para ${nome.value}, tipo: ${tipo.value}, viagem: ${viagemSelecionada.value.titulo}, total: R$ ${valorTotal.value}`);
}
</script>

<template>
  <div class="container mt-5">
    <h4 class="text-center mb-4">Recarga de Voucher</h4>

    <form @submit.prevent="confirmarRecarga">
      <div class="mb-3 position-relative">
        <label class="form-label">Insira o CPF do passageiro</label>
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-person-fill"></i></span>
          <input
            type="text"
            class="form-control"
            placeholder="XXXXXXXXXXX"
            v-model="cpf"
          />
          <span class="input-group-text text-danger" v-if="erroCpf"><i class="bi bi-x-lg"></i></span>
        </div>
        <div v-if="erroCpf" class="text-danger mt-1">{{ erroCpf }}</div>
      </div>

      <div class="mb-3">
        <label class="form-label">Nome Completo</label>
        <input type="text" class="form-control" v-model="nome" readonly />
      </div>

      <div class="mb-3">
        <label class="form-label">Tipo de passagem</label>
        <select class="form-select" v-model="tipo">
          <option>Comum</option>
          <option>Estudante</option>
          <option>Idoso</option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">Viagem</label>
        <select class="form-select" v-model="viagemIdSelecionada">
          <option disabled value="">Selecione uma viagem</option>
          <option v-for="viagem in viagens" :key="viagem.id" :value="viagem.id">
            {{ viagem.titulo }}
          </option>
        </select>
      </div>

      <div class="mb-4">
        <label class="form-label">Quantidade</label>
        <input
          type="number"
          min="1"
          step="1"
          class="form-control"
          v-model.number="quantidade"
          placeholder="Digite a quantidade"
        />
      </div>

      <div class="mb-4" v-if="viagemSelecionada">
        <p class="fw-bold">Total: R$ {{ valorTotal }}</p>
      </div>

      <div class="d-flex justify-content-between">
        <button type="button" class="btn btn-outline-danger d-flex align-items-center gap-1">
          <i class="bi bi-x-circle"></i> Cancelar
        </button>
        <button type="submit" class="btn btn-success d-flex align-items-center gap-1">
          <i class="bi bi-check-lg"></i> Confirmar
        </button>
      </div>
    </form>

    <div v-if="carregandoViagens" class="mt-3 alert alert-info">Carregando viagens...</div>
    <div v-if="erroViagens" class="mt-3 alert alert-danger">{{ erroViagens }}</div>
  </div>
</template>

<style scoped>
.phone-frame {
  max-width: 400px;
  border: 2px solid #ccc;
  border-radius: 30px;
  margin: auto;
  background-color: white;
  box-shadow: 0 0 10px #ccc;
}
</style>
