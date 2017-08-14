<template>
    <div>
        <transition name="opacity">
            <div v-if="device" @click="modalShow = true" class="switch">
                <div class="image">
                    <img :src="icon">
                </div>
                <span class="data" v-if="device.state === true">On</span>
                <span class="data" v-if="device.state === false">Off</span>
                <span class="name">{{ device.name }}</span>
                <span class="location" v-if="device.location">{{ device.location.name }}</span>
            </div>
        </transition>
    
        <modal v-if="modalShow" @close="onClose">
            <div slot="header">{{ device.name }}</div>
            <div slot="body">
                <switchy v-if="device.state !== undefined" :state=device.state @switch="onState"></switchy>
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
                    <li>State: {{ device.state }}</li>
                </ul>
                <a @click="ping">Ping device</a> |
                <a @click="restart">Restart device</a> |
                <a @click="getOnline">Get online</a>
            </div>
        </modal>
    </div>
</template>

<script>
import icon from '../../assets/switch.png'
import Switchy from '../SwitchComponent.vue'
import moment from 'moment'
import Modal from '../ModalComponent.vue'
import UUID from '../../mixins/uuid'
export default {
    name: 'Esp8266Switch',
    components: { Switchy, Modal },
    props: {
        id: {
            type: Number,
            required: true,
        }
    },
    data() {
        return {
            device: null,
            uuid: null,
            icon: icon,
            isDead: false,
            modalShow: false,
        }
    },
    computed: {
        socket() {
            return this.$store.getters.socket
        },
    },
    created() {
        this.uuid = UUID.getOne()

        this.socket.emit('device.getOne', { uuid: this.uuid, id: this.id })

        this.socket.on('device.getOne.result.' + this.uuid, device => {
            this.device = device
            this.getState().then(state => {
                device.state = state
                this.device = device
            }).catch(err => {
                console.error(err)
            })
        })

        this.socket.on('device.update.result', device => {
            if (device.id === this.device.id) {
                Object.assign(this.device, device)
            }
        })
    },
    methods: {
        getState() {
            return new Promise((resolve, reject) => {
                this.socket.emit('message.getAll', {
                    uuid: this.uuid,
                    deviceId: this.id,
                    limit: 1,
                    offset: 0,
                    type: 'data'
                })

                this.socket.on('message.getAll.result.' + this.uuid, messages => {
                    if (messages && messages.length > 0) {
                        let state = JSON.parse(messages[0].data).state
                        if (state) {
                            resolve(state === "1" ? true : false)
                        } else {
                            resolve()
                        }
                    } else {
                        resolve()
                    }
                })
            })
        },
        onClose() {
            this.modalShow = false
        },
        onState(val) {
            this.device.state = val
            let value = val ? 'ON' : 'OFF'
            this.socket.emit('mqtt.publish', { topic: '/action/', message: { mac: this.device.mac, action: value } })
        },
        ping() {
            console.log('Ping', this.device.name)
            this.socket.emit('mqtt.publish', { topic: '/action/', message: { mac: this.device.mac, action: 'PING' } })
        },
        checkHealth() {
            if (moment().diff(this.device.updatedAt, 'minutes') > 2) {
                this.isDead = true
            } else {
                this.isDead = false
            }
        },
        getType() {
            console.log('Get type')
            this.socket.emit('mqtt.publish', { topic: '/action/', message: { mac: this.device.mac, action: 'TYPE' } })
        },
        getName() {
            console.log('Get name')
            this.socket.emit('mqtt.publish', { topic: '/action/', message: { mac: this.device.mac, action: 'NAME' } })
        },
        getIp() {
            console.log('Get IP')
            this.socket.emit('mqtt.publish', { topic: '/action/', message: { mac: this.device.mac, action: 'IP' } })
        },
        getOnline() {
            console.log('Get online')
            this.socket.emit('mqtt.publish', { topic: '/action/', message: { mac: this.device.mac, action: 'ONLINE' } })
        },
        restart() {
            console.log('Restart device')
            this.socket.emit('mqtt.publish', { topic: '/action/', message: { mac: this.device.mac, action: 'RESET' } })
        },
        // getState() {
        //     console.log('Get state')
        //     this.socket.emit('mqtt.publish', { topic: '/action/', message: { mac: this.device.mac, action: 'STATE' } })
        //     this.parseLastDataMessage()
        // },
    },
    // watch: {
    //     device() {
    //         this.getState().then(data => {
    //             this.device.state = data
    //         }).catch(err => {
    //             console.error('- State :', err)
    //         })
    //     }
    // },
}
</script>

<style lang="scss" scoped>
@import '../../sass/components/esp8266-switch'
</style>