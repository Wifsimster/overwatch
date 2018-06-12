<template>
<div class="device" v-if="device">
    <div class="image"><img :src="icon"></div>
    <span class="data" v-if="device.dashboard_data">{{ device.dashboard_data.Pressure }}mB</span>
    <span class="name">{{ device.station_name }}</span>
    <span class="location">{{ device.module_name }}</span>
    </div>
</template>

<script>
    import pressure from '../../assets/pressure.png'

    export default {
        props: {
            device: Object,
        },
        data() {
            return {
                icon: pressure,
            }
        },
    }
</script>


<style lang="scss" scoped>
@import '../../sass/_device.scss';
</style>