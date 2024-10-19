<script setup>
import { ref, onMounted } from 'vue'
import EventCard from '@/components/EventCard.vue'
import axios from 'axios'
import EventService from '@/services/EventService.js'

const events = ref(null)

onMounted(() => {
  EventService.getEvents()
    .then((response) => {
      events.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>

<template>
  <h2 class="title-page">Vouchers e Saldos</h2>
  <div class="events">
    <EventCard class="card-voucher" v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<style scoped>
  .card-voucher{
    border-radius: 1rem;
  }

  .events {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>