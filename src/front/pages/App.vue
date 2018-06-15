<template>
    <div class="app">
        <com-header></com-header>
        <com-sidebar></com-sidebar>
        <div class="wrapper">
            <div class="container">
                <alert></alert>
                <notify></notify>
                <transition name="opacity" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
// import io from 'socket.io-client'
// import WebSocket from 'ws'
const ComHeader = () => import('../components/HeaderComponent.vue')
const ComSidebar = () => import('../components/SidebarComponent.vue')
const Alert = () => import("../components/AlertComponent.vue")
const Notify = () => import("../components/NotificationComponent.vue")
import "../sass/_multiselect.scss"
import 'purecss'
import 'purecss/build/grids-responsive.css'
export default {
    components: {
        ComHeader,
        ComSidebar,
        Alert,
        Notify
    },
    computed: {
        ws() {
            return this.$store.getters.ws
        },
    },
    created() {
        console.log('Starting socket connection...')

        const ws = new WebSocket('ws://localhost:8082')

        ws.onerror = (err) => console.error('WS :', err)
        
        ws.onopen = () => {
            console.log('Connection WS open !')
            ws.send(JSON.stringify({ message: `Hi`}))
        }

        ws.onclose = () => console.log('Connection WS closed !')        

        this.$store.dispatch('setWebSocket', ws)

        // if (this.socket) {
        //     this.ws.on('notify', data => {
        //         console.log('Notify :', data)
        //         this.$store.dispatch('addNotification', data.message)
        //     })
        // }
    }
}
</script>

<style lang="scss">
@import '../sass/global';
@import '../sass/led';
@import '../sass/card';
@import '../sass/checkbox';
@import '../sass/modal';
@import '../sass/form';
@import '../sass/btn';
@import '../sass/device';
@import '../sass/tabs';
@import '../sass/transition';
</style>