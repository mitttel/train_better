export type MeasurementType = 'weight' | 'minutes' | 'centimeters' | 'meters'

export interface TemplateExercise {
    id: string
    name: string
    order: number
    measurementType: MeasurementType
    notes?: string
}
