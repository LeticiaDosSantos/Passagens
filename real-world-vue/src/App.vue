<script setup>
import { RouterLink, RouterView } from 'vue-router';
// Importando os arquivos CSS
import './assets/lib/Bootstrap/bootstrap-5.3.3-dist/css/bootstrap.min.css';
import './assets/css/style.css';
// import HelloWorld from './components/HelloWorld.vue'

</script>

<template>
  <div id="layout">
    <header>
      <div class="logo">Logo</div>
      <nav class="nav">
        <ul>
          <li><a href="atalhos.php">Home</a></li>                
          <li><a href="perfil.php">Meu Perfil</a></li>
          <li><a href='login.php'>Entrar</a></li>
        </ul>
      </nav>
      <div class="menu-toggle">
        <div class="one"></div>
        <div class="two"></div>
        <div class="three"></div>
      </div>
      <div class="wrapper">
        <nav>
          <RouterLink :to="{ name: 'event-list' }">Events</RouterLink> |
          <RouterLink :to="{ name: 'about' }">About</RouterLink>
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
</template>

<style>
  #layout {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  nav {
    padding: 30px;
  }
  nav a {
    font-weight: bold;
    color: #2c3e50;
  }
  nav a.router-link-exact-active {
    color: #42b983;
  }
  h2 {
    font-size: 26px;
  }
</style>
