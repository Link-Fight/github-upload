let id = 0
export function show() {
    id++
    document.body.classList.add('hidden-scroll')
}
export function hidden() {
    id--
    if (id === 0) {
        document.body.classList.remove('hidden-scroll')
    } else if (id < 0) {
        id = 0
    }
}