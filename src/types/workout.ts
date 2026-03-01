import type { Exercise } from './exercise'

export interface Workout {
    id: string
    date: string // ISO yyyy-mm-dd
    name?: string
    exercises: Exercise[]
    notes?: string
}