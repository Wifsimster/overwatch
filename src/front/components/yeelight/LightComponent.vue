<template>
    <div>
        <transition name="opacity">
            <div :class="{ 'red': error }" class="light" v-if="device" @click="modalShow = true">
                <div class="image">
                    <img :src="bulbImg">
                </div>
                <span v-if="state" class="led pull-right"></span>
                <span class="location">{{ device.name }}</span>
            </div>
        </transition>
    
        <modal v-if="modalShow" @close="onClose">
            <div slot="header">Light - {{ device.name }}</div>
            <div slot="body">
                <ul>
                    <li>Name: {{ device.name }}</li>
                    <li>Id: {{ device.id }}</li>
                    <li>Hostname: {{ device.hostname }}</li>
                    <li>Port: {{ device.port }}</li>
                    <li>Model: {{ device.model }}</li>
                    <li v-if="device.power">Power: {{ device.power }}</li>
                    <li v-if="device.bright">Bright: {{ device.bright }}</li>
                    <li v-if="device.color_mode">Color mode: {{ device.color_mode }}</li>
                    <li v-if="device.ct">CT: {{ device.ct }}</li>
                    <li v-if="device.hue">Hue: {{ device.hue }}</li>
                    <li v-if="device.rgb">RGB: {{ device.rgb }}</li>
                    <li>Brightness:
                        <range-slider class="slider" min="1" max="100" step="5" v-model="device.bright"></range-slider>
                    </li>
                    <switchy :state="state" @switch="onState"></switchy>
    
                </ul>
            </div>
        </modal>
    
    </div>
</template>

<script>
import Modal from '../ModalComponent.vue'
import RangeSlider from 'vue-range-slider'
import 'vue-range-slider/dist/vue-range-slider.css'
import bulbImg from '../../assets/bulb.png'
import Switchy from '../SwitchComponent.vue'
export default {
    components: {
        Modal,
        RangeSlider,
        Switchy,
    },
    props: {
        row: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            socket: this.$store.state.socket.socket,
            bulbImg: bulbImg,
            error: false,
            modalShow: false,
            state: false,
            device: {
                id: null,
                bright: null,
                color_mode: null,
                ct: null,
                hue: null,
                power: null,
                rgb: null,
            }
        }
    },
    created() {
        Object.assign(this.device, this.row)
        this.getValues()
    },
    watch: {
        device(val) {
            console.log('Change trigger')
            this.getValues()
        },
        'device.bright'(val) {
            this.setBrightness(val)
        },
    },
    methods: {
        onState() {
            this.toggle()
            this.getValues()
        },
        getValues() {
            if (this.device) {
                this.socket.emit('light.getValues', this.device.id)

                this.socket.on('light.getValues.result.' + this.device.id, data => {
                    if (data && typeof data === 'object') {
                        Object.assign(this.device, data)
                        if (this.device.power === 'on') { this.state = true }
                        if (this.device.power === 'off') { this.state = false }
                    }
                })

                this.socket.on('light.getValues.error.' + this.device.id, err => {
                    console.error('Error :', err)
                    this.$store.dispatch('setAlert', { type: 'error', message: err })
                    this.error = true
                })
            }
        },
        refresh() {
            this.socket.emit('light.refresh', this.device.id)
            this.socket.on('light.refresh.result.' + this.device.id, data => {
                console.log('Refresh :', data)
            })
            this.socket.on('light.refresh.error.' + this.device.id, err => {
                this.$store.dispatch('setAlert', { type: 'error', message: err })
                this.error = true
            })
        },
        toggle() {
            this.socket.emit('light.toggle', this.device.id)
            this.socket.on('light.toggle.result.' + this.device.id, () => {
                console.log('Toggle')
                this.getValues()
            })
            this.socket.on('light.toggle.error.' + this.device.id, err => {
                this.$store.dispatch('setAlert', { type: 'error', message: err })
                this.error = true
            })
        },
        setBrightness(value) {
            this.socket.emit('light.setBrightness', {
                id: this.device.id,
                brightness: value
            })
        },
        onClose() {
            this.modalShow = false
        },
    },
}
</script>

<style lang="scss" scoped>
@import '../../sass/components/light'
</style>