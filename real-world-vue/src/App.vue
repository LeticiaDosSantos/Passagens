<script setup>
  import { RouterLink, RouterView } from 'vue-router';
  // Importando os arquivos CSS
  import './assets/lib/Bootstrap/bootstrap-5.3.3-dist/css/bootstrap.min.css';
  import './assets/css/style.css';
</script>

<template>
  <div id="layout">
    <header>
      <div class="logo">Logo</div>

      <div class="wrapper">
        <nav class="nav">
          <RouterLink :to="{ name: 'menu-atendente' }">Home</RouterLink>
          <RouterLink :to="{ name: 'perfil' }">Meu Perfil</RouterLink>
          <RouterLink :to="{ name: 'login' }">Login</RouterLink>
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
</template>

<style>
.nav a {
  padding: 5px 5px;
}
</style>
