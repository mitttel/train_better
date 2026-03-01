import type { MeasurementType } from './templateExercise'

export interface SetRow {
    id: string
    reps: number
    weight?: number
    restSec?: number
}

export interface Exercise {
    id: string
    name: string
    sets: SetRow[]
    measurementType?: MeasurementType
    notes?: string
}
