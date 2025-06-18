<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

const cpf = ref('')
const nome = ref('')
const erro = ref(null)
const scanning = ref(false)

let video = null
let canvas = null
let context = null
let stream = null
let interval = null

const buscarPorCpf = async () => {
  const cpfLimpo = cpf.value.replace(/\D/g, '')
  if (cpfLimpo.length === 11) {
    try {
      const response = await fetch(`http://localhost:3001/api/usuarios?cpf=${cpfLimpo}`)
      const data = await response.json()
      if (data.length > 0) {
        nome.value = data[0].nome
        erro.value = null
      } else {
        erro.value = 'CPF não encontrado.'
      }
    } catch {
      erro.value = 'Erro ao buscar CPF.'
    }
  }
}

const iniciarScanner = async () => {
  erro.value = null
  nome.value = ''
  scanning.value = true

  await nextTick()

  video = document.getElementById('video-preview')
  canvas = document.getElementById('canvas')
  context = canvas.getContext('2d')

  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    video.srcObject = stream

    await new Promise(resolve => {
      video.onloadedmetadata = () => {
        video.play()
        resolve()
      }
    })

    interval = setInterval(scanFrame, 500)
  } catch (e) {
    scanning.value = false
    erro.value = 'Não foi possível acessar a câmera.'
    console.warn('Câmera não acessível:', e)
  }
}

const pararScanner = () => {
  scanning.value = false
  clearInterval(interval)
  if (stream) {
    stream.getTracks().forEach(track => track.stop())
  }
}

const scanFrame = () => {
  if (!video || video.readyState !== video.HAVE_ENOUGH_DATA) return

  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  context.drawImage(video, 0, 0, canvas.width, canvas.height)

  if (window.jsQR) {
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
    const code = window.jsQR(imageData.data, imageData.width, imageData.height)
    if (code) {
      pararScanner()
      cpf.value = code.data
      buscarPorCpf()
    }
  }
}

onMounted(() => {
  if (!window.jsQR) {
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/jsqr'
    script.onload = () => console.log('jsQR carregado')
    script.onerror = () => console.warn('jsQR não carregado (simulação ativa)')
    document.head.appendChild(script)
  }
})

onBeforeUnmount(() => {
  pararScanner()
})
</script>

<template>
  <div class="container mt-5">
    <h5 class="text-center mb-3">Escaneie o QR Code ou digite o CPF</h5>

    <div class="input-group mb-2">
      <span class="input-group-text"><i class="bi bi-person-fill"></i></span>
      <input
        type="text"
        class="form-control"
        placeholder="XXX.XXX.XXX-XX"
        v-model="cpf"
        @blur="buscarPorCpf"
      />
    </div>

    <div v-if="nome" class="alert alert-success">Passageiro: {{ nome }}</div>
    <div v-if="erro" class="text-danger">{{ erro }}</div>

    <div class="text-center mb-3">
      <button class="btn btn-outline-primary" @click="iniciarScanner" v-if="!scanning">
        <i class="bi bi-camera"></i> Escanear QR Code
      </button>
      <button class="btn btn-outline-danger" @click="pararScanner" v-else>
        <i class="bi bi-x-circle"></i> Parar
      </button>
    </div>

    <div v-if="scanning" class="camera-wrapper text-center mb-3">
      <div class="video-container">
        <video id="video-preview" autoplay muted playsinline></video>
        <div class="scan-box"></div>
      </div>
    </div>
    <canvas id="canvas" style="display: none;"></canvas>
  </div>
</template>

<style scoped>
.camera-wrapper {
  display: flex;
  justify-content: center;
}

.video-container {
  position: relative;
  width: 35%;
  height: 35%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
}

#video-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: black;
}

.scan-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50%;
  height: 50%;
  transform: translate(-50%, -50%);
  border: 2px dashed red;
  border-radius: 12px;
}
</style>
