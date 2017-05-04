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
    export default {
        components: {
            ComHeader,
            ComSidebar,
        },
        data() {
            return {
                socket: io(),
            }
        },
        created() {
            this.socket.on('notify', (alert) => {
                console.log('Notify', alert.data)
                alertify.notify(alert.message, alert.type, alert.time)
            })
        },
    }
</script>

<style lang="sass">
@import './sass/global';
@import './sass/transition';
@import './sass/led';
@import './sass/card';
@import './sass/checkbox';
@import './sass/modal';
</style>