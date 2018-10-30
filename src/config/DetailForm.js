
export default [
    {
        type: 'LinkCellForImg',
        EDIT: {
            variable: 'img',
            type: 'images-upload',
            api: ''
        },
        img: 'http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/a18e4d6c826db144b7d2202892814cf7.jpg?imageView2/0/w/100/h/100&e=1823479031&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:VBrbHUpjVJaT7GjO80EpK6RMhPM=',
        title: '',
        value: '修改头像',
        href: ''
    },
    {
        type: 'LinkCellForImgGroup',
        title: '',
        items: [
            {
                type: 'LinkCellForImg',
                EDIT: {
                    variable: 'img1',
                    type: 'images-upload',
                    api: ''
                },
                img: 'http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/a18e4d6c826db144b7d2202892814cf7.jpg?imageView2/0/w/100/h/100&e=1823479031&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:VBrbHUpjVJaT7GjO80EpK6RMhPM=',
                title: '你的头像1',
                value: '修改头像',
                href: ''
            },
            {
                type: 'LinkCellForImg',
                EDIT: {
                    variable: 'img2',
                    type: 'images-upload',
                    api: ''
                },
                img: 'http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/a18e4d6c826db144b7d2202892814cf7.jpg?imageView2/0/w/100/h/100&e=1823479031&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:VBrbHUpjVJaT7GjO80EpK6RMhPM=',
                title: '你的头像1',
                value: '修改头像',
                href: ''
            }
        ]
    },
    {
        type: 'LinkCell',
        EDIT: {
            variable: 'name',
            type: 'text',
            api: ''
        },
        icon: '',
        title: '团队名称',
        subTitle: '',
        value: '刘波',
        href: ''
    },
    {
        type: 'LinkCellGroup',
        title: '',
        items: [
            {
                type: 'LinkCell',
                EDIT: {
                    variable: 'name1',
                    type: 'text',
                    api: ''
                },
                icon: '',
                title: '团队名称1',
                subTitle: '',
                value: '刘波',
                href: ''
            },
            {
                type: 'LinkCell',
                EDIT: {
                    variable: 'name2',
                    type: 'text',
                    api: ''
                },
                icon: '',
                title: '团队名称2',
                subTitle: '',
                value: '刘波',
                href: ''
            }
        ]
    },
    {
        type: 'LinkCell',
        EDIT: {
            variable: 'person',
            type: 'select',
            src: 'isTest',
            api: 'post/test'
        },
        icon: '',
        title: '队长权限转让',
        subTitle: '',
        value: '郑晓欢',
        href: ''
    }
]

export const userForm = [
    {
        type: 'LinkCellGroup',
        title: '',
        items: [
            {
                type: 'LinkCell',
                EDIT: {
                    variable: 'name1',
                    type: 'text',
                    api: ''
                },
                icon: '',
                title: '昵称',
                subTitle: '',
                value: '李建辉',
                href: ''
            },
            {
                type: 'LinkCell',
                EDIT: {
                    variable: 'name2',
                    type: 'text',
                    api: ''
                },
                icon: '',
                title: '账号ID',
                subTitle: '',
                value: 'DHF003',
                href: ''
            },
            {
                type: 'LinkCell',
                EDIT: {
                    variable: 'name2',
                    type: 'text',
                    api: ''
                },
                icon: '',
                title: '账号ID',
                subTitle: '',
                value: 'DHF003',
                href: ''
            }
        ]
    }
]

export const deviceForm = [
    {
        type: 'LinkCellGroup',
        title: '基础设置',
        items: [
            {
                EDIT: {
                    variable: 'name2',
                    type: 'text',
                    api: ''
                },
                title: '修改设备名称',
                value: '郑晓欢一号',
                href: ''
            },
            {
                EDIT: [
                    {
                        txt: '移除管理者',
                        EDIT: {
                            type: 'api',
                            src: 'isTest',
                            api: 'post/test'
                        }
                    },
                    {
                        txt: '选择管理者',
                        EDIT: {
                            variable: 'person',
                            type: 'select',
                            src: 'isTest',
                            api: 'post/test'
                        }
                    }
                ],
                icon: '',
                title: '设备管理者',
                value: '郑晓欢',
                href: ''
            },
            {
                title: '更多设置',
                href: '#/orderDetail?isTest=1&src=987'
            }
        ]
    }
]