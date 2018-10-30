<template>
<section class="detail-container xa-view p1">
    <section class="xa-container">
        <!-- <div style="height:63px;"></div> -->
        <!-- <TeamListHeader class="xa-line__bottom"></TeamListHeader> -->
        <TeamInfo class="xa-com__space xa-line__bottom"></TeamInfo>
        <LinkCellGroup title="" :items="items" class="xa-com__space"></LinkCellGroup>
        <LinkCellGroup title="作业日历(3)" :items="rilis" class="xa-com__space"></LinkCellGroup>
    </section>
    <footer>
        <AppBtns :items="AppBtns"/>
    </footer>
</section>
</template>
<script>
export default {
    name: 'TeamView',
    data() {
        return {
            AppBtns: [
                {
                    txt: '移除该参与者',
                    type: 'alert',
                    ajax: {
                        url: '',
                        comfirm: ''
                    },
                    href: ''
                }
            ],
            items: [
                {
                    title: '作业面积',
                    value: '120.05亩',
                    href: ''
                },
                {
                    title: '测绘面积',
                    value: '120.05亩',
                    href: ''
                },
                {
                    title: '作业飞机',
                    value: '2架',
                    href: ''
                },
                {
                    title: '作业电池',
                    value: '10台',
                    href: ''
                }
            ],
            rilis: [
                {
                    title: '2017-05-23',
                    value: '120.05亩',
                    href: ''
                },
                {
                    title: '2017-05-22',
                    value: '2架',
                    href: ''
                },
                {
                    title: '2017-05-22',
                    value: '50.12亩',
                    href: ''
                }
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
.detail-container {
//   background-image: url("../assets/v4_tearm.png");
  //   opacity: 0.1;
  background-repeat: no-repeat;
  background-size: 375px 667px;
}
</style>
