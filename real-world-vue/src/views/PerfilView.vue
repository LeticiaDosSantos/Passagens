<template>
  <div v-if="user" class="qr-container">
    <h2 class="title-page">{{ user.name }}</h2>
    <div class='icone-perfil'><i class="bi bi-person-circle"></i></div>
    <p><strong>CPF:</strong> {{ user.zipcode }}</p>
    <p><strong>Data de Nascimento:</strong> {{ user.birthDate }}</p>
    <p><strong>Email:</strong> {{ user.email }}</p>

    <div class="image-container">
      <img src="../assets/img/meiaBorda.png" class="bordaQRCode">
      <canvas id="qrcode"></canvas> <!-- Elemento para o QR Code -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import QRCode from 'qrcode'; // Certifique-se de instalar esta biblioteca

const user = ref(null);

// Exemplo de dados do usuário (substitua pela sua lógica)
user.value = {
  name: 'Usuário Teste',
  zipcode: '00000-000',
  birthDate: '01/01/2000',
  email: 'usuario@teste.com',
};

// Função para gerar QR Code
const generateQRCode = (text) => {
  const canvas = document.getElementById('qrcode');
  QRCode.toCanvas(canvas, text, { errorCorrectionLevel: 'H' }, function (error) {
    if (error) console.error(error);
    console.log('QR Code gerado!');
  });
};

onMounted(() => {
  generateQRCode(`Nome: ${user.value.name}, CPF: ${user.value.zipcode}, Email: ${user.value.email}`);
});
</script>

<style scoped>
.image-container {
  position: relative;
  display: inline-block;
}

.bordaQRCode{
  width: 50%;
}

#qrcode {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
