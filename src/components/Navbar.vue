<template>
    <div class="container navbar">
        <h1 style="width: 110px">LRM-I</h1>
        <div class="links">
            <!-- <router-link to="/users"><font-awesome-icon icon="users" />Участники</router-link> -->
            <a href="https://github.com/LRK-I"><font-awesome-icon :icon="['fab', 'github-alt']" />GitHub</a>
            <div id="huita" class="user" :onclick="dropdownToggle" v-if="user?.username">
                <img :src="avatar">
                <h5>{{ user.username }}#{{ user.discriminator }}</h5>

                <transition name="fadeUp">
                    <div v-if="DropdownMenuIsActive === true" class="userDropdown" :style=" `width: ${DropdownWidth}px; left: ${DropdownOffset}px;` ">
                        <div style="cursor: pointer;" class="hoverDropdown" v-on:click="$store.dispatch('logout')">
                            <div class="userDropdown__button">
                            Выйти
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
        <div class="idkhowtoname">
            <a @click="toggle" class="navbars"><font-awesome-icon icon="bars" size="xl" /></a>
        </div>
        <transition name="fadeRight" mode="out-in">
            <div v-if="opened" class="sidebar">
                <h1 style="width: 110px">LRM-I</h1>
                <hr>
                <!-- <router-link to="/users"><font-awesome-icon icon="users" />Участники</router-link> -->
                <a href="https://github.com/LRK-I"><font-awesome-icon :icon="['fab', 'github-alt']" />GitHub</a>
                <div v-if="user?.username">
                    <hr>
                    <div class="user">
                        <img :src="avatar">
                        <h5>{{ user.username }}#{{ user.discriminator }}</h5>
                    </div>
                    <a style="cursor: pointer;" class="hoverDropdown" v-on:click="$store.dispatch('logout')">
                        Выйти
                    </a>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: this.$store.getters.user,
            avatar: this.$store.getters.avatar,
            opened: false,
            DropdownMenuIsActive: false,
            DropdownWidth: 0,
            DropdownOffset: 0,
        }
    },
    methods: {
        toggle() {
            this.opened = !this.opened;
        },
        dropdownToggle() {
            this.DropdownMenuIsActive = !this.DropdownMenuIsActive;
            this.DropdownWidth = document.getElementById('huita').clientWidth;
            this.DropdownOffset = document.getElementById('huita').offsetLeft;
        }
    }
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
    width: 100%;
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
        display: none;
        margin-left: 20px;
    }
    .idkhowtoname {
        display: flex;
        align-items: center;
        margin-left: auto;
    }
}

@media only screen and (min-width: 600px) {
    .idkhowtoname {
        display: none;
    }
}

.user {
    background: #0C0C0C;
    height: 40px;
    min-width: 200px;
    border: 2px solid #131313;
    border-radius: 10px;
    display: flex;
    align-items: center;
    margin-left: auto;
    color: #EAECFD;
    font-size: 25px;
    font-family: 'Futura PT Book', sans-serif;
    transition: .1s ease-in-out;
    padding: 0 10px;
    cursor: pointer;
    img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
    }
}

.fadeRight-enter-active, .fadeRight-leave-active {
    transition: all .2s ease-in-out;
}
.fadeRight-enter-from, .fadeRight-leave-active {
    opacity: 0;
    transform: translateX(-10px);
}

.fadeUp-enter-active, .fadeUp-leave-active {
    transition: all .2s ease-in-out;
}
.fadeUp-enter-from, .fadeUp-leave-active {
    opacity: 0;
    transform: translateY(-10px);
}

.sidebar {
    padding: 10px 20px;
    position: fixed;
    top: 0;
    left: 0;
    width: 70%;
    height: 100%;
    background: #0c0c0c9f;
    backdrop-filter: blur(5px);

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

    .user {
        background: none;
        border: none;
        padding: 0;
    }

}

.userDropdown {
    display: inline-block;
    background: #0c0c0c9f;
    position: absolute;
    margin-top: 5em;
    border-radius: 10px;
    padding: 5px 0;
    border: solid #131313;
    backdrop-filter: blur(10px);
    transition: all 0.2s ease;
    height: 40px;
    display: flex;
    align-items: center;
    &__button {
        color: var(--button-hover-color);
        width: 100%;
        padding: 0 10px;
    }
}
.hoverDropdown {
    :hover {
        background: #0c0c0c9f;
        cursor: pointer;
    }
}
</style>