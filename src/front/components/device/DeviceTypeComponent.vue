<template>
<div v-if="device && data" class="device" :class="{ 'red': isDead }">
    <div v-if="device.type.name === 'Temperature'">
        <div class="image"><img :src="icons.temperature"></div>
        <span class="data">{{ data.temperature }}°C</span>
        <span class="name">{{ device.name }}</span>
        <span class="location" v-if="device.location">{{ device.location.name }}</span>
        <span class="date">{{ lastSeen | moment('HH:mm') }}</span>
    </div>

    <div v-if="device.type.name === 'Humidity'">
        <div class="image"><img :src="icons.humidity"></div>
        <span class="data">{{ data.humidity }}%</span>
        <span class="name">{{ device.name }}</span>
        <span class="location" v-if="device.location">{{ device.location.name }}</span>
        <span class="date">{{ lastSeen | moment('HH:mm') }}</span>
    </div>

    <div v-if="device.type.key == 'luminosity'">
        <div class="image"><img :src="icons.luminosity"></div>
        <span class="data">{{ data.luminosity }}LUX</span>
        <span class="name">{{ device.name }}</span>
        <span class="location" v-if="device.location">{{ device.location.name }}</span>
        <span class="date">{{ lastSeen | moment('HH:mm') }}</span>
    </div>
    <div v-if="device.type.key == 'pressure'">
        <div class="image"><img :src="icons.pressure"></div>
        <span class="data">{{ data.pressure }}mB</span>
        <span class="name">{{ device.name }}</span>
        <span class="location" v-if="device.location">{{ device.location.name }}</span>
        <span class="date">{{ lastSeen | moment('HH:mm') }}</span>
    </div>
    <div v-if="device.type.key == 'motion'">
        <div class="image"><img :src="icons.switch"></div>    
        <span class="data">{{ data.state }}</span>
        <span class="name">{{ device.name }}</span>
        <span class="location" v-if="device.location">{{ device.location.name }}</span>
        <span class="date">{{ lastSeen | moment('HH:mm') }}</span>
    </div>
    <div v-if="device.type.key == 'dimmer'">
        <div class="image"><img :src="icons.dimmer"></div>
        <span class="data">{{ data.dimmer }}</span>
        <span class="name">{{ device.name }}</span>
        <span class="location" v-if="device.location">{{ device.location.name }}</span>
        <span class="date">{{ lastSeen | moment('HH:mm') }}</span>
    </div>
    <div v-if="device.type.key == 'gas'">
        <div class="image"><img :src="icons.gas"></div>
        <span class="data">{{ data.gas }}ppm</span>
        <span class="name">{{ device.name }}</span>
        <span class="location" v-if="device.location">{{ device.location.name }}</span>
        <span class="date">{{ lastSeen | moment('HH:mm') }}</span>
    </div>
    <div v-if="device.type.key == 'water'">
        <div class="image"><img :src="icons.water"></div>
        <span class="data">{{ data.water }}</span>
        <span class="name">{{ device.name }}</span>
        <span class="location" v-if="device.location">{{ device.location.name }}</span>
        <span class="date">{{ lastSeen | moment('HH:mm') }}</span>
    </div>
    <div v-if="device.type.key == 'rgbw'">
        <div class="image"><img :src="icons.rgbw"></div>
        <span class="data">{{ data.rgbw }}</span>
        <span class="name">{{ device.name }}</span>
        <span class="location" v-if="device.location">{{ device.location.name }}</span>
        <span class="date">{{ lastSeen | moment('HH:mm') }}</span>
    </div>
    <div v-if="device.type.key == 'switch'">
        <div class="image"><img :src="icons.switch"></div>    
        <span class="data">{{ data.state }}</span>
        <span class="name">{{ device.name }}</span>
        <switche :state=state v-on:switch="changeState"></switche>
        <span class="location" v-if="device.location">{{ device.location.name }}</span>
        <span class="date">{{ lastSeen | moment('HH:mm') }}</span>
    </div>
    </div>
</template>

<script>
    import thermometer from '../../assets/thermometer.png'
    import humidity from '../../assets/humidity.png'
    import pressure from '../../assets/pressure.png'
    import _switch from '../../assets/switch.png'
    import dimmer from '../../assets/dimmer.png'
    import luminosity from '../../assets/luminosity.png'
    import gas from '../../assets/gas.png'
    import rgbw from '../../assets/led_strip.png'
    import moment from 'moment'
    import Switche from '../SwitchComponent.vue'
    export default {
        components: { Switche },
        props: { device: Object },
        data() {
            return {                
                socket: this.$store.state.socket.socket,
                data: {},
                icons: { 
                    temperature: thermometer, 
                    humidity: humidity,
                    pressure: pressure,
                    switch: _switch,
                    dimmer: dimmer,
                    luminosity: luminosity,
                    gas: gas,
                    rgbw: rgbw,
                },
                state: false,
                lastSeen: null,
                isDead: false,
            }
        },
        created() {
            if(this.device.messages && this.device.messages.length > 0) {
                this.getData()
            }
        },
        methods: {
            changeState(val) {
                this.state = val
                let stateValue = this.state ? 1 : 0
                let options = {
                    topic: '/sensors/relay/',
                    message: `{"mac":"${this.device.mac}", "state":"${stateValue}"}`
                }
                this.socket.emit('mqtt.publish', options)
            },
            getData() {
                this.device.messages.sort((a, b) => {
                    return new Date(a.createdAt) - new Date(b.createdAt)
                })
                this.data = JSON.parse(this.device.messages[this.device.messages.length - 1].data)
                this.lastSeen = this.device.messages[this.device.messages.length - 1].createdAt
                if(moment().diff(this.lastSeen, 'days') > 0) { this.isDead = true }
            },
        },
        watch: {
            device() {
                this.device.messages.sort((a, b) => {
                    return new Date(a.createdAt) - new Date(b.createdAt)
                })

                this.data = JSON.parse(this.device.messages[this.device.messages.length - 1].data)

                this.lastSeen = this.device.messages[this.device.messages.length - 1].createdAt

                if(moment().diff(this.lastSeen, 'days') > 0) { this.isDead = true }
            }
        },
    }
</script>

<style lang="sass" scoped>
</style>