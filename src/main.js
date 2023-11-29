import { createApp } from "vue";
import "./style.css";
import { createPinia } from "pinia";
import { Chart, registerables } from "chart.js";
import App from "./App.vue";

Chart.register(...registerables);
const pinia = createPinia();

createApp(App).use(pinia).mount("#app");
