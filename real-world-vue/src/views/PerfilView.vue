<template>
  <div v-if="user" class="qr-container">
    <h2 class="title-page">{{ user.nome }}</h2>
    <div class='icone-perfil'><i class="bi bi-person-circle"></i></div>
    <p><strong>CPF:</strong> {{ user.cpf }}</p>
    <p><strong>Data de Nascimento:</strong> {{ user.data_nascimento }}</p>
    <p><strong>Email:</strong> {{ user.email }}</p>

    <div class="image-container">
      <img src="../assets/img/meiaBorda.png" class="bordaQRCode">
      <canvas id="qrcode"></canvas> <!-- Elemento para o QR Code -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import PerfilService from '@/services/PerfilService.js';
import QRCode from 'qrcode'; // Certifique-se de instalar esta biblioteca

const user = ref(null);

// Função para buscar dados do usuário da API
const fetchUser = (id) => {
  PerfilService.getUsuario(id)
    .then((response) => {
      user.value = response.data;
      nextTick(() => {
        let cpf = user.value.cpf.replace(/\D/g, ''); // Remove caracteres não numéricos
        console.log(cpf);
        generateQRCode(cpf);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

// Função para gerar QR Code
const generateQRCode = (text) => {
  const canvas = document.getElementById('qrcode');
  if (canvas) {
    QRCode.toCanvas(canvas, text, { errorCorrectionLevel: 'H' }, function (error) {
      if (error) console.error(error);
      console.log('QR Code gerado com sucesso!');
    });
  } else {
    console.error("Elemento <canvas> não encontrado.");
  }
};

onMounted(() => {
  fetchUser(1); // Busca os dados do usuário com ID 4 e gera o QR Code após o DOM estar atualizado
});
</script>

<style scoped>
  .image-container {
    position: relative;
    display: inline-block;
  }

  .bordaQRCode {
    width: 40%;
  }

  #qrcode {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
