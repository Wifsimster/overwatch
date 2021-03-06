<template>
    <div>
        <transition name="opacity">
            <div v-if="device" @click="modalShow = true" class="switch">
                <div class="image">
                    <img :src="icon">
                </div>
                <span class="data" v-if="state === true">On</span>
                <span class="data" v-if="state === false">Off</span>
                <span class="name">{{ device.name }}</span>
                <span class="location" v-if="device.location">{{ device.location.name }}</span>
            </div>
        </transition>
    
        <modal v-if="modalShow" @close="onClose">
            <div slot="header">{{ device.name }}</div>
            <div slot="body">
                <div class="alert error">{{ error }}</div>
                <switchy :row="state" @switch="onState"></switchy>
                <ul>
                    <li>Id: {{ device.id }}</li>
                    <li>MAC: {{ device.mac }}</li>
                    <li>IP: {{ device.ip }}</li>
                    <li>Created at: {{ device.createdAt | moment('DD.MM.YYYY HH:mm:ss') }}</li>
                    <li>Updated at: {{ device.updatedAt | moment('DD.MM.YYYY HH:mm:ss') }}</li>
                    <li>Location: {{ device.location.name }}</li>
                    <li>Types:
                        <span v-for="type in device.types" :key="type.id">{{ type.name }}, </span>
                    </li>
                    <li>State: {{ state }}</li>
                </ul>
                <a @click="ping">Ping device</a> |
                <a @click="restart">Restart device</a> |
                <a @click="getOnline">Get online</a>
            </div>
        </modal>
    </div>
</template>

<script>
import icon from '../../assets/switch.svg'
const Switchy = () => import('../SwitchComponent.vue')
import moment from 'moment'
const Modal = () => import('../ModalComponent.vue')
import Vue from 'vue'
export default {
    name: 'Esp8266Switch',
    components: { 
        Switchy, 
        Modal
    },
    props: {
        id: {
            type: Number,
            required: true,
        }
    },
    computed: {
        ws() {
            return this.$store.getters.ws
        }
    },
    data() {
        return {
            error: null,
            device: null,
            uuid: null,
            icon: icon,
            isDead: false,
            modalShow: false,
            state: false,
        }
    },
    created() {
        this.uuid = Vue.getUUID()

        this.ws.emit('device.getOne', { uuid: this.uuid, id: this.id })

        this.ws.on('device.getOne.result.' + this.uuid, device => {
            this.device = device
            this.getState()
        })

        this.ws.on('device.update.result', device => {
            if (device.id === this.device.id) {
                Object.assign(this.device, device)
            }
        })

        this.ws.on('message.getAll.result.' + this.uuid, messages => {
            if (messages && messages.length > 0) {
                let state = JSON.parse(messages[0].data).state
                if (state) {
                    this.state = state === "1" ? true : false
                }
            }
        })
    },
    methods: {
        getState() {
            this.ws.emit('message.getAll', {
                uuid: this.uuid,
                deviceId: this.id,
                limit: 1,
                offset: 0,
                type: 'data'
            })
        },
        onClose() {
            this.modalShow = false
        },
        onState(val) {
            this.state = val
            let value = val ? 'ON' : 'OFF'
            this.ws.emit('mqtt.publish', { topic: '/action/', message: { mac: this.device.mac, action: value } })
        },
        ping() {
            console.log('Ping', this.device.name)
            this.ws.emit('mqtt.publish', { topic: '/action/', message: { mac: this.device.mac, action: 'PING' } })
        },
        checkHealth() {
            console.log('Check health', this.device.name)
            if (moment().diff(this.device.updatedAt, 'minutes') > 2) {
                this.isDead = true
            } else {
                this.isDead = false
            }
        },
        getType() {
            console.log('Get type')
            this.ws.emit('mqtt.publish', { topic: '/action/', message: { mac: this.device.mac, action: 'TYPE' } })
        },
        getName() {
            console.log('Get name')
            this.ws.emit('mqtt.publish', { topic: '/action/', message: { mac: this.device.mac, action: 'NAME' } })
        },
        getIp() {
            console.log('Get IP')
            this.ws.emit('mqtt.publish', { topic: '/action/', message: { mac: this.device.mac, action: 'IP' } })
        },
        getOnline() {
            console.log('Get online')
            this.ws.emit('mqtt.publish', { topic: '/action/', message: { mac: this.device.mac, action: 'ONLINE' } })
        },
        restart() {
            console.log('Restart device')
            this.ws.emit('mqtt.publish', { topic: '/action/', message: { mac: this.device.mac, action: 'RESET' } })
        },
    },
}
</script>

<style lang="scss" scoped>
@import '../../sass/components/esp8266-switch';
</style>