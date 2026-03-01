import type { Workout } from '../types/workout'

const STORAGE_KEY = 'workout-journal-v1'

export const storage = {
    load(): Workout[] | null {
        try {
            const raw = localStorage.getItem(STORAGE_KEY)
            if (!raw) return null
            return JSON.parse(raw) as Workout[]
        } catch (e) {
            console.error('Failed to load workouts', e)
            return null
        }
    },

    save(data: Workout[]) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
        } catch (e) {
            console.error('Failed to save workouts', e)
        }
    }
}