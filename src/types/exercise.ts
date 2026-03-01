export interface SetRow {
    id: string
    reps: number
    weight?: number
    restSec?: number
    completedAt?: string
}

export interface Exercise {
    id: string
    name: string
    sets: SetRow[]
    notes?: string
    defaultRestSec?: number
}
