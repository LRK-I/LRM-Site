<template>
  <div>
    <div class="home container" style="text-align: center;">
      <h1>Авторизация успешна</h1>
      <h3>Через 10 секунд вы будете перемещены на главную страницу</h3>
    </div>
  </div>
</template>

<script>
export default {
    name: 'AuthEnd',
    async mounted() {
        this.$store.dispatch('auth', this.$route.params.token);
        const polltoken = await fetch('https://senko.ga/api/auth/polltoken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bearerToken: this.$route.params.token,
            }),
        });
        const polldata = await polltoken.json();
        localStorage.setItem('userToken', polldata.token);
        setTimeout(() => {
            this.$router.push('/').then(() => {
                window.location.reload();
            });
        }, 10000);
    }
}
</script>

<style>

</style>