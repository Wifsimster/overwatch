<template>
<div>

    <alert></alert>

    <div class="pure-g">
        <div class="pure-u-1 pure-u-lg-1-1">
            <div v-if="splitDevices.length > 0" class="pure-g">
                <div v-for="sd in splitDevices" class="pure-u-1-2 pure-u-md-1-4 pure-u-lg-1-8">
                    <device-type :device="sd"></device-type>
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
                splitDevices: [],
            }
        },
        components: {
            DeviceType, 
            Alert,
        },
        methods: {
            renderDevices(devices) {
                this.splitDevices = []
                if(devices) {
                    devices.forEach((device, i) => {
                        if(device.types) {
                            device.types.forEach((type, j) => {
                                let sd = JSON.parse(JSON.stringify(device))
                                sd.type = type
                                delete sd.types
                                this.splitDevices.push(sd)
                            })
                        }
                    })
                }
            }, 
            renderAlert(devices) {
                this.$store.dispatch('resetAlert')
                if(devices.length > 0) {
                    this.$store.dispatch('setAlert', {type: 'info', message: devices.length + ' device(s) to configure !'})
                }
            },
        },
        created() {
            this.socket.emit('get.device', (devices) => {
                this.renderDevices(devices)
            })
            this.socket.on('get.device', (devices) => {
                this.renderDevices(devices)
                this.socket.emit('get.untype.device', (devices) => {
                    this.renderAlert(devices)
                })
            })
            this.socket.emit('get.untype.device', (devices) => {
                this.renderAlert(devices)
            })
        },
    }
</script>

<style lang="sass" scoped>

</style>