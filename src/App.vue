<template>
  <div>
    <Navbar/>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <div :key="this.$route.path">
          <component :is="Component"/>
        </div>
      </transition>
    </router-view>
  </div>
</template>

<script>
import './styles/global.scss';
import Navbar from "./components/Navbar";

export default {
  name: "App",
  components: { Navbar },
}
</script>
<style lang="scss">
p {
  margin-top: 0;
  margin-bottom: 0 !important;
}
/* Transition style */
.fade-enter-active, .fade-leave-active {
  transition: all .2s ease-in-out;
}
.fade-enter-from, .fade-leave-active {
  opacity: 0;
}
</style>
