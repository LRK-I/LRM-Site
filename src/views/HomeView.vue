<template>
  <div class="home container">
    <img class="ichigo_icon" src="https://cdn.discordapp.com/attachments/917528169374961725/971754532130398268/unknown.png">
    <div>
      <h1>Luft & Raumfahrt Militärkult von Ichigo</h1>
      <div class="info">
        <div>
          <font-awesome-icon icon="location-dot" /> Омский Метрополитен
        </div>
        <div>
          <font-awesome-icon icon="user-group" /> 2
        </div>
      </div>
      <div class="ktoMi">
        <h2>Кто мы?</h2>
        <p>Мы Аэрокосмический военный культ Ичиго дислоцированный в Омском Метрополитене основанный выходцами из Третьей Мотострелковой Авиатехническо Инженерной Оперативной Гвардейской Штурмгруппы “Бездна”</p>
      </div>
      <h2 style="margin-top: 40px;">Основатели</h2>
      <div class="founders">
        <FounderComponent v-for="item in founders" :key="item" :icon="`https://cdn.discordapp.com/avatars/${item.id}/${item.avatar}.${item.avatar.startsWith('a_') ? 'gif' : 'png'}?size=80`" :name="`${item.username}#${item.discriminator}`"/>
      </div>
    </div>
  </div>
</template>

<script>
import FounderComponent from '../components/FounderComponent.vue';

export default {
  name: 'HomeView',
  components: { FounderComponent },
  data: () => ({
    founders: []
  }),
  async mounted() {
    const request = await fetch('https://senko.ga/api/founders');
    const data = await request.json();
    this.founders = data;
    console.log(data);
  }
}
</script>

<style lang="scss" scoped>
.ichigo_icon {
  width: 250px;
  margin-right: 40px;
}
.home {
  display: flex;
  h1 {
    font-size: 40px;
  }
}
.info {
  display: flex;
  align-items: center;
  gap: 10px;
  div {
    font-size: 20px;
  }
  svg {
    width: 25px;
  }
}
.ktoMi {
  margin-top: 30px;
  p {
    font-size: 20px;
    font-family: 'Futura PT Book', sans-serif;
  }
}
.founders {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

@media only screen and (max-width: 600px) {
  .ichigo_icon {
    margin: 0 auto;
  }
  .home {
    display: grid;
  }
  .founders {
    display: grid;
  }
}

@media only screen and (min-width: 600px) {

}
</style>
