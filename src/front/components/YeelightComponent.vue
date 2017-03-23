<template>
<div>
    <div class="yeelight" :class="{ 'red': error }">
        <span class="led" v-if="state" title="On"></span>
        <div class="image" v-if="state" @click="turnOff()">
            <img :src="bulb" class="on">
    </div>
        <div class="image" v-if="!state" @click="turnOn()">
            <img :src="bulb">
    </div>
        <span class="location">{{ name }}</span>
        <range-slider class="slider"
                      min="1"
                      max="100"
                      step="10"
                      v-model="slider">
    </range-slider>
    </div>
    </div>
</template>

<script>
    import RangeSlider from 'vue-range-slider'
    import bulb from '../assets/bulb.png'
    import io from 'socket.io-client'
    import 'vue-range-slider/dist/vue-range-slider.css'
    export default {
        components: {
            RangeSlider,
        },
        props: {
            light: Object,
        },
        data() {
            return {
                socket: io(),
                state: false,
                bulb: bulb,
                name: null,
                error: false,
                slider: 1,
            }
        },
        created() {
            switch(this.light.id) {
                case '0x00000000033601d3': this.name = "Salon" 
                break
                case '0x0000000003360d2c': this.name = "Couloir" 
                break
                case '0x0000000003312a03': this.name = "Bureau"                 
                break
            }
            this.turnOff()
        },
        watch: {
            slider(val) { this.setBrightness(val) },
        },
        methods: {
            toggle() {
                this.socket.emit('light.toggle', this.light.id)
                this.socket.on('light.toggle.result', (rst) => {
                    this.state = !this.state
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
                this.socket.on('light.turnOn.result', (rst) => {
                    this.state = true
                })
                this.socket.on('light.turnOn.error', (err) => {
                    this.$store.commit('setAlert', {type: 'error', message: err})
                    this.error = true
                })
            },
            turnOff() {
                this.socket.emit('light.turnOff', this.light.id)
                this.socket.on('light.turnOff.result', (rst) => {
                    this.state = false
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