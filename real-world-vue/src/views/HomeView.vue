
<script>
export default {
  methods: {
    goToLogin() {
      this.$router.push({ name: 'login' });
    }
  }
}
</script>

<template>
    <div class="fundo-imagem">
        <RouterLink :to="{ name: 'login' }">
        <button class="comecar">Começar!</button>
        </RouterLink>
    </div>
</template>

<style scoped>
.fundo-imagem {
    background-image: url('../assets/img/fundo-azul2.jpg'); /* Define a imagem de fundo */
    background-size: cover; /* Redimensiona a imagem para cobrir o div */
    background-position: center; /* Centraliza a imagem */
    background-repeat: no-repeat; /* Evita que a imagem se repita */
    width: 100%; /* Define a largura do div para ocupar 100% do espaço */
    height: 125vh; /* Define a altura para ocupar a tela toda */
}

.comecar{
    float: right;
    margin-right: 10%;
    margin-top: 3%;
    font-family: Arial, sans-serif; /* Escolha a fonte desejada */
    font-size: 45px;
    color: white;
    font-weight: 10; /* Define uma fonte mais fina */
    text-shadow: 
        0 0 5px #fff,
        0 0 10px #fff,
        0 0 15px #fff,
        0 0 20px #0d6efd,
        0 0 30px #0d6efd,
        0 0 40px #0d6efd,
        0 0 50px #0d6efd,
        0 0 60px #0d6efd;
    background-color: transparent; /* Fundo transparente */
    border: none; /* Remove a borda do botão */
    padding: 10px 20px; /* Ajuste o espaçamento interno para uma aparência melhor */
    cursor: pointer; /* Define o cursor como pointer ao passar sobre o botão */
}

.comecar:hover {
    /* Estilos ao passar o mouse */
    color: white; /* Muda a cor do texto */
    text-shadow: 
        0 0 5px #fff,
        0 0 10px #fff,
        0 0 15px #fff,
        0 0 20px #fff,
        0 0 30px #0d6efd,
        0 0 40px #0d6efd,
        0 0 50px #0d6efd,
        0 0 60px #0d6efd; /* Pode adicionar ou alterar a sombra */
    transform: scale(1.05); /* Aumenta ligeiramente o tamanho do botão */
}
</style>
