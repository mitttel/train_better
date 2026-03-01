export function todayIso() {
    const d = new Date()
    d.setHours(0,0,0,0)
    return d.toISOString().slice(0,10)
}

export function formatHuman(dateIso: string) {
    const d = new Date(dateIso)
    return d.toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' })
}