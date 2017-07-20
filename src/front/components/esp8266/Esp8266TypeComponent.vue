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
import humidity from '../../assets/humidity.png'
import pressure from '../../assets/pressure.png'
import dimmer from '../../assets/dimmer.png'
import luminosity from '../../assets/luminosity.png'
import gas from '../../assets/gas.png'
import rgbw from '../../assets/led_strip.png'
import Esp8266Switch from './Esp8266SwitchComponent.vue'
import Esp8266Motion from './Esp8266MotionComponent.vue'
import UUID from '../../mixins/uuid'
import moment from 'moment'
export default {
    name: 'Esp8266Type',
    components: { Esp8266Switch, Esp8266Motion, },
    props: {
        device: {
            type: Object,
            required: true,
        },
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
    computed: {
        socket() {
            return this.$store.getters.socket
        },
    },
    created() {
        this.uuid = UUID.getOne()

        this.getData(this.device)
        //this.checkHealth(this.device)
        //this.ping()
        // this.socket.on('device.update.result', device => {
        //     if (device.id === this.device.id) {
        //         this.getData(device)
        //         this.checkHealth(device)
        //     }
        // })
    },
    methods: {
        ping() {
            this.socket.emit('mqtt.publish', { topic: '/action/', message: { mac: this.device.mac, action: 'PING' } })
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
            this.socket.emit('mqtt.publish', { topic: '/action/', message: { mac: this.device.mac, action: 'STATE' } })
        },
        getType(device) {
            this.socket.emit('mqtt.publish', { topic: '/action/', message: { mac: this.device.mac, action: 'TYPE' } })
        },
        getIp(device) {
            this.socket.emit('mqtt.publish', { topic: '/action/', message: { mac: this.device.mac, action: 'IP' } })
        },
        restart(device) {
            this.socket.emit('mqtt.publish', { topic: '/action/', message: { mac: this.device.mac, action: 'RESTART' } })
        },
        getData(device) {
            this.socket.emit('message.getAll', { deviceId: this.device.id, limit: 1, offset: 0, type: 'data', uuid: this.uuid })
            this.socket.on('message.getAll.result.' + this.uuid, messages => {
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