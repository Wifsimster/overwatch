<template>
    <div>
        <transition name="opacity">
            <div v-if="device" @click="modalShow = true" class="switch">
                <div class="image">
                    <img :src="icon">
                </div>
                <span class="data" v-if="device.state !== null">{{ device.state }}</span>
                <span class="name">{{ device.name }}</span>
                <span class="location" v-if="device.location">{{ device.location.name }}</span>
            </div>
        </transition>
    
        <div class="image">
            <img :src="icon">
        </div>
        <span class="data">{{ data.temperature }}°C</span>
        <span class="name">{{ device.name }}</span>
        <span class="location" v-if="device.location">{{ device.location.name }}</span>
        <span class="date" v-if="lastSeen">{{ lastSeen | moment('HH:mm') }}</span>
    </div>
</template>

<script>
import icon from '../../assets/thermometer.svg'
export default {
    components: { 
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
            device: null,
            icon: icon,
            isDead: false,
            modalShow: false,
        }
    },
    created() {
        this.ws.emit('device.getOne', this.id)
        this.ws.on('device.getOne.result', device => {
            if (device.id === this.id) {
                this.device = device
                this.parseLastDataMessage()
            }
        })

        this.ws.on('device.update.result', device => {
            if (device.id === this.id) {
                Object.assign(this.device, device)
                this.parseLastDataMessage()
            }
        })
    },
    methods: {
        onClose() {
            this.modalShow = false
        },
        parseLastDataMessage() {
            this.ws.emit('message.getAll', {
                deviceId: this.id,
                limit: 1,
                offset: 0,
                type: 'data'
            })
            this.ws.on('message.getAll.result', messages => {
                if (messages && messages.length > 0) {
                    let state = JSON.parse(messages[0].data).state
                    if (state) {
                        this.device.state = state === "1" ? true : false
                    }
                }
            })
        },
    },
}
</script>

<style lang="scss" scoped>
@import '../../sass/components/esp8266-temperature';
</style>