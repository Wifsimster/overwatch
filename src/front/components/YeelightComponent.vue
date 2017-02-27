<template>
<div>
    <div class="device">
        <div class="image" v-if="state" @click="turnOn(light.id)">
            <img :src="icons.lightOn">
    </div>
        <div class="image" v-if="!state" @click="turnOff(light.id)">
            <img :src="icons.lightOff">
    </div>
        <span class="data"></span>
        <span class="name">{{ light.id }}</span>
        <!--        <span class="location">{{ light.model }}</span>-->
        <!--        <a @click="toggle(light.id)">Toggle</a>-->

        <a @click="getValues(light.id)">Get values</a>
    </div>
    </div>
</template>

<script>
    import lightOn from '../assets/bulb.png'
    import lightOff from '../assets/bulb.png'
    import io from 'socket.io-client'
    export default {
        props: {
            light: Object,
        },
        data() {
            return {
                socket: io(),
                icons: [ lightOn, lightOff ],
                state: false,
            }
        },
        methods: {
            toggle(id) {
                this.socket.emit('light.toggle', id)
                this.socket.on('light.toggle.return', (rst) => {
                    console.log('Toggle RST', rst)
                })
                this.socket.on('light.toggle.error', (err) => {
                    this.$store.commit('setAlert', {type: 'error', message: err})
                })
            },
            turnOn(id) {
                this.socket.emit('light.turnOn', id)
                this.socket.on('light.turnOn.return', (rst) => {
                    console.log('turnOn RST', rst)
                })
            },
            turnOff(id) {
                this.socket.emit('light.turnOff', id)
                this.socket.on('light.turnOff.return', (rst) => {
                    console.log('turnOff RST', rst)
                })
            },
            getValues(id) {
                this.socket.emit('light.getValues', id)
                this.socket.on('light.getValues.return', (rst) => {
                    console.log('Get values RST', rst)
                })
                this.socket.on('light.getValues.error', (err) => {
                    this.$store.commit('setAlert', {type: 'error', message: err})
                })
            },
        },
    }
</script>

<style lang="sass"></style>