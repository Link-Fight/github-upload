import { mapState, mapMutations } from 'vuex'
import baseView from './BaseView.js'
import FormSwitch from '@/components/FormSwitch.vue'
const viewUrl = '/wechat/v4/profile/home'
export default {
    extends: baseView,
    components: {
        FormSwitch
    },
    data() {
        return {
            isLoading: false,
            isDark: false,
            title: this.$route.query.title
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.user
        })
    },
    watch: {
        isDark(val) {
            this.updateTheme({
                isDark: val
            })
        }
    },
    methods: {
        ...mapMutations(
            {
                updateTheme: 'theme/update'
            }
        ),
        getTestServer(params) {
            return import('@/config/ViewUser.js').then(({ getInitData }) => getInitData(params))
        },
        init() {
            this.isLoading = true
            if (this.userInfo.hasInit === false) {
                let { src, params } = this.$extractRouteInfo()
                if (this.curRoute) {
                    src = this.curRoute.src
                    params = this.curRoute.params
                }
                return this.baseRequest({ src: src || viewUrl, params }, this.getTestServer, src === 'isTest' || this.isTest).then(data => {
                    this.$store.commit('user/update', data)
                    this.isLoading = false
                })
            } else {
                this.isLoading = false
            }
        }
    },
    created() {
        this.isDark = this.$store.state.theme.isDark
        this.title && this.$setDocTitle(this.title)
        this.init()
    }
}