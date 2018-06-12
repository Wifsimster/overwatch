<template>
<div class="device" v-if="device">
    <div class="image"><img :src="icon"></div>
    <span class="data" v-if="device.dashboard_data">{{ device.dashboard_data.Temperature }}°C</span>
    <span class="name">{{ device.station_name }}</span>
    <span class="location">{{ device.module_name }}</span>
    </div>
</template>

<script>
    import thermometer from '../../assets/thermometer.png'

    export default {
        props: {
            device: Object,
        },
        data() {
            return {
                icon: thermometer,
            }
        },
    }
</script>


<style lang="scss" scoped>
@import '../../sass/_device.scss';
</style>