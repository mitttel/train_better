import { computed, ref } from 'vue'

interface ProfileSettings {
    useKg: boolean
    defaultRestSec: number
}

const SETTINGS_KEY = 'train-better-profile-settings-v1'

const state = ref<ProfileSettings>(loadSettings())

function loadSettings(): ProfileSettings {
    try {
        const raw = localStorage.getItem(SETTINGS_KEY)
        if (!raw) {
            return {
                useKg: true,
                defaultRestSec: 90
            }
        }

        const parsed = JSON.parse(raw) as Partial<ProfileSettings>
        return {
            useKg: parsed.useKg ?? true,
            defaultRestSec: normalizeSec(parsed.defaultRestSec, 90)
        }
    } catch {
        return {
            useKg: true,
            defaultRestSec: 90
        }
    }
}

function normalizeSec(value: number | undefined, fallback: number) {
    if (typeof value !== 'number' || Number.isNaN(value)) return fallback
    return Math.max(0, Math.round(value))
}

function saveSettings() {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.value))
}

export function useSettings() {
    const useKg = computed({
        get: () => state.value.useKg,
        set: (value: boolean) => {
            state.value.useKg = value
            saveSettings()
        }
    })

    const defaultRestSec = computed({
        get: () => state.value.defaultRestSec,
        set: (value: number) => {
            state.value.defaultRestSec = normalizeSec(value, 90)
            saveSettings()
        }
    })

    return {
        useKg,
        defaultRestSec
    }
}
