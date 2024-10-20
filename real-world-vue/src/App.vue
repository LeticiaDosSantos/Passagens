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
      <!-- <nav class="nav">
        <ul>
          <li><a href="atalhos.php">Home</a></li>                
          <li><a href="perfil.php">Meu Perfil</a></li>
        </ul>
      </nav>
      <div class="menu-toggle">
        <div class="one"></div>
        <div class="two"></div>
        <div class="three"></div>
      </div>-->
      <div class="wrapper">
        <nav class="nav">
          <RouterLink :to="{ name: 'about' }">Home</RouterLink>
          <RouterLink :to="{ name: 'perfil' }">Meu Perfil</RouterLink>
          <RouterLink :to="{ name: 'login' }">Login</RouterLink>
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
</template>

<style>
 
</style>
