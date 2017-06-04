<template>
<transition name="opacity" tag="div">
    <div v-if="device">
        <div class="image"><img :src="icon"></div>    
        <span class="data">{{ data.state }}</span>
        <span class="name">{{ device.name }}</span>
        <switche :state=state v-on:switch="changeState"></switche>
        <span class="location" v-if="device.location">{{ device.location.name }}</span>
        <span class="date" v-if="lastSeen">{{ lastSeen | moment('HH:mm:ss') }}</span>
    </div>
    </transition>
</template>

<script>
    import icon from '../../assets/switch.png'
    import Switche from '../SwitchComponent.vue'
    import moment from 'moment'
    export default {
        name: 'Esp8266Switch',
        components: { Switche },
        props: {
            device: {
                type: Object,
                required: true,
            }
        },
        data() {
            return {
                icon: icon,
                lastSeen: null,
                isDead: false,
                state: false,
                data: {},
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
            changeState(val) {
                this.state = val
                let value = this.state ? 'ON' : 'OFF'
                this.socket.emit('mqtt.publish', { topic: '/action/', message: { mac: this.device.mac, action: value }})
            },
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