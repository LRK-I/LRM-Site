<template>
  <div class="home container">
    <h1>Опрос пройден</h1>
    <h3>Через 5 секунд вы будете перемещены на главную страницу</h3>
  </div>
</template>

<script>
export default {
  name: 'PollEnd',
  async mounted() {
    await fetch(`https://senko.ga/api/poll/${localStorage.getItem('currentPoll')}/end`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('token'),
        userToken: localStorage.getItem('userToken'),
      }),
    });

    localStorage.removeItem('currentPoll');
    localStorage.removeItem('expireAt');
    localStorage.removeItem('token');
    setTimeout(() => {
      this.$router.push('/');
    }, 5000);
  }
}
</script>

<style lang="scss" scoped>
    .home {
        text-align: center;
    }
</style>
