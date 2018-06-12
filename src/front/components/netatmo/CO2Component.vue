<template>
<div class="device" v-if="device">
    <div class="image"><img :src="icon"></div>
    <span class="data" v-if="device.dashboard_data">{{ device.dashboard_data.CO2 }}ppm</span>
    <span class="name">{{ device.station_name }}</span>
    <span class="location">{{ device.module_name }}</span>
    </div>
</template>

<script>
    import co2 from '../../assets/co2.png'

    export default {
        props: {
            device: Object,
        },
        data() {
            return {
                icon: co2,
            }
        },
    }
</script>


<style lang="scss" scoped>
@import '../../sass/_device.scss';
</style>