<template>
    <div class="app">
        <com-header></com-header>
        <com-sidebar></com-sidebar>
        <div class="wrapper">
            <div class="container">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import ComHeader from './components/HeaderComponent.vue'
import ComSidebar from './components/SidebarComponent.vue'
import 'purecss'
import alertify from 'alertifyjs'
import io from 'socket.io-client'
import '../../node_modules/purecss/build/grids-responsive.css'
import '../../node_modules/alertifyjs/build/css/alertify.css'
import '../../node_modules/vue-multiselect/dist/vue-multiselect.min.css'
export default {
    components: {
        ComHeader,
        ComSidebar,
    },
    computed: {
        socket() {
            return this.$store.getters.socket
        },
    },
    created() {
        this.$store.dispatch('setSocket', io())
        if (this.socket) {
            this.socket.on('notify', data => {
                alertify.notify(data.message, data.type, data.time)
            })
        }
    },
}
</script>

<style lang="scss">
@import './sass/global';
@import './sass/led';
@import './sass/card';
@import './sass/checkbox';
@import './sass/modal';
@import './sass/form';
@import './sass/btn';
@import './sass/device';
@import './sass/tabs';
@import './sass/transition';
</style>