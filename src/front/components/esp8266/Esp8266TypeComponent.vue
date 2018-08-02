<template>
    <div>
    
        <div v-if="device.type && device.type.key === 'temperature'" class="device" :class="{ 'red': isDead }">
            <esp8266-temperature :id="device.id"></esp8266-temperature>
        </div>
    
        <div v-if="device.type && device.type.key === 'humidity'" class="device" :class="{ 'red': isDead }">
            <div class="image">
                <img :src="icons.humidity">
            </div>
            <span class="data">{{ data.humidity }}%</span>
            <span class="name">{{ device.name }}</span>
            <span class="location" v-if="device.location">{{ device.location.name }}</span>
            <span class="date" v-if="lastSeen">{{ lastSeen | moment('HH:mm') }}</span>
        </div>
    
        <div v-if="device.type && device.type.key == 'luminosity'" class="device" :class="{ 'red': isDead }">
            <div class="image">
                <img :src="icons.luminosity">
            </div>
            <span class="data">{{ data.luminosity }}LUX</span>
            <span class="name">{{ device.name }}</span>
            <span class="location" v-if="device.location">{{ device.location.name }}</span>
            <span class="date" v-if="lastSeen">{{ lastSeen | moment('HH:mm') }}</span>
        </div>
    
        <div v-if="device.type && device.type.key == 'pressure'" class="device" :class="{ 'red': isDead }">
            <div class="image">
                <img :src="icons.pressure">
            </div>
            <span class="data">{{ data.pressure }}mB</span>
            <span class="name">{{ device.name }}</span>
            <span class="location" v-if="device.location">{{ device.location.name }}</span>
            <span class="date" v-if="lastSeen">{{ lastSeen | moment('HH:mm') }}</span>
        </div>
    
        <div v-if="device.type && device.type.key == 'dimmer'" class="device" :class="{ 'red': isDead }">
            <div class="image">
                <img :src="icons.dimmer">
            </div>
            <span class="data">{{ data.dimmer }}</span>
            <span class="name">{{ device.name }}</span>
            <span class="location" v-if="device.location">{{ device.location.name }}</span>
            <span class="date">{{ lastSeen | moment('HH:mm') }}</span>
        </div>
    
        <div v-if="device.type && device.type.key == 'gas'" class="device" :class="{ 'red': isDead }">
            <div class="image">
                <img :src="icons.gas">
            </div>
            <span class="data">{{ data.gas }}ppm</span>
            <span class="name">{{ device.name }}</span>
            <span class="location" v-if="device.location">{{ device.location.name }}</span>
            <span class="date" v-if="lastSeen">{{ lastSeen | moment('HH:mm') }}</span>
        </div>
    
        <div v-if="device.type && device.type.key == 'water'" class="device" :class="{ 'red': isDead }">
            <div class="image">
                <img :src="icons.water">
            </div>
            <span class="data">{{ data.water }}</span>
            <span class="name">{{ device.name }}</span>
            <span class="location" v-if="device.location">{{ device.location.name }}</span>
            <span class="date" v-if="lastSeen">{{ lastSeen | moment('HH:mm') }}</span>
        </div>
    
        <div v-if="device.type && device.type.key == 'rgbw'" class="device" :class="{ 'red': isDead }">
            <div class="image">
                <img :src="icons.rgbw">
            </div>
            <span class="data">{{ data.rgbw }}</span>
            <span class="name">{{ device.name }}</span>
            <span class="location" v-if="device.location">{{ device.location.name }}</span>
            <span class="date" v-if="lastSeen">{{ lastSeen | moment('HH:mm') }}</span>
        </div>
    
        <div v-if="device.type && device.type.key == 'motion'">
            <esp8266-motion :id="device.id"></esp8266-motion>
        </div>
    
        <div v-if="device.type && device.type.key == 'switch'">
            <esp8266-switch :id="device.id"></esp8266-switch>
        </div>
    
        <div v-if="device.type === null">
            <span class="name" v-if="device.name">{{ device.name }}</span>
            <span class="name" v-else>Unknow</span>.
            <span class="date" v-if="lastSeen">{{ lastSeen | moment('HH:mm') }}</span>
        </div>
    
    </div>
</template>

<script>
import humidity from '../../assets/humidity.svg'
import pressure from '../../assets/pressure.svg'
import dimmer from '../../assets/dimmer.svg'
import luminosity from '../../assets/luminosity.svg'
import gas from '../../assets/gas.svg'
import rgbw from '../../assets/led_strip.svg'
const Esp8266Switch = () => import('./Esp8266SwitchComponent.vue')
const Esp8266Motion = () => import('./Esp8266MotionComponent.vue')
import Vue from 'vue'
import moment from 'moment'
export default {
    name: 'Esp8266Type',
    components: { 
        Esp8266Switch, 
        Esp8266Motion
    },
    props: {
        device: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ws() {
            return this.$store.getters.ws
        }
    },
    data() {
        return {
            uuid: null,
            data: {},
            icons: {
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
    created() {
        this.uuid = Vue.getUUID()

        this.getData(this.device)
        //this.checkHealth(this.device)
        //this.ping()
        // this.ws.on('device.update.result', device => {
        //     if (device.id === this.device.id) {
        //         this.getData(device)
        //         this.checkHealth(device)
        //     }
        // })
    },
    methods: {
        ping() {
            this.ws.emit('mqtt.publish', { topic: '/action/', message: { mac: this.device.mac, action: 'PING' } })
        },
        checkHealth(device) {
            this.lastSeen = device.updatedAt
            if (moment().diff(this.lastSeen, 'minutes') > 2) {
                this.isDead = true
            } else {
                this.isDead = false
            }
        },
        getState(device) {
            this.ws.emit('mqtt.publish', { topic: '/action/', message: { mac: this.device.mac, action: 'STATE' } })
        },
        getType(device) {
            this.ws.emit('mqtt.publish', { topic: '/action/', message: { mac: this.device.mac, action: 'TYPE' } })
        },
        getIp(device) {
            this.ws.emit('mqtt.publish', { topic: '/action/', message: { mac: this.device.mac, action: 'IP' } })
        },
        restart(device) {
            this.ws.emit('mqtt.publish', { topic: '/action/', message: { mac: this.device.mac, action: 'RESTART' } })
        },
        getData(device) {
            this.ws.emit('message.getAll', { deviceId: this.device.id, limit: 1, offset: 0, type: 'data', uuid: this.uuid })
            this.ws.on('message.getAll.result.' + this.uuid, messages => {
                if (messages && messages.length > 0) {
                    this.data = JSON.parse(messages[0].data)
                } else {
                    this.getState(device)
                }
            })
        },
    },
}
</script>