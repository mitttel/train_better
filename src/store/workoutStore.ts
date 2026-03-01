import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Workout } from '../types/workout'
import type { WorkoutTemplate } from '../types/workoutTemplate'
import { storage } from '../services/storageService'
import { todayIso } from '../utils/date'

export const useWorkoutStore = defineStore('workout', () => {
    const workouts = ref<Workout[]>(storage.load() ?? [])

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
            exercises: []
        }
    }

    function createWorkoutFromTemplate(template: WorkoutTemplate): Workout {
        return {
            id: `${Date.now()}`,
            date: todayIso(),
            name: template.name,
            exercises: [...template.exercises]
                .sort((a, b) => a.order - b.order)
                .map(exercise => ({
                    id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
                    name: exercise.name,
                    sets: [],
                    measurementType: exercise.measurementType,
                    notes: exercise.notes
                }))
        }
    }

    return { workouts, addWorkout, updateWorkout, removeWorkout, createEmptyWorkout, createWorkoutFromTemplate }
})
