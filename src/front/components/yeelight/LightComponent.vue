<template>
<div>
    <transition name="opacity">
        <div :class="{ 'red': error }"
             class="light"
             v-if="device"
             @click="modalShow = true">
            <span class="led" v-if="state" title="On"></span>
            <div class="image" v-if="state">
                <img :src="bulbImg" class="on"></div>
            <div class="image" v-if="!state">
                <img :src="bulbImg"></div>
            <span class="location">{{ device.name }}</span>
    </div>
    </transition>

    <modal v-if="modalShow"
           @close="onClose">
        <div slot="header">{{ device.id }}</div>
        <div slot="body">
            <range-slider class="slider"
                          min="1"
                          max="100"
                          step="10"
                          v-model="slider"></range-slider>
    </div>
    </modal>

    </div>
</template>

<script>
    import Modal from '../ModalComponent.vue'
    import RangeSlider from 'vue-range-slider'
    import 'vue-range-slider/dist/vue-range-slider.css'
    import bulbImg from '../../assets/bulb.png'
    export default {
        components: { 
            Modal,
            RangeSlider,
        },
        props: {
            device: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                socket: this.$store.state.socket.socket,
                bulbImg: bulbImg,
                state: false,
                error: false,
                slider: 1,
                modalShow: false,
            }
        },
        created() {
            this.socket.emit('light.getValues', {
                id: this.device.id,
                props: ['power']
            })
            this.socket.on('light.getValues.result', data => {
                console.log(this.device.id, data)
            })
            this.turnOff()
        },
        watch: {
            slider(val) { this.setBrightness(val) },
        },
        methods: {
            toggle() {
                this.socket.emit('light.toggle', this.device.id)
                this.socket.on('light.toggle.result', id => {
                    if(this.device.id === id) {
                        this.state = !this.state
                    }
                })  
                this.socket.on('light.toggle.error', err => {
                    this.$store.dispatch('setAlert', { type: 'error', message: err })
                    this.error = true
                })
            },
            setBrightness(value) {
                this.socket.emit('light.setBrightness', { 
                    id: this.device.id, 
                    brightness: value
                })
                this.socket.on('light.setBrightness.result', data => {
                    console.log('Brightness', data)
                })
                this.socket.on('light.setBrightness.error', err => {
                    this.$store.dispatch('setAlert', { type: 'error', message: err })
                    this.error = true
                })
            },
            turnOn() {
                this.socket.emit('light.turnOn', this.device.id)
                this.socket.on('light.turnOn.result', id => {
                    if(this.device.id === id) {
                        this.state = true
                    }
                })
                this.socket.on('light.turnOn.error', err => {
                    this.$store.dispatch('setAlert', { type: 'error', message: err })
                    this.error = true
                })
            },
            turnOff() {
                this.socket.emit('light.turnOff', this.device.id)
                this.socket.on('light.turnOff.result', id => {
                    if(this.device.id === id) {
                        this.state = false
                    }
                })
                this.socket.on('light.turnOff.error', err => {
                    this.$store.dispatch('setAlert', { type: 'error', message: err })
                    this.error = true
                })
            },
            getValues() {
                this.socket.emit('light.getValues', this.device.id)
                this.socket.on('light.getValues.result', data => {
                    console.log('Get values RST', data)
                })
                this.socket.on('light.getValues.error', err => {
                    this.$store.dispatch('setAlert', { type: 'error', message: err })
                    this.error = true
                })
            },
        },
    }
</script>

<style lang="sass" scoped>
@import '../../sass/components/light'
</style>