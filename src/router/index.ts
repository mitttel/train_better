import { createRouter, createWebHistory } from 'vue-router'
import DiaryView from '../views/DiaryView.vue'
import WorkoutView from '../views/WorkoutView.vue'
import StatsView from '../views/StatsView.vue'
import ProfileView from '../views/ProfileView.vue'

const routes = [
  { path: '/', redirect: '/diary' },
  { path: '/diary', name: 'Diary', component: DiaryView },
  { path: '/workouts', name: 'Workouts', component: WorkoutView },
  { path: '/workout/:id', name: 'Workout', component: WorkoutView, props: true },
  { path: '/stats', name: 'Stats', component: StatsView },
  { path: '/profile', name: 'Profile', component: ProfileView },
  // backward compatibility for old links
  { path: '/history', redirect: '/diary' },
  { path: '/settings', redirect: '/profile' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
