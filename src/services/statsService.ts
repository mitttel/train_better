import type { Workout } from '../types/workout'
import { daysBetween } from '../utils/calculations'

export function countWorkouts(workouts: Workout[]) {
    return workouts.length
}

export function workoutsInRange(workouts: Workout[], fromIso: string, toIso: string) {
    return workouts.filter(w => w.date >= fromIso && w.date <= toIso)
}

export function avgWorkoutsPerWeek(workouts: Workout[]) {
    if (!workouts.length) return 0
    const dates = workouts.map(w => new Date(w.date))
    const min = new Date(Math.min(...dates.map(d => d.getTime())))
    const max = new Date(Math.max(...dates.map(d => d.getTime())))
    const weeks = Math.max(1, Math.ceil(daysBetween(min, max) / 7))
    return +(workouts.length / weeks).toFixed(2)
}