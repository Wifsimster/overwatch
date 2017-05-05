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
        created() {
            this.$store.commit('setSocket', io())
            
            this.$store.state.socket.socket.on('notify', (data) => {
                console.log('Notify', data)
                alertify.notify(data.message, data.type, data.time)
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