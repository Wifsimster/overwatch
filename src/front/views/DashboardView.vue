<template>
<div>
  <alert></alert>

  <div class="pure-g">
    <div class="pure-u-1 pure-u-lg-1-1">
      <div class="pure-g">
        <div class="pure-u-1 pure-u-sm-1-2 pure-u-md-1-4 pure-u-lg-1-6" v-if="settings.datetime">
          <date-time></date-time>
  </div>
        <div v-if="settings.freebox" class="pure-u-1 pure-u-sm-1-2 pure-u-md-1-4 pure-u-lg-1-6">
          <freebox></freebox>
  </div>
        <div v-for="sd in splitDevices" class="pure-u-1 pure-u-sm-1-2 pure-u-md-1-4 pure-u-lg-1-6" v-if="settings.esp8266">
          <device-type :device="sd"></device-type>
  </div>
        <div class="pure-u-1 pure-u-sm-1-2 pure-u-md-1-4 pure-u-lg-1-6" v-if="settings.netatmo">
          <netatmo-temperature :device="netatmoDevice"></netatmo-temperature>
  </div> 
        <div class="pure-u-1 pure-u-sm-1-2 pure-u-md-1-4 pure-u-lg-1-6" v-if="settings.netatmo">
          <netatmo-outdoor-temperature :device="netatmoDevice"></netatmo-outdoor-temperature>
  </div>
        <div class="pure-u-1 pure-u-sm-1-2 pure-u-md-1-4 pure-u-lg-1-6" v-if="settings.netatmo">
          <netatmo-humidity :device="netatmoDevice"></netatmo-humidity>
  </div>
        <div class="pure-u-1 pure-u-sm-1-2 pure-u-md-1-4 pure-u-lg-1-6" v-if="settings.netatmo">
          <netatmo-outdoor-humidity :device="netatmoDevice"></netatmo-outdoor-humidity>
  </div>
        <div class="pure-u-1 pure-u-sm-1-2 pure-u-md-1-4 pure-u-lg-1-6" v-if="settings.netatmo">
          <netatmo-noise :device="netatmoDevice"></netatmo-noise>
  </div>
        <div class="pure-u-1 pure-u-sm-1-2 pure-u-md-1-4 pure-u-lg-1-6" v-if="settings.netatmo">
          <netatmo-co2 :device="netatmoDevice"></netatmo-co2>
  </div>
        <div class="pure-u-1 pure-u-sm-1-2 pure-u-md-1-4 pure-u-lg-1-6" v-if="settings.netatmo">
          <netatmo-pressure :device="netatmoDevice"></netatmo-pressure>
  </div>
        <div class="pure-u-1 pure-u-sm-1-2 pure-u-md-1-4 pure-u-lg-1-6">          
          <camera port="9962"></camera>
  </div>
        <div class="pure-u-1 pure-u-sm-1-2 pure-u-md-1-4 pure-u-lg-1-6">          
          <camera port="9963"></camera>
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
        this.netatmoApi = new netatmo(auth)
        this.getNetatmoData()
        setInterval(() => { this.getNetatmoData() }, 300000)
      })
    },
  }
</script>

<style lang="sass"></style>