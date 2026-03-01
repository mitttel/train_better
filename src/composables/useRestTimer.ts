import { computed, ref } from 'vue'

interface PersistedTimer {
    remainingSec: number
    isRunning: boolean
}

const TIMER_KEY = 'train-better-rest-timer-v1'

const remainingSec = ref(0)
const isRunning = ref(false)
let intervalId: ReturnType<typeof setInterval> | null = null

hydrate()

function hydrate() {
    try {
        const raw = localStorage.getItem(TIMER_KEY)
        if (!raw) return

        const parsed = JSON.parse(raw) as Partial<PersistedTimer>
        remainingSec.value = normalizeSec(parsed.remainingSec)
        isRunning.value = Boolean(parsed.isRunning) && remainingSec.value > 0

        if (isRunning.value) startTicker()
    } catch {
        remainingSec.value = 0
        isRunning.value = false
    }
}

function normalizeSec(value: unknown) {
    if (typeof value !== 'number' || Number.isNaN(value)) return 0
    return Math.max(0, Math.round(value))
}

function persist() {
    localStorage.setItem(TIMER_KEY, JSON.stringify({
        remainingSec: remainingSec.value,
        isRunning: isRunning.value
    }))
}

function stopTicker() {
    if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
    }
}

function startTicker() {
    stopTicker()

    intervalId = setInterval(() => {
        if (!isRunning.value) return

        if (remainingSec.value <= 0) {
            isRunning.value = false
            stopTicker()
            persist()
            return
        }

        remainingSec.value -= 1

        if (remainingSec.value <= 0) {
            remainingSec.value = 0
            isRunning.value = false
            stopTicker()
        }

        persist()
    }, 1000)
}

export function useRestTimer() {
    const isActive = computed(() => remainingSec.value > 0)

    function start(sec: number) {
        remainingSec.value = normalizeSec(sec)
        isRunning.value = remainingSec.value > 0
        persist()

        if (isRunning.value) startTicker()
    }

    function pause() {
        isRunning.value = false
        persist()
    }

    function resume() {
        if (remainingSec.value <= 0) return
        isRunning.value = true
        persist()
        startTicker()
    }

    function reset() {
        remainingSec.value = 0
        isRunning.value = false
        stopTicker()
        persist()
    }

    function skip() {
        reset()
    }

    return {
        remainingSec,
        isRunning,
        isActive,
        start,
        pause,
        resume,
        reset,
        skip
    }
}
