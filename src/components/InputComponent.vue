<template>
  <div class="component">
    <input v-model="inputed" :placeholder="text" v-on:input="whoeta">
  </div>
</template>

<script>
export default {
    name: 'InputComponent',
    props: ['text'],
    data() {
        return {
            inputed: '',
        }
    },
    methods: {
        whoeta() {
            this.$emit('newText', this.inputed);
        }
    }
}
</script>

<style lang="scss" scoped>
.component {
    background: #0C0C0C;
    height: 30px;
    width: 330px;
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
    input {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        background: none;
        font-size: 24px
    }
}

@media only screen and (max-width: 600px) {
    .component {
        width: 340px;
        margin-bottom: 10px;
    }
}
</style>