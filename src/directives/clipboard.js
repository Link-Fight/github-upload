import Clipboard from 'clipboard'
export default {
    bind(el) {
        var clipboard = new Clipboard(el)
        el.$clipboard = clipboard
        clipboard.on('success', function (e) {
            console.info('Action:', e.action)
            console.info('Text:', e.text)
            console.info('Trigger:', e.trigger)
            e.clearSelection()
            window.alert('☺ 复制成功！')
        })
    },
    unbind(el) {
        el.$clipboard && el.$clipboard.destroy()
    }
}