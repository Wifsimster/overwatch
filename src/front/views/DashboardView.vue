<template>
<div>
    <alert></alert>

    <div class="pure-g">
        <div class="pure-u-1 pure-u-lg-1-1">
            <div class="pure-g" v-if="settings">        
                <div class="pure-u-1 pure-u-sm-1-2 pure-u-md-1-4 pure-u-lg-1-6" v-if="settings.datetime && settings.datetime.display !== 'false'">
                    <date-time></date-time>
    </div>
                <div class="pure-u-1 pure-u-sm-1-2 pure-u-md-1-4 pure-u-lg-1-6" v-if="settings.freebox && settings.freebox.display !== 'false'">
                    <freebox></freebox>
    </div>
                <div class="pure-u-1 pure-u-sm-1-2 pure-u-md-1-4 pure-u-lg-1-6" v-if="settings.netatmo && settings.netatmo.display !== 'false'">
                    <netatmo-temperature :device="netatmoDevice"></netatmo-temperature>
    </div> 
                <div class="pure-u-1 pure-u-sm-1-2 pure-u-md-1-4 pure-u-lg-1-6" v-if="settings.netatmo && settings.netatmo.display !== 'false'">
                    <netatmo-outdoor-temperature :device="netatmoDevice"></netatmo-outdoor-temperature>
    </div>
                <div class="pure-u-1 pure-u-sm-1-2 pure-u-md-1-4 pure-u-lg-1-6" v-if="settings.netatmo && settings.netatmo.display !== 'false'">
                    <netatmo-humidity :device="netatmoDevice"></netatmo-humidity>
    </div>
                <div class="pure-u-1 pure-u-sm-1-2 pure-u-md-1-4 pure-u-lg-1-6" v-if="settings.netatmo && settings.netatmo.display !== 'false'">
                    <netatmo-outdoor-humidity :device="netatmoDevice"></netatmo-outdoor-humidity>
    </div>
                <div class="pure-u-1 pure-u-sm-1-2 pure-u-md-1-4 pure-u-lg-1-6" v-if="settings.netatmo && settings.netatmo.display !== 'false'">
                    <netatmo-noise :device="netatmoDevice"></netatmo-noise>
    </div>
                <div class="pure-u-1 pure-u-sm-1-2 pure-u-md-1-4 pure-u-lg-1-6" v-if="settings.netatmo && settings.netatmo.display !== 'false'">
                    <netatmo-co2 :device="netatmoDevice"></netatmo-co2>
    </div>
                <div class="pure-u-1 pure-u-sm-1-2 pure-u-md-1-4 pure-u-lg-1-6" v-if="settings.netatmo && settings.netatmo.display !== 'false'">
                    <netatmo-pressure :device="netatmoDevice"></netatmo-pressure>
    </div>
                <div class="pure-u-1 pure-u-sm-1-2 pure-u-md-1-4 pure-u-lg-1-6" v-if="settings.cameras && settings.cameras.display !== 'false'">
                    <camera port="9962"></camera>
    </div>
                <div class="pure-u-1 pure-u-sm-1-2 pure-u-md-1-4 pure-u-lg-1-6" v-if="settings.cameras && settings.cameras.display !== 'false'">
                    <camera port="9963"></camera>
    </div>
                <div v-for="sd in splitDevices" class="pure-u-1 pure-u-sm-1-2 pure-u-md-1-4 pure-u-lg-1-6" v-if="settings.esp8266 && settings.esp8266.display !== 'false'">
                    <device-type :device="sd"></device-type>
    </div>
    </div>
    </div>
    </div>
    </div>
</template>

<script>
    import io from 'socket.io-client'
    import netatmo from 'netatmo'
    import Alert from '../components/AlertComponent.vue'
    import DateTime from '../components/DateTimeComponent.vue'
    import DeviceType from '../components/DeviceTypeComponent.vue'   
    import Freebox from '../components/FreeboxComponent.vue'
    import NetatmoHumidity from '../components/netatmo/HumidityComponent.vue'
    import NetatmoOutdoorHumidity from '../components/netatmo/ModuleHumidityComponent.vue'
    import NetatmoTemperature from '../components/netatmo/TemperatureComponent.vue'
    import NetatmoOutdoorTemperature from '../components/netatmo/ModuleTemperatureComponent.vue'
    import NetatmoNoise from '../components/netatmo/NoiseComponent.vue'
    import NetatmoCo2 from '../components/netatmo/CO2Component.vue'
    import NetatmoPressure from '../components/netatmo/PressureComponent.vue'
    import Camera from '../components/CameraComponent.vue'
    import YeelightSearch from 'yeelight-wifi'

    export default {
        data() {
            return {
                socket: io(),
                splitDevices: [],
                settings: [],
                netatmoDevice: {},
                netatmoApi: {},
                camera: null,
            }
        },
        components: {
            Alert,
            DeviceType,
            DateTime,
            Freebox,      
            NetatmoHumidity,
            NetatmoOutdoorHumidity,
            NetatmoTemperature,
            NetatmoOutdoorTemperature,
            NetatmoCo2,
            NetatmoPressure,
            NetatmoNoise,
            Camera,
        },
        methods: {
            display(name) {
                this.settings.forEach((setting, index) => {
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
                if(devices.length > 0) {
                    this.$store.commit('setAlert', {type: 'info', message: devices.length + ' device(s) to configure !'})
                } else {
                    this.$store.commit('resetAlert')
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
            this.$store.commit('resetAlert')
            this.socket.emit('get.setting', (settings) => {
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
            this.socket.emit('get.setting', (settings) => {
                this.netatmoApi = new netatmo(settings.netatmo)
                this.getNetatmoData()
                setInterval(() => { this.getNetatmoData() }, 300000)
            })

            const yeelightSearch = new YeelightSearch()

            yeelightSearch.on('found', (fn) => {
                var lights = yeelightSearch.getYeelights()
                lights.forEach((light) => {
                    console.log('-- Id :', light.getId())
                    console.log('-- Name :', light.getName())
                    console.log('-- Model :', light.getModel())

                    light.turnOn('smooth', 500)
                })
            })

//            this.socket.on('get.lights', (lights) => {
//                console.log('Lights', lights)
//            })

        },
    }
</script>

<style lang="sass"></style>