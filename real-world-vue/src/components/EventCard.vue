<script setup>
  defineProps({
    event: {
      type: Object,
      required: true,
    },
  })
</script>

<template>
  <RouterLink
    class="event-link"
    :to="{ name: 'event-details', params: { id: event.id } }"
  >
    <div class="event-card">
      <h2>{{ event.title }}</h2>
      <span>@{{ event.time }} on {{ event.date }}</span>
    </div>
  </RouterLink>
</template>

<style scoped>
  .event-card {
    padding: 20px;
    width: 100%;
    height: 100%;
    border-radius: 0.2rem;
    cursor: pointer;
    border: 1px solid #9ea9e3;
    margin-bottom: 18px;
  }
  
  .event-card:hover {
    transform: scale(1.01);
    box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
  }
</style>