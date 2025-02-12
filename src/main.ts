import { createApp } from "vue";
import "./global-style.css";
import App from "./App.vue";
import { useREM } from "./utils/flexible";

// 初始化 rem
useREM();

createApp(App).mount("#app");
