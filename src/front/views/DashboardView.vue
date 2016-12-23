<template>
<div>
    <button @click="send" class="pure-button pure-button-primary pull-right">Send message</button>
    
    <div class="pure-g">
        <div class="pure-u-1 pure-u-lg-1-1">
            <com-devices></com-devices>
    </div>
        <div class="pure-u-1 pure-u-lg-1-1">
            <com-messages></com-messages>
    </div>
    </div>
    </div>
</template>

<script>
    import ComDevices from '../components/DevicesComponent.vue'    
    import ComMessages from '../components/MessagesComponent.vue'
    import io from 'socket.io-client'

    export default {
        data() {
            return {

            }
        },
        components: {
            ComDevices,
            ComMessages,
        },
        methods: {
            send() {
                const socket = io()
                const self = this
                const dummy = { name: 'esp-01', mac: '00:00:00:00:00:00', ip: '192.168.0.69', temperature: 25.2, humidity: 12 }
                socket.emit('add.message', dummy)
            },
        },
    }
</script>

<style lang="sass" scoped>

</style>