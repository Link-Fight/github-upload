import { delay } from './util'
import { appBtnsInFooter } from './AppBtns'

export function getInitData() {
    return delay({
        title: '队伍详情',
        body: {
            header: {
                img: 'http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/a18e4d6c826db144b7d2202892814cf7.jpg?imageView2/0/w/100/h/100&e=1823479031&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:VBrbHUpjVJaT7GjO80EpK6RMhPM=',
                title: '其实不想走',
                subTitle: '你走不走：打我电话(110、119)'
            },
            tip: '当前账号',
            content: {
                img: 'http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/a18e4d6c826db144b7d2202892814cf7.jpg?imageView2/0/w/100/h/100&e=1823479031&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:VBrbHUpjVJaT7GjO80EpK6RMhPM=',
                title: '郑晓欢',
                subTitle: '1232132137289479834'
            }
        },
        btns: appBtnsInFooter
    })
}