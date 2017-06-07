<template>
<div class="device" :class="{ 'red': isDead }">

    <div v-if="device.type && device.type.key === 'temperature'">
        <div class="image"><img :src="icons.temperature"></div>
        <span class="data">{{ data.temperature }}°C</span>
        <span class="name">{{ device.name }}</span>
        <span class="location" v-if="device.location">{{ device.location.name }}</span>
        <span class="date" v-if="lastSeen">{{ lastSeen | moment('HH:mm') }}</span>
    </div>

    <div v-if="device.type && device.type.key === 'humidity'">
        <div class="image"><img :src="icons.humidity"></div>
        <span class="data">{{ data.humidity }}%</span>
        <span class="name">{{ device.name }}</span>
        <span class="location" v-if="device.location">{{ device.location.name }}</span>
        <span class="date" v-if="lastSeen">{{ lastSeen | moment('HH:mm') }}</span>
    </div>

    <div v-if="device.type && device.type.key == 'luminosity'">
        <div class="image"><img :src="icons.luminosity"></div>
        <span class="data">{{ data.luminosity }}LUX</span>
        <span class="name">{{ device.name }}</span>
        <span class="location" v-if="device.location">{{ device.location.name }}</span>
        <span class="date" v-if="lastSeen">{{ lastSeen | moment('HH:mm') }}</span>
    </div>

    <div v-if="device.type && device.type.key == 'pressure'">
        <div class="image"><img :src="icons.pressure"></div>
        <span class="data">{{ data.pressure }}mB</span>
        <span class="name">{{ device.name }}</span>
        <span class="location" v-if="device.location">{{ device.location.name }}</span>
        <span class="date" v-if="lastSeen">{{ lastSeen | moment('HH:mm') }}</span>
    </div>

    <div v-if="device.type && device.type.key == 'motion'">
        <div class="image"><img :src="icons.switch"></div>    
        <span class="data">{{ data.state }}</span>
        <span class="name">{{ device.name }}</span>
        <span class="location" v-if="device.location">{{ device.location.name }}</span>
        <span class="date" v-if="lastSeen">{{ lastSeen | moment('HH:mm') }}</span>
    </div>

    <div v-if="device.type && device.type.key == 'dimmer'">
        <div class="image"><img :src="icons.dimmer"></div>
        <span class="data">{{ data.dimmer }}</span>
        <span class="name">{{ device.name }}</span>
        <span class="location" v-if="device.location">{{ device.location.name }}</span>
        <span class="date">{{ lastSeen | moment('HH:mm') }}</span>
    </div>

    <div v-if="device.type && device.type.key == 'gas'">
        <div class="image"><img :src="icons.gas"></div>
        <span class="data">{{ data.gas }}ppm</span>
        <span class="name">{{ device.name }}</span>
        <span class="location" v-if="device.location">{{ device.location.name }}</span>
        <span class="date" v-if="lastSeen">{{ lastSeen | moment('HH:mm') }}</span>
    </div>

    <div v-if="device.type && device.type.key == 'water'">
        <div class="image"><img :src="icons.water"></div>
        <span class="data">{{ data.water }}</span>
        <span class="name">{{ device.name }}</span>
        <span class="location" v-if="device.location">{{ device.location.name }}</span>
        <span class="date" v-if="lastSeen">{{ lastSeen | moment('HH:mm') }}</span>
    </div>

    <div v-if="device.type && device.type.key == 'rgbw'">
        <div class="image"><img :src="icons.rgbw"></div>
        <span class="data">{{ data.rgbw }}</span>
        <span class="name">{{ device.name }}</span>
        <span class="location" v-if="device.location">{{ device.location.name }}</span>
        <span class="date" v-if="lastSeen">{{ lastSeen | moment('HH:mm') }}</span>
    </div>

    <div v-if="device.type && device.type.key == 'switch'">
        <esp8266-switch :device="device"></esp8266-switch>
    </div>

    <div v-if="device.type === null">
        <span class="name" v-if="device.name">{{ device.name }}</span>
        <span class="name" v-else>Unknow</span>.
        <span class="date" v-if="lastSeen">{{ lastSeen | moment('HH:mm') }}</span>
    </div>

    </div>
</template>

<script>
    import thermometer from '../../assets/thermometer.png'
    import humidity from '../../assets/humidity.png'
    import pressure from '../../assets/pressure.png'
    import dimmer from '../../assets/dimmer.png'
    import luminosity from '../../assets/luminosity.png'
    import gas from '../../assets/gas.png'
    import rgbw from '../../assets/led_strip.png'
    import Esp8266Switch from './Esp8266SwitchComponent.vue'
    import moment from 'moment'
    export default {
        name: 'Esp8266Type',
        components: { Esp8266Switch },
        props: { 
            device: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                data: {},
                icons: {
                    temperature: thermometer, 
                    humidity: humidity,
                    pressure: pressure,
                    dimmer: dimmer,
                    luminosity: luminosity,
                    gas: gas,
                    rgbw: rgbw,
                },
                lastSeen: null,
                isDead: false,
            }
        },
        computed: {
            socket() {
                return this.$store.getters.socket
            },
        },
        created() {
            this.getData(this.device)
            this.checkHealth(this.device)
            this.ping()
            this.socket.on('device.update.result', device => {
                if(device.id === this.device.id) {
                    this.getData(device)
                    this.checkHealth(device)
                }
            })
        },
        methods: {
            ping() {
                this.socket.emit('mqtt.publish', { topic: '/action/', message: { mac: this.device.mac, action: 'PING' }})
            },
            checkHealth(device) {
                this.lastSeen = device.updatedAt
                if(moment().diff(this.lastSeen, 'minutes') > 2) { 
                    this.isDead = true 
                } else {
                    this.isDead = false
                }
            },
            getState(device) {
                this.socket.emit('mqtt.publish', { topic: '/action/', message: { mac: this.device.mac, action: 'STATE' }})
            },
            getType(device) {
                this.socket.emit('mqtt.publish', { topic: '/action/', message: { mac: this.device.mac, action: 'TYPE' }})
            },
            getIp(device) {
                this.socket.emit('mqtt.publish', { topic: '/action/', message: { mac: this.device.mac, action: 'IP' }})
            },
            restart(device) {
                this.socket.emit('mqtt.publish', { topic: '/action/', message: { mac: this.device.mac, action: 'RESTART' }})
            },
            getData(device) {
                this.socket.emit('message.getAll', { deviceId: this.device.id, limit: 1, offset: 0, type: 'data' })
                this.socket.on('message.getAll.result', messages => {
                    if(messages && messages.length > 0) {
                        this.data = JSON.parse(messages[0].data)
                    } else {
                        this.getState(device)
                    }
                })
            },
        },
    }
</script>

<style lang="sass" scoped></style>