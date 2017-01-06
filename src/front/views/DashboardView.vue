<template>
<div>

    <alert></alert>

    <div class="pure-g">
        <div class="pure-u-1 pure-u-lg-1-1">
            <div v-if="splitDevices.length > 0" class="pure-g">
                <div class="pure-u-1 pure-u-sm-1-2 pure-u-md-1-4 pure-u-lg-1-6" v-if="settings.datetime">
                    <date-time></date-time>
    </div>
                <div v-for="sd in splitDevices" class="pure-u-1 pure-u-sm-1-2 pure-u-md-1-4 pure-u-lg-1-6" v-if="settings.esp8266">
                    <device-type :device="sd"></device-type>
    </div>
                <div v-if="settings.netatmo">
                    <netatmo></netatmo>
    </div>
                <div v-if="settings.freebox" class="pure-u-1 pure-u-sm-1-2 pure-u-md-1-4 pure-u-lg-1-6">
                    <freebox></freebox>
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
    //import netatmo from 'netatmo'
    import Alert from '../components/AlertComponent.vue'
    import DateTime from '../components/DateTimeComponent.vue'
    import DeviceType from '../components/DeviceTypeComponent.vue'    
    import Netatmo from '../components/netatmo/NetatmoComponent.vue'    
    import Freebox from '../components/FreeboxComponent.vue'

    export default {
        data() {
            return {
                socket: io(),
                splitDevices: [],
                netatmoDevice: {},
                netatmoApi: {},
                settings: [],
            }
        },
        components: {
            Alert,
            DeviceType,
            DateTime,
            Netatmo,
            Freebox,
        },
        methods: {
            display(name) {
                this.settings.forEach((setting, index) => {
                    console.log(setting.name, setting.value)
                    return (setting.name === name && setting.value)
                })
            },
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
            getNetatmoData() {
                this.netatmoApi.getStationsData((err, devices) => {
                    if(!err) {
                        this.netatmoDevice = devices[0]
                    } else {
                        console.error(err)
                    }
                })
            },
        },
        created() {
            this.socket.emit('get.setting.object', (settings) => {
                this.settings = settings
            })
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

            this.socket.emit('get.netatmo', (auth) => {
                //      this.netatmoApi = new netatmo(auth)
                //      this.getNetatmoData()
                //      setInterval(() => { this.getNetatmoData() }, 50000)
            })
        },
    }
</script>

<style lang="sass"></style>