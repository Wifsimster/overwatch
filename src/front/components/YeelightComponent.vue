<template>
<div>
    <div class="yeelight" :class="{ 'red': error }">
        <span class="led" v-if="state" title="On"></span>
        <div class="image" v-if="state" @click="turnOff()">
            <img :src="bulbImg" class="on">
    </div>
        <div class="image" v-if="!state" @click="turnOn()">
            <img :src="bulbImg">
    </div>
        <span class="location">{{ light.name }}</span>
        <range-slider class="slider"
                      min="1"
                      max="100"
                      step="10"
                      v-model="slider">
    </range-slider>
        <color-picker v-model="colors"></color-picker>
    </div>
    </div>
</template>

<script>
    import RangeSlider from 'vue-range-slider'
    import bulbImg from '../assets/bulb.png'
    import 'vue-range-slider/dist/vue-range-slider.css'
    import { Slider } from 'vue-color'

    export default {
        components: {
            RangeSlider,
            'color-picker': Slider,
        },
        props: {
            light: Object,
        },
        data() {
            return {
                socket: this.$store.state.socket.socket,
                bulbImg: bulbImg,
                state: false,
                error: false,
                slider: 1,
                colors: {
                    hex: '#194d33',
                    hsl: {
                        h: 150,
                        s: 0.5,
                        l: 0.2,
                        a: 1
                    },
                    hsv: {
                        h: 150,
                        s: 0.66,
                        v: 0.30,
                        a: 1
                    },
                    rgba: {
                        r: 25,
                        g: 77,
                        b: 51,
                        a: 1
                    },
                    a: 1
                },
            }
        },
        created() {            
            this.socket.emit('light.getValues', {
                id: this.light.id,
                props: ['power']
            })
            this.socket.on('light.getValues.result', (result) => {
                console.log(this.light.id, result)
            })

            this.turnOff()
        },
        watch: {
            slider(val) { this.setBrightness(val) },
        },
        methods: {
            toggle() {
                this.socket.emit('light.toggle', this.light.id)
                this.socket.on('light.toggle.result', (id) => {
                    if(this.light.id === id) {
                        this.state = !this.state
                    }
                })  
                this.socket.on('light.toggle.error', (err) => {
                    this.$store.commit('setAlert', {type: 'error', message: err})
                    this.error = true
                })
            },
            setBrightness(value) {
                this.socket.emit('light.setBrightness', {id: this.light.id, brightness: value})
                this.socket.on('light.setBrightness.result', (rst) => {
                })
                this.socket.on('light.setBrightness.error', (err) => {
                    this.$store.commit('setAlert', {type: 'error', message: err})
                    this.error = true
                })
            },
            turnOn() {
                this.socket.emit('light.turnOn', this.light.id)
                this.socket.on('light.turnOn.result', (id) => {
                    if(this.light.id === id) {
                        this.state = true
                    }
                })
                this.socket.on('light.turnOn.error', (err) => {
                    this.$store.commit('setAlert', {type: 'error', message: err})
                    this.error = true
                })
            },
            turnOff() {
                this.socket.emit('light.turnOff', this.light.id)
                this.socket.on('light.turnOff.result', (id) => {
                    if(this.light.id === id) {
                        this.state = false
                    }
                })
                this.socket.on('light.turnOff.error', (err) => {
                    this.$store.commit('setAlert', {type: 'error', message: err})
                    this.error = true
                })
            },
            getValues() {
                this.socket.emit('light.getValues', this.light.id)
                this.socket.on('light.getValues.result', (rst) => {
                    console.log('Get values RST', rst)
                })
                this.socket.on('light.getValues.error', (err) => {
                    this.$store.commit('setAlert', {type: 'error', message: err})
                    this.error = true
                })
            },
        },
    }
</script>

<style lang="sass" scoped>
@import '../sass/yeelight';
</style>