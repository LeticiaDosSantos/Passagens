<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

// CSS
import './assets/lib/Bootstrap/bootstrap-5.3.3-dist/css/bootstrap.min.css'
import './assets/css/style.css'

// Estado de login
const logado = ref(localStorage.getItem('usuarioLogado') === 'true')
const router = useRouter()

// Escuta mudanças externas (ex: outra aba)
onMounted(() => {
  window.addEventListener('storage', () => {
    logado.value = localStorage.getItem('usuarioLogado') === 'true'
  })
})

// Logout
const fazerLogout = () => {
  localStorage.removeItem('usuarioLogado')
  logado.value = false
  router.push({ name: 'login' })
}
</script>

<template>
  <div id="layout">
    <header>
      <div>
        <RouterLink :to="{ name: 'home' }">
          <img class="logo" src="./assets/img/logo-bus.png" alt="Logo" />
        </RouterLink>
      </div>

      <div class="wrapper">
        <nav class="nav">

          <template v-if="logado">
            <RouterLink :to="{ name: 'menu-atendente' }">Home</RouterLink>
            <RouterLink :to="{ name: 'perfil' }">Meu Perfil</RouterLink>
            <a href="#" @click.prevent="fazerLogout">Logout</a>
          </template>

          <template v-else>
            <RouterLink :to="{ name: 'home' }">Home</RouterLink>
            <RouterLink :to="{ name: 'login' }">Login</RouterLink>
          </template>
        </nav>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<style scoped>
.logo {
  width: 15%;
  margin-right: 80%;
}

.nav a {
  padding: 5px 5px;
  text-decoration: none;
}
</style>
