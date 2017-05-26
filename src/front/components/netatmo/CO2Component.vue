<template>
<device :show="settings.netatmo.display">
    <div slot="body">
        <div class="image"><img :src="icon"></div>
        <span class="data" v-if="device.dashboard_data">{{ device.dashboard_data.CO2 }}ppm</span>
        <span class="name">{{ device.station_name }}</span>
        <span class="location">{{ device.module_name }}</span>
    </div>
    </device>
</template>

<script>
    import Device from '../DeviceComponent.vue'
    import co2 from '../../assets/co2.png'
    export default {
        components: { Device },
        props: {
            device: {
                type: Object,
                required: true,
            },
            settings: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                icon: co2,
            }
        },
    }
</script>

<style lang="sass" scoped></style>