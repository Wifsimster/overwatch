<template>
<div class="app"> 
    <com-header></com-header> 
    <com-sidebar></com-sidebar>
    <div class="wrapper">
        <div class="container">
            <alert></alert>
            <router-view></router-view>
    </div>
    </div>
    </div>
</template>

<script>
    import ComHeader from './components/HeaderComponent.vue'
    import ComSidebar from './components/SidebarComponent.vue'
    import 'purecss'
    import '../../node_modules/purecss/build/grids-responsive.css'
    import io from 'socket.io-client'
    import Alert from './components/AlertComponent.vue'

    export default {      
        components: {
            ComHeader,
            ComSidebar,
            Alert,
        },
        data() {
            return {
                socket: io(),                
            }
        },
        created() {
            this.$store.commit('resetAlert')

            this.socket.on('device.add.result', (device) => {
                this.$store.commit('setAlert', {type: 'success', message: 'New device detected !'})
            })
            
            this.socket.on('device.online', (device) => {
                console.log('Device connected', device)
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