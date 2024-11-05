import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue';
import './assets/lib/Bootstrap/bootstrap-5.3.3-dist/css/bootstrap.min.css'; // CSS do Bootstrap
import './assets/lib/Bootstrap/bootstrap-5.3.3-dist/js/bootstrap'; // JS do Bootstrap
import router from './router'
// import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
