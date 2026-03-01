import { defineStore } from 'pinia'
import { ref } from 'vue'
import { storage } from '../services/storageService'
import type { MeasurementType, TemplateExercise } from '../types/templateExercise'
import type { WorkoutTemplate } from '../types/workoutTemplate'

function uid() {
    return `${Date.now()}-${Math.floor(Math.random() * 10000)}`
}

export const useTemplateStore = defineStore('template', () => {
    const templates = ref<WorkoutTemplate[]>(storage.loadTemplates() ?? [])

    function createTemplate(payload: {
        name: string
        defaultUnit: MeasurementType
        defaultRestSec?: number
        exercises?: Omit<TemplateExercise, 'id' | 'order'>[]
    }) {
        const template: WorkoutTemplate = {
            id: uid(),
            name: payload.name,
            createdAt: new Date().toISOString(),
            defaultUnit: payload.defaultUnit,
            defaultRestSec: payload.defaultRestSec,
            exercises: (payload.exercises ?? []).map((exercise, index) => ({
                ...exercise,
                id: uid(),
                order: index
            }))
        }

        templates.value.unshift(template)
        storage.saveTemplates(templates.value)
        return template
    }

    function updateTemplate(updated: WorkoutTemplate) {
        const idx = templates.value.findIndex(t => t.id === updated.id)
        if (idx < 0) return

        templates.value[idx] = {
            ...updated,
            exercises: [...updated.exercises].sort((a, b) => a.order - b.order)
        }
        storage.saveTemplates(templates.value)
    }

    function deleteTemplate(id: string) {
        templates.value = templates.value.filter(t => t.id !== id)
        storage.saveTemplates(templates.value)
    }

    function reorderExercises(templateId: string, fromIndex: number, toIndex: number) {
        const template = templates.value.find(t => t.id === templateId)
        if (!template) return
        if (fromIndex < 0 || toIndex < 0 || fromIndex >= template.exercises.length || toIndex >= template.exercises.length) return

        const next = [...template.exercises].sort((a, b) => a.order - b.order)
        const [moved] = next.splice(fromIndex, 1)
        next.splice(toIndex, 0, moved)
        template.exercises = next.map((exercise, index) => ({ ...exercise, order: index }))

        storage.saveTemplates(templates.value)
    }

    return { templates, createTemplate, updateTemplate, deleteTemplate, reorderExercises }
})
