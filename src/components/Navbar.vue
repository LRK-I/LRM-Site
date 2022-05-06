<template>
    <div class="container navbar">
        <h1>LRM-I</h1>
        <div class="links">
            <!-- <router-link to="/users"><font-awesome-icon icon="users" />Участники</router-link> -->
            <a href="https://github.com/LRK-I"><font-awesome-icon :icon="['fab', 'github-alt']" />GitHub</a>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.navbar {
    padding: 10px 0;
    display: flex;
    color: #EAECFD;
    margin-bottom: 50px;
}
.links {
    margin-left: 50px;
    display: flex;
    align-items: center;

    a {
        color: #EAECFD;
        margin-right: 20px;
        text-decoration: none;
        font-size: 25px;
        font-family: 'Futura PT Book', sans-serif;
        svg {
            margin-right: 5px;
            width: 25px;
        }
        transition: .1s ease-in-out;
    }

    a:hover {
        color: #FFFFFF;
        margin-top: -5px;
    }
}

@media only screen and (max-width: 600px) {
    .navbar {
        padding: 10px 20px;
        display: flex;
        color: #EAECFD;
        margin-bottom: 50px;
    }
    .links {
        margin-left: 20px;
    }
}
</style>