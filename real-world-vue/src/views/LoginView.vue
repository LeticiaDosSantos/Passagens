<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

const cpf = ref('')
const senha = ref('')

const fazerLogin = (e) => {
  e.preventDefault()

  if (cpf.value && senha.value) {
    // Simula login bem-sucedido
    localStorage.setItem('usuarioLogado', 'true')
    window.dispatchEvent(new Event('storage')) // atualiza o layout
    router.push({ name: 'perfil' }) // redireciona
  } else {
    alert('Preencha todos os campos corretamente.')
  }
}
</script>

<template>
  <div class="container login-centralizado">
    <h2 class="title-page">Login</h2>
    <form @submit="fazerLogin">
      <div class="mb-3">
        <label for="cpf" class="form-label">CPF:</label>
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-person-circle"></i></span>
          <input
            type="text"
            class="form-control"
            id="cpf"
            v-model="cpf"
            placeholder="000.000.000-00"
            required
          />
        </div>
      </div>

      <div class="mb-3">
        <label for="senha" class="form-label">Senha:</label>
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-file-lock2"></i></span>
          <input
            type="password"
            class="form-control"
            id="senha"
            v-model="senha"
            placeholder="••••••••"
            required
          />
        </div>
        <a href="#" class="recuperar-senha">Recuperar senha</a>
      </div>

      <button type="submit" class="azul-escuro">Entrar</button>
    </form>
  </div>
</template>

<style scoped>
.azul-escuro {
  background-color: #0030b9;
  border: none;
  color: white;
  padding: 0.5rem 1.5rem;
  width: 100%;
  border-radius: 2rem;
  transition: background-color 0.3s ease;
  cursor: pointer;
  font-weight: bold;
}

.azul-escuro:hover {
  background-color: #001a80;
}

.login-centralizado {
  max-width: 500px;
  margin: 50px auto;
}

.recuperar-senha {
  font-size: 0.875rem;
  display: block;
  margin-top: 4px;
  color: #0030b9;
  text-decoration: underline;
}
</style>
