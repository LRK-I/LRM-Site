<template>
  <div class="home container" style="text-align:center;">
    <h2>{{ ['Змей тагилыч украл страницу, но оставил вам 404', 'ерар ашыбка 404', 'Process finished with exit code 404 (interrupted by signal 11: SIGNOTFOUND)'][ (Math.random()*3)|0 ] }}</h2>
    <img style="height: 400px; margin-top: 30px;" src="https://cdn.discordapp.com/attachments/917528169374961725/977306570209783818/msedge_kPQamO0ria.png">
  </div>
</template>

<script>
export default {
    name: 'NotFound'
}
</script>

<style>

</style>