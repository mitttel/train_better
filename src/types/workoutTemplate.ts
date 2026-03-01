import type { MeasurementType, TemplateExercise } from './templateExercise'

export interface WorkoutTemplate {
    id: string
    name: string
    createdAt: string
    exercises: TemplateExercise[]
    defaultUnit: MeasurementType
    defaultRestSec?: number
}
