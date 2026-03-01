import type { Workout } from '../types/workout'
import { daysBetween } from '../utils/calculations'

export function isWorkoutCompleted(workout: Workout) {
    if (workout.status === 'completed') return true
    if (workout.completedAt) return true

    // Backward compatibility for legacy records without status.
    return workout.exercises.some(ex =>
        ex.sets.some(set => (set.weight ?? 0) > 0 || (set.reps ?? 0) > 0),
    )
}

export function countWorkouts(workouts: Workout[]) {
    return workouts.length
}

export function totalLiftedWeight(workouts: Workout[]) {
    return workouts.reduce(
        (total, workout) =>
            total +
            workout.exercises.reduce(
                (exerciseSum, exercise) =>
                    exerciseSum +
                    exercise.sets.reduce(
                        (setSum, set) => setSum + (set.weight ?? 0) * (set.reps ?? 0),
                        0,
                    ),
                0,
            ),
        0,
    )
}

export function completedWorkoutsCount(workouts: Workout[]) {
    return workouts.filter(isWorkoutCompleted).length
}

export function workoutsByDay(workouts: Workout[]) {
    return workouts.reduce<Record<string, number>>((acc, workout) => {
        if (!isWorkoutCompleted(workout)) return acc
        acc[workout.date] = (acc[workout.date] ?? 0) + 1
        return acc
    }, {})
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
