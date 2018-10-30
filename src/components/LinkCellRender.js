export function renderImg(h, { img }) {
    return h('div', {
        'class': 'xa-default__img LinkCell-img',
        style: {
            'backgroundImage': img ? 'url(' + img + ')' : ''
        }
    })
}
export function renderIcon(h, icon, iconClass) {
    return icon && h('i', { 'class': iconClass + ' iconfont ' + icon, style: 'margin-right:4px' })
}

export function renderTitle(h, { title, subTitle, icon, iconClass }) {
    return (title || subTitle) ? h('div', { 'class': 'weui-cell__bd', style: 'min-width: 6em;' }, [h('div', { 'class': 'LinkCell-title xa-cell xa-txt-333' }, [h('div', title)]), renderSubTitle(h, subTitle)]) : ''
}

export function renderSubTitle(h, subTitle) {
    if (subTitle) {
        if (subTitle instanceof Array) {
            return h('p', { 'class': 'xa-txt-999 xa-txt-12' }, subTitle.map(title => h('p', { 'class': 'LinkCell-subTitle xa-txt-12' }, title)))
        } else {
            return h('p', { 'class': 'xa-txt-999 xa-txt-12' }, subTitle)
        }
    }
}
export function renderPhone(h, phone) {
    return h('a', {
        style: {
            border: '4px solid transparent',
            'border-width': '8px 4px'
        },
        domProps: {
            href: 'tel:' + phone
        }
    }, [h('i', {
        style: {
            'margin-left': '4px'
        },
        class: 'iconfont icon-dianhua xa-txt-green'
    })])
}
export function renderValue(h, { value, phone, color }) {
    return h('div', { class: 'xa-txt-333 weui-cell__ft', style: { color } }, [value instanceof Array ? value.map(value => h('p', { style: { 'line-height': '18px' } }, value)) : value, phone && renderPhone(h, phone)])
}

export function renderBtns(h, vm) {
    if (vm.btns && vm.btns.length > 0) {
        return h('div', { 'class': 'xa-cell' }, vm.btns.map((btn, index) => {
            return h('WeuiBadge', {
                key: index,
                props: {
                    icon: btn.icon,
                    badge: btn.badge,
                    label: btn.txt
                },
                style: {
                    color: btn.color
                },
                nativeOn: {
                    click(event) {
                        event.stopPropagation()
                        event.preventDefault()
                        vm.$emit('btnClick', {
                            btn: btn,
                            event: event
                        })
                    }
                }
            })
        }))
    }
}

export function renderLinkCellForImg(h, vm) {
    return h('a', {
        'class': {
            'weui-cell': true,
            'weui-cell_access': !!vm.href || vm.access !== undefined
        },
        attrs: {
            href: vm.href ? vm.href : 'javascript:;'
        }
    }, [renderImg(h, vm), renderTitle(h, vm), renderBtns(h, vm), renderValue(h, vm)])
}

export function renderLinkCell(h, vm) {
    return h('a', {
        'class': {
            'weui-cell': true,
            'weui-cell_access': (!!vm.href || vm.access !== undefined) && vm.access !== false
        },
        attrs: {
            href: vm.href ? vm.href : 'javascript:;'
        }
    }, [renderIcon(h, vm.icon, vm.iconClass), renderTitle(h, vm), renderBtns(h, vm), vm.$slots.default, renderValue(h, vm)])
}

export function renderLinkWrap(h, vm, ...chil) {
    return h('a', {
        'class': {
            'weui-cell': true,
            'weui-cell_access': !!vm.href || vm.access !== undefined
        }
    }, chil)
}
