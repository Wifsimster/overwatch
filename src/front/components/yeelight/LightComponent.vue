<template>
<device :show="settings.yeelight.display">
    <div slot="body">
        <div :class="{ 'red': error }" >
            <div class="yeelight">
                <span class="led" v-if="state" title="On"></span>
                <div class="image" v-if="state">
                    <img :src="bulbImg" class="on">
    </div>
                <div class="image" v-if="!state">
                    <img :src="bulbImg">
    </div>
                <span class="location">{{ light.name }}</span>
    </div>
    </div>
    </div>
    <div slot="more">
        <range-slider class="slider"
                      min="1"
                      max="100"
                      step="10"
                      v-model="slider">
    </range-slider>
    </div>
    </device>
</template>

<script>
    import Device from '../DeviceComponent.vue'
    import RangeSlider from 'vue-range-slider'
    import 'vue-range-slider/dist/vue-range-slider.css'
    import bulbImg from '../../assets/bulb.png'
    export default {
        name: 'light',
        components: { Device, RangeSlider },
        props: {
            light: {
                type: Object,
                required: true,
            },
            settings: {
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
@import '../../sass/components/yeelight'
</style>