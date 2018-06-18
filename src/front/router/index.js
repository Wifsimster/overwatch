import Vue from 'vue'
import Router from 'vue-router'

const Dashboard = () => import('../pages/Dashboard.vue')
const Device = () => import('../pages/Device.vue')
const Message = () => import('../pages/Message.vue')
const Type = () => import('../pages/Type.vue')
const Location = () => import('../pages/Location.vue')
const Backup = () => import('../pages/Backup.vue')
const Settings = () => import('../pages/Settings.vue')
const Scenario = () => import('../pages/Scenario.vue')

Vue.use(Router)

let router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/', component: Dashboard },
    { path: '/messages', component: Message },
    { path: '/devices', component: Device },
    { path: '/types', component: Type },
    { path: '/locations', component: Location },
    { path: '/backup', component: Backup },
    { path: '/settings', component: Settings },
    { path: '/scenario', component: Scenario }
  ]
})

export default router
