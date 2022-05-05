<template>
  <div class="component">
      <img :src="icon">
      <h3>{{ name }}</h3>
  </div>
</template>

<script>
export default {
    name: 'FounderComponent',
    props: ['icon', 'name'],
}
</script>

<style lang="scss" scoped>
.component {
    background: #0C0C0C;
    height: 30px;
    width: 200px;
    border: 2px solid #131313;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    align-items: center;

    img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
    }
}

@media only screen and (max-width: 600px) {
    .component {
        width: 340px;
        margin-bottom: 10px;
    }
}
</style>