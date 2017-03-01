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
    </div>
    </div>
</template>

<script>
    import bulb from '../assets/bulb.png'
    import io from 'socket.io-client'
    export default {
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
            }
        },
        created() {
            switch(this.light.id) {
                case '0x00000000033601d3': this.name = "Salon" 
                break
                case '0x0000000003360d2c': this.name = "Couloir" 
                break
            }
            this.turnOff()
        },
        methods: {
            toggle() {
                this.socket.emit('light.toggle', this.light.id)
                this.socket.on('light.toggle.return', (rst) => {
                    this.state = !this.state
                })
                this.socket.on('light.toggle.error', (err) => {
                    this.$store.commit('setAlert', {type: 'error', message: err})
                    this.error = true
                })
            },
            turnOn() {
                this.socket.emit('light.turnOn', this.light.id)
                this.socket.on('light.turnOn.return', (rst) => {
                    this.state = true
                })
                this.socket.on('light.turnOn.error', (err) => {
                    this.$store.commit('setAlert', {type: 'error', message: err})
                    this.error = true
                })
            },
            turnOff() {
                this.socket.emit('light.turnOff', this.light.id)
                this.socket.on('light.turnOff.return', (rst) => {
                    this.state = false
                })
                this.socket.on('light.turnOff.error', (err) => {
                    this.$store.commit('setAlert', {type: 'error', message: err})
                    this.error = true
                })
            },
            getValues() {
                this.socket.emit('light.getValues', this.light.id)
                this.socket.on('light.getValues.return', (rst) => {
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