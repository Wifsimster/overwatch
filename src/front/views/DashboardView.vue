<template>
<div>
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
                <div v-for="light in lights" class="pure-u-1 pure-u-sm-1-2 pure-u-md-1-4 pure-u-lg-1-6">
                    <yeelight :light="light"></yeelight>
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
    import netatmo from 'netatmo'
    import alertify from 'alertifyjs'
    import DateTime from '../components/DateTimeComponent.vue'
    import DeviceType from '../components/device/DeviceTypeComponent.vue'   
    import Freebox from '../components/FreeboxComponent.vue'
    import NetatmoHumidity from '../components/netatmo/HumidityComponent.vue'
    import NetatmoOutdoorHumidity from '../components/netatmo/ModuleHumidityComponent.vue'
    import NetatmoTemperature from '../components/netatmo/TemperatureComponent.vue'
    import NetatmoOutdoorTemperature from '../components/netatmo/ModuleTemperatureComponent.vue'
    import NetatmoNoise from '../components/netatmo/NoiseComponent.vue'
    import NetatmoCo2 from '../components/netatmo/CO2Component.vue'
    import NetatmoPressure from '../components/netatmo/PressureComponent.vue'
    import Camera from '../components/CameraComponent.vue'
    import Yeelight from '../components/YeelightComponent.vue'

    export default {
        data() {
            return {
                socket: this.$store.state.socket.socket,
                splitDevices: [],
                lights: [],
                settings: [],
                netatmoDevice: {},
                netatmoApi: {},
                camera: null,
            }
        },
        components: {
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
            Yeelight,
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
                    alertify.notify(devices.length + ' device(s) to configure !', 'info', 5)
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
            this.socket.emit('setting.getAll')
            this.socket.on('setting.getAll.result', (settings) => {
                this.settings = settings                
                this.netatmoApi = new netatmo(settings.netatmo)
                this.getNetatmoData()
                setInterval(() => { this.getNetatmoData() }, 300000)
            })

            this.socket.emit('device.getAll')
            this.socket.on('device.getAll.result', (devices) => {
                this.renderDevices(devices)
            })

            this.socket.on('message.add.result', (message) => {
                this.socket.emit('device.getAll')
            })

            this.socket.on('light.found', (light) => {
                let exist = this.lights.filter((li) => {
                    if(li.id === light.id) { return true }
                })
                if(exist.length === 0) { 
                    this.lights.push(light) 
                }
            })

            this.socket.emit('light.getAll')
            this.socket.on('light.getAll.result', (rst) => {
                //alertify.notify(rst.length + ' light(s) detected', 'success', 10)
                this.lights = rst 
            })
        },
    }
</script>

<style lang="sass" scoped></style>