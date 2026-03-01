import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WorkoutView from '../views/WorkoutView.vue'
import HistoryView from '../views/HistoryView.vue'
import StatsView from '../views/StatsView.vue'
import SettingsView from '../views/SettingsView.vue'
import TemplatesView from '../views/TemplatesView.vue'
import TemplateFormView from '../views/TemplateFormView.vue'

const routes = [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/workout/:id?', name: 'Workout', component: WorkoutView, props: true },
    { path: '/history', name: 'History', component: HistoryView },
    { path: '/stats', name: 'Stats', component: StatsView },
    { path: '/settings', name: 'Settings', component: SettingsView },
    { path: '/templates', name: 'Templates', component: TemplatesView },
    { path: '/templates/new', name: 'TemplateNew', component: TemplateFormView },
    { path: '/templates/:id/edit', name: 'TemplateEdit', component: TemplateFormView, props: true }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
