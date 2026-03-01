export function daysBetween(a: Date, b: Date) {
    const ms = Math.abs(a.getTime() - b.getTime())
    return Math.ceil(ms / (1000 * 60 * 60 * 24))
}