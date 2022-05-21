import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PollStart from '../views/Poll.Start.vue'
import PollQuestions from '../views/Poll.Questions.vue'
import PollEnd from '../views/Poll.End.vue'
import NotFound from '../views/404.vue'
import AuthEnd from '../views/Auth.End.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  }, {
    path: '/poll/:id',
    name: 'poll',
    component: PollStart
  }, {
    path: '/poll/:id/question/:question',
    name: 'poll-question',
    component: PollQuestions
  }, {
    path: '/poll/end',
    name: 'poll-end',
    component: PollEnd
  },{
    path: '/complete/:token',
    name: 'auth',
    component: AuthEnd
  }, {
    path: '/:pathMatch(.*)',
    component: NotFound
  }  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
