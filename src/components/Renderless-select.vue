<script>
export default {
    render() {
        return this.$scopedSlots.default({
            label: this.label,
            items: this.items,
            clickEvent: this.onClick
        })
    },
    data() {
        return {
            items: []
        }
    },
    props: {
        value: '',
        label: '',
        options: Array,
        type: {
            type: String,
            default: 'radio' // radio/checkbox
        }
    },
    methods: {
        onClick(item) {
            if (this.type === 'radio') {
                if (item.DEFAULT) {
                    return
                }
                this.items.forEach(item => { item.DEFAULT = false })
                item.DEFAULT = true
            } else {
                item.DEFAULT = !item.DEFAULT
            }
            let result = this.items.filter(item => item.DEFAULT)
            this.$emit('input', result.map(item => item.value))
        }
    },
    created() {
        let items = JSON.parse(JSON.stringify(this.options))
        items.forEach(item => {
            item.DEFAULT = !!this.value.find(val => val === item.value)
        })
        this.items = items
    }
}
</script>
