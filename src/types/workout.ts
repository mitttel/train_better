import type { Exercise } from './exercise'

export type WorkoutStatus = 'draft' | 'completed'

export interface Workout {
    id: string
    date: string // ISO yyyy-mm-dd
    name?: string
    exercises: Exercise[]
    notes?: string
    status: WorkoutStatus
    completedAt?: string // ISO datetime
}
