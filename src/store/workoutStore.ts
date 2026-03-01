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

  function persist() {
    storage.save(workouts.value)
  }

  function getWorkoutById(id: string) {
    return workouts.value.find(workout => workout.id === id)
  }

  function addWorkout(workout: Workout) {
    workouts.value.unshift(workout)
    persist()
  }

  function updateWorkout(updatedWorkout: Workout) {
    const index = workouts.value.findIndex(workout => workout.id === updatedWorkout.id)
    if (index === -1) {
      return
    }

    workouts.value[index] = updatedWorkout
    persist()
  }

  function upsertWorkout(workout: Workout) {
    const existingWorkout = getWorkoutById(workout.id)
    if (existingWorkout) {
      updateWorkout(workout)
      return
    }

    addWorkout(workout)
  }

  function removeWorkout(id: string) {
    workouts.value = workouts.value.filter(workout => workout.id !== id)
    persist()
  }

  function createEmptyWorkout(): Workout {
    return {
      id: `${Date.now()}`,
      date: todayIso(),
      exercises: [],
      status: 'draft',
    }
  }

  return {
    workouts,
    getWorkoutById,
    addWorkout,
    updateWorkout,
    upsertWorkout,
    removeWorkout,
    createEmptyWorkout,
  }
})
