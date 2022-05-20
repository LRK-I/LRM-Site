<template>
    <transition name="fade" mode="out-in">
        <div v-if="loaded" class="fakeloader">
            <div class="home container pollGrid">
                <div class="pollLeft">
                    <transition name="fade" mode="out-in">
                        <div v-if="error.length > 1" style="margin-bottom: 10px; border-color: #FF5C5C" class="AndefLoveKotori">
                            <h2>{{ error }}</h2>
                        </div>
                    </transition>
                    <div class="AndefLoveKotori">
                        <h2>Опрос: {{ name }}</h2>
                        <h4>{{ description }}</h4>
                        <br><br><br>
                        <h4>Вопрос {{ +($route.params.question) + 1 }}/{{ allQuestions }}</h4>
                        <h4>Осталось времени: {{ expiredAt }} мин</h4>
                    </div>
                    <br>
                    <div v-if="image" class="AndefLoveKotori">
                        <img src="https://cdn.discordapp.com/attachments/917528169374961725/977190658156658718/1520001416_00028.jpg">
                    </div>
                </div>
                <div class="pollRight">
                    <ButtonComponent v-for="(answer, id) in answers" :key="answer" style="margin-bottom: 10px; cursor: pointer;" :text="answer" @click="answerClick($event, id)" bstyle="default"/>
                </div>
            </div>
        </div>
        <div v-else-if="error.length > 1" class="home container" style="text-align:center">
            <h2>{{ error }}</h2>
            <img style="margin-top: 20px" src="https://cdn.discordapp.com/attachments/917528169374961725/977285890550415410/zzzz.png">
        </div>
    </transition>
</template>

<script>
import ButtonComponent from '@/components/ButtonComponent.vue';

export default {
  name: 'PollQuestions',
  components: { ButtonComponent },
  data: () => ({
    name: '',
    description: '',
    image: null,
    answers: [],
    allQuestions: 0,
    loaded: false,
    expiredAt: 0,
    error: ''
  }),
  async mounted() {
    const pollInfoRaw = await fetch(`https://senko.ga/api/poll/${this.$route.params.id}`);
    const dataRaw = await fetch(`https://senko.ga/api/poll/${this.$route.params.id}/question/${this.$route.params.question}`);
    const pollInfo = await pollInfoRaw.json();
    const data = await dataRaw.json();
    this.name = pollInfo.name;
    this.allQuestions = pollInfo.questions;
    if (!pollInfo.ok) {
        this.$router.push('/404');
        return;
    }
    if (this.$route.params.question >= this.allQuestions) {
        this.$router.push('/poll/end');
    }
    this.expiredAt = (localStorage.getItem('expireAt') - Date.now()) / 60000|0;
    if (this.expiredAt < 0) {
        this.$router.push('/poll/end');
    }
    if (!pollInfoRaw.ok || !dataRaw.ok) {
      return;
    }
    this.description = data.name;
    this.answers = data.answers;
    this.image = data.image ?? null;
    this.loaded = true;
  },
  methods: {
    async answerClick(event, id) {
        console.log(id);
        if (!this.answers[id]) return;
        const data = await (await fetch(`https://senko.ga/api/poll/${this.$route.params.id}/reply/${this.$route.params.question}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: localStorage.getItem('uid'),
                token: localStorage.getItem('token'),
                answer: id,
            }),
        })).json();
        if (data.ok) {
            console.log('ok');
            this.$router.push(`/poll/${this.$route.params.id}/question/${+(this.$route.params.question)+1}`);
        } else {
            this.error = data.message;
            console.log(`/poll/${this.$route.params.id}/question/${+(this.$route.params.question)+1}`)
            if(data.message === 'На этот вопрос уже был дан ответ') this.$router.push(`/poll/${this.$route.params.id}/question/${+(this.$route.params.question)+1}`);
        }
    }
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
.AndefLoveKotori {
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
        height: 100%;
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
