<script>
const HeadKey = {
    _PHONE: renderPhone
}
function renderPhone(h, phone) {
    return phone && renderCell(h, '', [h('a', {
        style: {
            border: '4px solid transparent',
            'border-width': '8px 4px'
        },
        domProps: {
            href: 'tel:' + phone
        }
    }, [h('i', {
        class: 'iconfont icon-dianhua xa-txt-green'
    })])])
}
function renderCell(h, content, slot) {
    return h('div', {
        class: 'table-cell xa-line__top'
    }, slot || content)
}
function chooseHeaderRender(h, colRender, key, index) {
    if (HeadKey[key]) {
        colRender[index] = HeadKey[key]
    } else {
        colRender[index] = renderCell
        return renderCell(h, key)
    }
}
export default {
    name: 'AppTable',
    render(h) {
        let header = this.items[0]
        let vm = this
        let colRender = {}
        function renderThead() {
            return h('thead', [h('tr', { class: 'table-head ' + vm.trClass }, [
                header.map((head, index) => h('th', { key: index }, [
                    chooseHeaderRender(h, colRender, head, index)
                ]))
            ])])
        }
        let renderBody = () => {
            return h('tbody', [
                this.items.map((rows, index) => {
                    if (index > 0) {
                        return h('tr', {
                            class: 'table-row ' + vm.trClass + (this.value === (index - 1) ? ' xa-txt-green' : ''),
                            key: index,
                            on: {
                                click() {
                                    vm.$emit('input', index - 1)
                                }
                            }
                        }, [rows.map((row, index) => {
                            return h('td', { key: index }, [
                                // renderCell(h, row)
                                colRender[index](h, row)
                            ])
                        })])
                    }
                })
            ])
        }
        function renderTable() {
            return h('table', {
                class: 'table-container',
                attrs: {
                    width: '100%',
                    cellpadding: '2',
                    cellspacing: '0'
                }
            }, [renderThead(), renderBody()])
        }
        return h('div', {
            'class': 'weui-cells',
            style: {
                'marginTop': 0
            }
        }, [
                this.title && h('LinkCell', {
                    props: {
                        title: this.title
                    }
                }),
                h('div', {
                    class: 'table-wrap'
                }, [renderTable()])
            ])
    },
    data() {
        return {
            tableBody: [],
            maxcols: 6,
            maxcolspan: 5
        }
    },
    props: {
        items: {
            type: [Array, String],
            default() {
                return []
            }
        },
        title: {
            type: String,
            default: ''
        },
        trClass: String,
        value: {
            type: Number,
            default: -1
        }
    }
}
</script>
<style scoped>
.table-wrap {
  overflow-x: auto;
  padding-left: 15px;
}
.table-container {
  border-collapse: collapse;
  width: max-content;
  min-width: 100%;
  white-space: nowrap;
}

.table-cell {
  height: 40px;
  line-height: 40px;
  vertical-align: middle;
  /* border-bottom: 1px solid #e5e5e5; */
  padding-right: 0.5em;
  text-align: left;
}
.table-container th:last-child .table-cell,
.table-container td:last-child .table-cell {
  text-align: right;
  padding-right: 8px;
}
</style>
