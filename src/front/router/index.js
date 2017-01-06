import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import DashboardView from '../views/DashboardView.vue'
import DeviceView from '../views/DeviceView.vue'
import MessageView from '../views/MessageView.vue'
import TypeView from '../views/TypeView.vue'
import LocationView from '../views/LocationView.vue'
import BackupView from '../views/BackupView.vue'
import SettingsView from '../views/SettingsView.vue'

export default new Router({
    //  mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        { path: '/', component: DashboardView },
        { path: '/messages', component: MessageView },
        { path: '/devices', component: DeviceView },
        { path: '/types', component: TypeView },
        { path: '/locations', component: LocationView },
        { path: '/backup', component: BackupView },
        { path: '/settings', component: SettingsView },
    ]
})