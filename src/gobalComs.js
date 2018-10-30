import AppAvatar from './components/AppAvatar.vue'
import AppAvatarByUid from './components/AppAvatarByUid.vue'
import AppBtns from './components/AppBtns.vue'
import AppEmpty from './components/AppEmpty.vue'
import AppTab from './components/AppTab.vue'
import AppTip from './components/AppTip.vue'
import AppList from './components/AppList.vue'

import LinkCell from './components/LinkCell.vue'
import FormCell from './components/FormCell.vue'
import LinkCellForImg from './components/LinkCellForImg.vue'
import LinkCellForTxt from './components/LinkCellForTxt.vue'
import LinkCellGroup from './components/LinkCellGroup.vue'
import LinkCellForImgGroup from './components/LinkCellForImgGroup.vue'
import DiyListHeader from './components/DiyListHeader.vue'
import DiyListFiltersHeader from './components/DiyListFiltersHeader.vue'
import OrderListItem from './components/OrderListItem.vue'
import SearchBar from './components/SearchBar.vue'

import StatisticeCells from './components/StatisticeCells.vue'
import StatisticeDatePicker from './components/StatisticeDatePicker.vue'

import PopBtns from './components/PopBtns.vue'
import PopPanel from './components/PopPanel.vue'
import PopInput from './components/PopInput.vue'
import TabBar from './components/TabBar.vue'

import GeoImg from './components/GeoImg.vue'

import TouchEvent from './components/TouchEvent.vue'
import TeamInfo from './components/TeamInfo.vue'
import TeamSelector from './components/TeamSelector.vue'
import TeamCreate from './components/TeamCreate.vue'

import TeamListHeader from './components/TeamListHeader.vue'
import TeamListItem from './components/TeamListItem.vue'
import FarmingListItem from './components/FarmingListItem.vue'
import FarmingListItemV2 from './components/FarmingListItemV2.vue'

import WeuiArrow from './components/WeuiArrow.vue'
import WeuiBadge from './components/WeuiBadge.vue'
import WeuiToast from './components/WeuiToast.vue'
import WeuiLoadMore from './components/WeuiLoadMore.vue'

import UiTag from './components/UiTag.vue'
import UiStatu from './components/UiStatu.vue'

import DetailComFactory from './components/DetailComFactory.vue'

let Map = {
    [AppAvatar.name]: AppAvatar,
    [AppAvatarByUid.name]: AppAvatarByUid,
    [AppBtns.name]: AppBtns,
    [AppEmpty.name]: AppEmpty,
    [AppTab.name]: AppTab,
    [AppTip.name]: AppTip,
    [AppList.name]: AppList,
    [FormCell.name]: FormCell,
    [PopBtns.name]: PopBtns,
    [PopPanel.name]: PopPanel,
    [PopInput.name]: PopInput,
    [DetailComFactory.name]: DetailComFactory,
    [LinkCell.name]: LinkCell,
    [LinkCellForImg.name]: LinkCellForImg,
    [LinkCellForTxt.name]: LinkCellForTxt,
    [LinkCellGroup.name]: LinkCellGroup,
    [LinkCellForImgGroup.name]: LinkCellForImgGroup,
    [DiyListHeader.name]: DiyListHeader,
    [DiyListFiltersHeader.name]: DiyListFiltersHeader,
    [OrderListItem.name]: OrderListItem,
    [SearchBar.name]: SearchBar,
    [StatisticeCells.name]: StatisticeCells,
    [StatisticeDatePicker.name]: StatisticeDatePicker,
    [GeoImg.name]: GeoImg,
    [TabBar.name]: TabBar,
    [TouchEvent.name]: TouchEvent,
    [TeamInfo.name]: TeamInfo,
    [TeamCreate.name]: TeamCreate,
    [TeamSelector.name]: TeamSelector,
    [TeamListHeader.name]: TeamListHeader,
    [TeamListItem.name]: TeamListItem,
    [FarmingListItem.name]: FarmingListItem,
    [FarmingListItemV2.name]: FarmingListItemV2,
    [WeuiArrow.name]: WeuiArrow,
    [WeuiBadge.name]: WeuiBadge,
    [WeuiToast.name]: WeuiToast,
    [WeuiLoadMore.name]: WeuiLoadMore,
    [UiTag.name]: UiTag,
    [UiStatu.name]: UiStatu
}

export default {
    install(Vue, options) {
        for (let comName in Map) {
            Vue.component(comName, Map[comName])
        }
    }
}