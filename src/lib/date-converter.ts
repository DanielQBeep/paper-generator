export default function DateConverter(date: string) {
    if (!date) return null
    return new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}