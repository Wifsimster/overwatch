<template>
<div v-if="device" class="device" :class="{ 'red': isDead }">
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

    <div v-if="device.type.name == 'Luminosity'">
        <div class="image"><img :src="icons.luminosity"></div>
        <span class="data">{{ data.luminosity }}LUX</span>
        <span class="name">{{ device.name }}</span>
        <span class="location" v-if="device.location">{{ device.location.name }}</span>
        <span class="date">{{ lastSeen | moment('HH:mm') }}</span>
    </div>
    <div v-if="device.type.name == 'Pressure'">
        <div class="image"><img :src="icons.pressure"></div>
        <span class="data">{{ data.pressure }}mB</span>
        <span class="name">{{ device.name }}</span>
        <span class="location" v-if="device.location">{{ device.location.name }}</span>
        <span class="date">{{ lastSeen | moment('HH:mm') }}</span>
    </div>
    <div v-if="device.type.name == 'Switch'">
        <div class="image"><img :src="icons.switch"></div>    
        <span class="data">{{ data.state }}</span>
        <span class="name">{{ device.name }}</span>
        <span class="location" v-if="device.location">{{ device.location.name }}</span>
        <span class="date">{{ lastSeen | moment('HH:mm') }}</span>
    </div>
    <div v-if="device.type.name == 'Dimmer'">
        <div class="image"><img :src="icons.dimmer"></div>
        <span class="data">{{ data.dimmer }}</span>
        <span class="name">{{ device.name }}</span>
        <span class="location" v-if="device.location">{{ device.location.name }}</span>
        <span class="date">{{ lastSeen | moment('HH:mm') }}</span>
    </div>
    <div v-if="device.type.name == 'Gas'">
        <div class="image"><img :src="icons.gas"></div>
        <span class="data">{{ data.gas }}ppm</span>
        <span class="name">{{ device.name }}</span>
        <span class="location" v-if="device.location">{{ device.location.name }}</span>
        <span class="date">{{ lastSeen | moment('HH:mm') }}</span>
    </div>
    <div v-if="device.type.name == 'Water'">
        <div class="image"><img :src="icons.water"></div>
        <span class="data">{{ data.water }}</span>
        <span class="name">{{ device.name }}</span>
        <span class="location" v-if="device.location">{{ device.location.name }}</span>
        <span class="date">{{ lastSeen | moment('HH:mm') }}</span>
    </div>
    <div v-if="device.type.name == 'RGBW'">
        <div class="image"><img :src="icons.rgbw"></div>
        <span class="data">{{ data.rgbw }}</span>
        <span class="name">{{ device.name }}</span>
        <span class="location" v-if="device.location">{{ device.location.name }}</span>
        <span class="date">{{ lastSeen | moment('HH:mm') }}</span>
    </div>
    </div>
</template>

<script>
    import thermometer from '../assets/thermometer.png'
    import humidity from '../assets/humidity.png'
    import pressure from '../assets/pressure.png'
    import _switch from '../assets/switch.png'
    import dimmer from '../assets/dimmer.png'
    import luminosity from '../assets/luminosity.png'
    import gas from '../assets/gas.png'
    import rgbw from '../assets/led_strip.png'
    import moment from 'moment'

    export default {
        props: {
            device: Object,
        },
        data() {
            return {
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
                lastSeen: null,
                isDead: false,
            }
        },
        created() {
            if(this.device.messages && this.device.messages.length > 0) {

                this.device.messages.sort((a, b) => {
                    return new Date(a.createdAt) - new Date(b.createdAt)
                })

                this.data = JSON.parse(this.device.messages[this.device.messages.length - 1].data)

                this.lastSeen = this.device.messages[this.device.messages.length - 1].createdAt
                
                if(moment().diff(this.lastSeen, 'days') > 0) { this.isDead = true }
            }
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
@import '../sass/_device.scss';
</style>