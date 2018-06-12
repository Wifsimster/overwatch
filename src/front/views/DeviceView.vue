<template>
<div>    
    <div class="pure-g">
        <div class="pure-u-1 pure-u-lg-1-1">
            <com-devices></com-devices>
    </div>
    </div>
    </div>
</template>

<script>
    import ComDevices from '../components/DevicesComponent.vue'
    import io from 'socket.io-client'
    export default {
        data() {
            return {

            }
        },
        components: {
            ComDevices,
        },
    }
</script>

<style lang="scss" scoped></style>