<template>
  <div class="home container">
    <h1>Опрос пройден</h1>
    <h3>Через 10 секунд вы будете перемещены на главную страницу</h3>
  </div>
</template>

<script>
export default {
  name: 'PollEnd',
  async mounted() {
    localStorage.clear();
    setTimeout(() => {
      this.$router.push('/');
    }, 10000);
  }
}
</script>

<style lang="scss" scoped>
    .home {
        text-align: center;
    }
</style>
