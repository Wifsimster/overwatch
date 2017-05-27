<template>
<div class="flex-container">
    <temperature :settings="settings" :device="netatmoDevice"></temperature>
    <outdoor-temperature :settings="settings" :device="netatmoDevice"></outdoor-temperature>
    <humidity :settings="settings" :device="netatmoDevice"></humidity>
    <outdoor-humidity :settings="settings" :device="netatmoDevice"></outdoor-humidity>
    <noise :settings="settings" :device="netatmoDevice"></noise>
    <co2 :settings="settings" :device="netatmoDevice"></co2>
    <pressure :settings="settings" :device="netatmoDevice"></pressure>
    </div>
</template>

<script>
    import netatmo from 'netatmo'
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
                netatmoDevice: {},
                netatmoApi: {},
            }
        },
        created() {
            this.netatmoApi = new netatmo(this.settings.netatmo)
            this.getNetatmoData()
            setInterval(() => { this.getNetatmoData() }, 300000)
        },
        methods: {
            getNetatmoData() {
                this.netatmoApi.getStationsData((err, devices) => {
                    if(!err) {
                        this.netatmoDevice = devices[0]
                    } else {
                        console.error(err)
                    }
                })
            },
        }
    }
</script>

<style lang="sass" scoped>
@import '../../sass/components/netatmo'
</style>