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
    import '../../node_modules/purecss/build/grids-responsive.css'

    export default {      
        components: {
            ComHeader, 
            ComSidebar,
        }
    }
</script>

<style lang="sass">
@import './sass/_global.scss'
</style>