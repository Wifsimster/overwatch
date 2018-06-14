import Vue from 'vue'
import Router from 'vue-router'

const Dashboard = () => '../pages/Dashboard.vue'
const Device = () => '../pages/Device.vue'
const Message = () => '../pages/Message.vue'
const Type = () => '../pages/Type.vue'
const Location = () => '../pages/Location.vue'
const Backup = () => '../pages/Backup.vue'
const Settings = () => '../pages/Settings.vue'
const Scenario = () => '../pages/Scenario.vue'

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
