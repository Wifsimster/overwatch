<template>
<div>

    <alert></alert>

    <div class="pure-g">
        <div class="pure-u-1 pure-u-lg-1-1">
            <h2>Devices ({{ devices.length }})</h2>
            <div v-if="devices.length > 0" class="pure-g">
                <div v-for="device in devices" class="pure-u-1-2 pure-u-sm-1-4 pure-u-md-1-8 pure-u-lg-1-12">
                    <device-type :device="device"></device-type>
    </div>
    </div>
            <div v-else>
                <p>No device found.</p>
    </div>
    </div>
    </div>
    </div>
</template>

<script>
    import io from 'socket.io-client'
    import DeviceType from '../components/DeviceTypeComponent.vue'
    import Alert from '../components/AlertComponent.vue'

    export default {
        data() {
            return {
                socket: io(),
                devices: [],
            }
        },
        components: {
            DeviceType, 
            Alert,
        },
        created() {
            this.socket.emit('get.device', (devices) => {
                this.devices = devices
            })
            this.socket.on('get.device', (devices) => {
                this.devices = devices
            })

            this.socket.emit('get.untype.device', (devices) => {
                if(devices.length > 0) {
                    this.$store.dispatch('setAlert', {type: 'info', message: devices.length + ' device(s) to configure !'})
                }
            })
            this.socket.on('get.untype.device', (devices) => {
                if(devices.length > 0) {
                    this.$store.dispatch('setAlert', {type: 'info', message: devices.length + ' device(s) to configure !'})
                }
            })
        },
    }
</script>

<style lang="sass" scoped>

</style>