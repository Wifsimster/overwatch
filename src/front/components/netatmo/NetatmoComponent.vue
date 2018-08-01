<template>
    <transition name="opacity">
        <div class="flex-container" v-if="settings.netatmo.display && netatmoDevice">
            <temperature :device="netatmoDevice"></temperature>
            <outdoor-temperature :device="netatmoDevice"></outdoor-temperature>
            <humidity :device="netatmoDevice"></humidity>
            <outdoor-humidity :device="netatmoDevice"></outdoor-humidity>
            <noise :device="netatmoDevice"></noise>
            <co2 :device="netatmoDevice"></co2>
            <pressure :device="netatmoDevice"></pressure>
        </div>
    </transition>
</template>

<script>
import Vue from 'vue'
import Humidity from './HumidityComponent.vue'
import OutdoorHumidity from './ModuleHumidityComponent.vue'
import Temperature from './TemperatureComponent.vue'
import OutdoorTemperature from './ModuleTemperatureComponent.vue'
import Noise from './NoiseComponent.vue'
import Co2 from './CO2Component.vue'
import Pressure from './PressureComponent.vue'
export default {
    components: {
        Humidity,
        OutdoorHumidity,
        Temperature,
        OutdoorTemperature,
        Co2,
        Pressure,
        Noise,
    },
    props: {
        settings: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            netatmoDevice: null
        }
    },
    created() {
        this.uuid = Vue.getUUID()
        this.getInfos()        
        setInterval(() => { this.getInfos() }, 30000)
    },
    methods: {
        getInfos() {
            this.$ws.send(JSON.stringify({ object: 'Netatmo', method: 'findAll', uuid: this.uuid}))
            this.$ws.onmessage = message => {
            const data = JSON.parse(message.data)
                if('findAll' === data.method && this.uuid === data.uuid) {
                    this.netatmoDevice = data.results[0]
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../sass/components/netatmo';
</style>