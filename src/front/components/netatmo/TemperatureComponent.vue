<template>
    <div>
        <transition name="opacity">
            <div v-if="device" @click="modalShow = true" class="netatmo-device">
                <div class="image">
                    <img :src="icon">
                </div>
                <span class="data" v-if="device.dashboard_data">{{ device.dashboard_data.Temperature }}°C</span>
                <span class="name">{{ device.station_name }}</span>
                <span class="location">{{ device.module_name }}</span>
            </div>
        </transition>
    
        <modal v-if="modalShow" @close="onClose">
            <div slot="header">{{ device.station_name }} - {{ device.module_name }}</div>
            <div slot="body">
                <h2>Temperatures</h2>
                <ul>
                    <li>Temperature: {{ device.dashboard_data.Temperature }}°C le {{ getDate(device.dashboard_data.time_utc) }}</li>
                    <li>Temperature max: {{ device.dashboard_data.max_temp }}°C le {{ getDate(device.dashboard_data.date_max_temp) }}</li>
                    <li>Temperature min: {{ device.dashboard_data.min_temp }}°C le {{ getDate(device.dashboard_data.date_min_temp) }}</li>
                    <li>Trend: {{ device.dashboard_data.temp_trend }}</li>
                </ul>
                <h2>Station</h2>
                <ul>
                    <li>Firmware: {{ device.firmware }}</li>
                    <li>Wifi status: {{ device.wifi_status }}</li>
                    <li>Location: {{ device.place.city }}, {{ device.place.country }}</li>
                    <li>Altitude: {{ device.place.altitude }}</li>
                    <li>Last status: {{ getDate(device.last_status_store) }}</li>
                    <li>Last upgrade: {{ getDate(device.last_upgrade) }}</li>
                    <li>Last setup: {{ getDate(device.last_setup) }}</li>
                    <li>Date setup: {{ getDate(device.date_setup) }}</li>
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

<style lang="scss" scoped>
@import '../../sass/components/netatmo-device'
</style>