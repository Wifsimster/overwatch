<template>
<div>
    <transition name="opacity">
        <div v-if="device.modules"
             @click="modalShow = true"
             class="netatmo-device">
            <div class="image"><img :src="icon"></div>
            <span class="data" v-if="device.dashboard_data">{{ device.modules[0].dashboard_data.Temperature }}°C</span>
            <span class="name">{{ device.station_name }}</span>
            <span class="location">{{ device.modules[0].module_name }}</span>
    </div>
    </transition>

    <modal v-if="modalShow"
           @close="onClose">
        <div slot="header">{{ device.station_name }} - {{ device.modules[0].module_name }}</div>
        <div slot="body">
            <h2>Temperatures</h2>
            <ul>
                <li>Temperature: {{ device.modules[0].dashboard_data.Temperature }}°C le {{ getDate(device.modules[0].dashboard_data.time_utc) }}</li>
                <li>Temperature max: {{ device.modules[0].dashboard_data.max_temp }}°C le {{ getDate(device.modules[0].dashboard_data.date_max_temp) }}</li>
                <li>Temperature min: {{ device.modules[0].dashboard_data.min_temp }}°C le {{ getDate(device.modules[0].dashboard_data.date_min_temp) }}</li>
                <li>Trend: {{ device.modules[0].dashboard_data.temp_trend }}</li>
    </ul>
            <h2>Module</h2>
            <ul>
                <li>Battery: {{ device.modules[0].battery_percent }} %</li>
                <li>RF status: {{ device.modules[0].rf_status }}</li>
                <li>Firmware: {{ device.modules[0].firmware }}</li>
                <li>Last message: {{ getDate(device.modules[0].last_message) }}</li>
                <li>Last seen: {{ getDate(device.modules[0].last_seen) }}</li>
                <li>Last setup: {{ getDate(device.modules[0].last_setup) }}</li>
    </ul>
    </div>
    </modal>
    </div>
</template>

<script>
    import icon from '../../assets/thermometer.png'
    import Modal from '../ModalComponent.vue'
    import moment from 'moment'
    export default {
        components: { Modal },
        props: {
            device: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                icon: icon,
                isDead: false,
                modalShow: false,
            }
        },
        methods: {
            getDate(val) {
                return moment.unix(val).format('DD.MM.YYYY HH:mm:ss')  
            },
            onClose() {
                this.modalShow = false  
            },
        },
    }
</script>

<style lang="sass" scoped>
@import '../../sass/components/netatmo-device'
</style>