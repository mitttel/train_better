import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Workout } from '../types/workout'
import { storage } from '../services/storageService'
import { todayIso } from '../utils/date'

function normalizeWorkout(workout: Partial<Workout>): Workout {
    return {
        id: workout.id ?? `${Date.now()}`,
        date: workout.date ?? todayIso(),
        name: workout.name,
        exercises: workout.exercises ?? [],
        notes: workout.notes,
        status: workout.status ?? (workout.completedAt ? 'completed' : 'draft'),
        completedAt: workout.completedAt,
    }
}

export const useWorkoutStore = defineStore('workout', () => {
    const workouts = ref<Workout[]>((storage.load() ?? []).map(normalizeWorkout))

    function addWorkout(w: Workout) {
        workouts.value.unshift(w)
        storage.save(workouts.value)
    }

    function updateWorkout(updated: Workout) {
        const idx = workouts.value.findIndex(w => w.id === updated.id)
        if (idx >= 0) {
            workouts.value[idx] = updated
            storage.save(workouts.value)
        }
    }

    function removeWorkout(id: string) {
        workouts.value = workouts.value.filter(w => w.id !== id)
        storage.save(workouts.value)
    }

    function createEmptyWorkout(): Workout {
        return {
            id: `${Date.now()}`,
            date: todayIso(),
            exercises: [],
            status: 'draft',
        }
    }

    return { workouts, addWorkout, updateWorkout, removeWorkout, createEmptyWorkout }
})
