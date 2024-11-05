<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router';
// Importando os arquivos CSS
import './assets/lib/Bootstrap/bootstrap-5.3.3-dist/css/bootstrap.min.css';
import './assets/css/style.css';

const route = useRoute();
</script>

<template>
  <div id="layout">
    <header>
      <div>
        <RouterLink :to="{ name: 'home' }">
          <img class="logo" src="./assets/img/logo-bus.png" alt="Logo">
        </RouterLink>
      </div>

      <div class="wrapper">
        <nav class="nav">
          <RouterLink :to="{ name: 'menu-atendente' }">Menus</RouterLink>

          <!-- Exibe "Meu Perfil" apenas se não estiver na página de login -->
          <RouterLink v-if="route.name !== 'login'" :to="{ name: 'perfil' }">Meu Perfil</RouterLink>
          
          <!-- Exibe "Logout" em todas as páginas, exceto na página de login -->
          <RouterLink v-if="route.name !== 'login'" :to="{ name: 'login' }">Logout</RouterLink>
          
          <!-- Exibe "Login" apenas na página de login -->
          <RouterLink v-if="route.name === 'login'" :to="{ name: 'login' }">Login</RouterLink>
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
</template>

<style>
.logo {
  width: 15%;
  margin-right: 80%;
}

.nav a {
  padding: 5px 5px;
}
</style>
