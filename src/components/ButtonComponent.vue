<template>
  <div>
    <div :class="`component ${bstyle}`" v-if="bstyle === 'success'"><font-awesome-icon icon="check" size="lg"/><h3>{{ text }}</h3></div>
    <div :class="`component ${bstyle}`" v-if="bstyle === 'danger'"><font-awesome-icon icon="xmark" size="lg"/><h3>{{ text }}</h3></div>
    <div :class="`component ${bstyle}`" v-if="bstyle === 'default'"><h3>{{ text }}</h3></div>
  </div>
</template>

<script>
export default {
    name: 'ButtonComponent',
    props: ['text', 'bstyle']
}
</script>

<style lang="scss" scoped>
.component {
    background: #0C0C0C;
    min-height: 30px;
    width: 330px;
    border: 2px solid #131313;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    align-items: center;
    transition: all 2s ease-in-out;

    h3 {
        margin-left: 10px;
    }
}

.success {
    border: 2px solid #33C481;
    cursor: pointer;
}
.danger {
    border: 2px solid #FF5C5C;
}
.default {
    border: 2px solid #131313;
}

@media only screen and (max-width: 600px) {
    .component {
        width: 340px;
        margin-bottom: 10px;
    }
}
</style>