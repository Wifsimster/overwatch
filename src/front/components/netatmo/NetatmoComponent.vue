<template>
<div class="pure-u-1 pure-u-sm-1-2 pure-u-md-1-4 pure-u-lg-1-6">
    <netatmo-temperature :device="netatmoDevice"></netatmo-temperature>
    </div> 
<div class="pure-u-1 pure-u-sm-1-2 pure-u-md-1-4 pure-u-lg-1-6">
    <netatmo-outdoor-temperature :device="netatmoDevice"></netatmo-outdoor-temperature>
    </div>
<div class="pure-u-1 pure-u-sm-1-2 pure-u-md-1-4 pure-u-lg-1-6">
    <netatmo-humidity :device="netatmoDevice"></netatmo-humidity>
    </div> 
<div class="pure-u-1 pure-u-sm-1-2 pure-u-md-1-4 pure-u-lg-1-6">
    <netatmo-outdoor-humidity :device="netatmoDevice"></netatmo-outdoor-humidity>
    </div>
<div class="pure-u-1 pure-u-sm-1-2 pure-u-md-1-4 pure-u-lg-1-6">
    <netatmo-noise :device="netatmoDevice"></netatmo-noise>
    </div>
<div class="pure-u-1 pure-u-sm-1-2 pure-u-md-1-4 pure-u-lg-1-6">
    <netatmo-co2 :device="netatmoDevice"></netatmo-co2>
    </div>
<div class="pure-u-1 pure-u-sm-1-2 pure-u-md-1-4 pure-u-lg-1-6">
    <netatmo-pressure :device="netatmoDevice"></netatmo-pressure>
    </div>
</template>

<script>
    import NetatmoHumidity from './HumidityComponent.vue'
    import NetatmoOutdoorHumidity from './ModuleHumidityComponent.vue'
    import NetatmoTemperature from './TemperatureComponent.vue'
    import NetatmoOutdoorTemperature from './ModuleTemperatureComponent.vue'
    import NetatmoNoise from './NoiseComponent.vue'
    import NetatmoCo2 from './CO2Component.vue'
    import NetatmoPressure from './PressureComponent.vue'

    export default {
        components: {            
            NetatmoHumidity,
            NetatmoOutdoorHumidity,
            NetatmoTemperature,
            NetatmoOutdoorTemperature,
            NetatmoCo2,
            NetatmoPressure,
            NetatmoNoise,
        }
    }
</script>