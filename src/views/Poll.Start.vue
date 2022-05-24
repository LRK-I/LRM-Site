<template>
    <transition name="fade" mode="out-in">
        <div v-if="loaded" class="fakeload">
            <div class="home container pollGrid">
                <div class="pollRight">
                    <h2>Опрос: {{ name }}</h2>
                    <br><br>
                    <transition name="fade" mode="out-in">
                        <ButtonComponent @click="start" :key="message" :text="!message ? 'Загрузка...' : message" :bstyle="style"/>
                    </transition>
                </div>
                <div class="pollLeft">
                    <div class="elemGrid">
                        <h3>Кол-во вопросов: {{ questionsNum }}</h3>
                        <h3>Анонимный: {{ isAnonymous ? 'Да' : 'Нет' }} </h3>
                        <h3>Кол-во прошедших: {{ alreadyPast }}</h3>
                        <h3>Автор: {{ authors }}</h3>
                    </div>
                    <img src="https://cdn.discordapp.com/attachments/917528169374961725/977632208384827402/msedge_fGg5mmHERW.jpg">
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import InputComponent from '@/components/InputComponent.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';

export default {
  name: 'PollStart',
  components: { InputComponent, ButtonComponent, ButtonComponent },
  data() {
    return {
        uid: this.$store.getters.user?.id,
        name: '',
        questionsNum: 0,
        isAnonymous: false,
        alreadyPast: 0,
        authors: '',
        style: 'default',
        message: '',
        loaded: false
    }
  },
  methods: {
    async validate() {
        const data = await (await fetch(`https://senko.ga/api/poll/validate/${this.uid}`)).json();
        if (!data.valid) {
            this.style = 'danger';
            this.message = data.message;
            return false;
        }
        this.style = 'success';
        this.message = 'Участвовать';
        return true;
    },
    async start() {
        if (!await this.validate()) return;
        const data = await (await fetch(`https://senko.ga/api/poll/${this.$route.params.id}/start`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('userToken') } })).json();
        if (data.granted) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('expireAt', data.expireTimestamp);
            localStorage.setItem('currentPoll', this.$route.params.id);

            this.$router.push(`/poll/${this.$route.params.id}/question/0`);
        }
    }
  },
  async mounted() {
    if (!this.$store.getters.user) return window.location.href = `https://senko-info.ga/authorize`;
    const request = await fetch(`https://senko.ga/api/poll/${this.$route.params.id}`);
    if (data.status === 404) {
        this.$router.push('/404');
        return;
    }
    const data = await request.json();
    this.name = data.name;
    this.questionsNum = data.questions;
    this.isAnonymous = data.anon;
    this.alreadyPast = data.alreadyPast;
    this.authors = data.authors;
    this.loaded = true;
    await this.validate();
  }
}
</script>

<style lang="scss" scoped>
.pollGrid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 50px;
    grid-row-gap: 0px;
}
.pollRigth {
}
.pollLeft {
    background: #0C0C0C;
    border: 2px solid #131313;
    border-radius: 10px;
    padding: 10px;

    .elemGrid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        grid-column-gap: 30px;
        grid-row-gap: 10px;
    }

    img {
        width: 100%;
        height: 200px;
        margin-top: 10px;
        border-radius: 10px;
        object-fit: cover;
    }
}

@media only screen and (max-width: 600px) {
    .pollGrid {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        grid-template-rows: 1fr;
        grid-column-gap: 0;
        grid-row-gap: 20px;
    }
}

@media only screen and (min-width: 600px) {

}

</style>
