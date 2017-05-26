<template>
<device :show="settings.netatmo.display">
    <div slot="body">
        <div class="image"><img :src="icon"></div>
        <span class="data" v-if="device.dashboard_data">{{ device.dashboard_data.Noise }}dB</span>
        <span class="name">{{ device.station_name }}</span>
        <span class="location">{{ device.module_name }}</span>
    </div>
    </device>
</template>

<script>
    import Device from '../DeviceComponent.vue'
    import noise from '../../assets/sound.png'
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
                icon: noise,
            }
        },
    }
</script>

<style lang="sass" scoped></style>