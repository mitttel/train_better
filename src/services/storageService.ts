import type { Workout } from '../types/workout'
import type { WorkoutTemplate } from '../types/workoutTemplate'

const WORKOUT_STORAGE_KEY = 'workout-journal-v1'
const TEMPLATE_STORAGE_KEY = 'workout-templates-v1'
const LEGACY_TEMPLATE_STORAGE_KEY = 'workout-templates'

export const storage = {
    load(): Workout[] | null {
        try {
            const raw = localStorage.getItem(WORKOUT_STORAGE_KEY)
            if (!raw) return null
            return JSON.parse(raw) as Workout[]
        } catch (e) {
            console.error('Failed to load workouts', e)
            return null
        }
    },

    save(data: Workout[]) {
        try {
            localStorage.setItem(WORKOUT_STORAGE_KEY, JSON.stringify(data))
        } catch (e) {
            console.error('Failed to save workouts', e)
        }
    },

    loadTemplates(): WorkoutTemplate[] | null {
        try {
            const current = localStorage.getItem(TEMPLATE_STORAGE_KEY)
            if (current) return JSON.parse(current) as WorkoutTemplate[]

            const legacy = localStorage.getItem(LEGACY_TEMPLATE_STORAGE_KEY)
            if (!legacy) return null

            const parsed = JSON.parse(legacy) as WorkoutTemplate[]
            localStorage.setItem(TEMPLATE_STORAGE_KEY, JSON.stringify(parsed))
            localStorage.removeItem(LEGACY_TEMPLATE_STORAGE_KEY)

            return parsed
        } catch (e) {
            console.error('Failed to load workout templates', e)
            return null
        }
    },

    saveTemplates(data: WorkoutTemplate[]) {
        try {
            localStorage.setItem(TEMPLATE_STORAGE_KEY, JSON.stringify(data))
        } catch (e) {
            console.error('Failed to save workout templates', e)
        }
    }
}
