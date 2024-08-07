import router from "@/router";
import store from "@/store";
import "material-icons/iconfont/material-icons.css";
import { createApp } from "vue";
import App from "./App.vue";
import "./assets/index.css";

const app = createApp(App);

app.use(store);
app.use(router);

app.mount("#app");
