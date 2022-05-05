import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUsers, faLocationDot, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faGithubAlt } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add({ faUsers, faLocationDot, faUserGroup });
library.add(faGithubAlt);

createApp(App).use(store).use(router).component("font-awesome-icon", FontAwesomeIcon).mount('#app')
