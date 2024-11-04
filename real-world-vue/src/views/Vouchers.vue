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
  <div class="vouchers">
    <h2 class="title-page">Vouchers e Saldos</h2>
    <div class="events">
      <EventCard class="card-voucher" v-for="event in events" :key="event.id" :event="event" />
    </div>
  </div>
</template>

<style scoped>
  .vouchers{
    width:  80%;
    margin-left: 10%;
    margin-right: 10%;
  }

  .events { 
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>