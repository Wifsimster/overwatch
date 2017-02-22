<template>
<div>
    <div v-for="light in lights" class="pure-u-1 pure-u-sm-1-2 pure-u-md-1-4 pure-u-lg-1-6">
        <div class="device">
            <p class="id">{{ light.id }}</p>
            <p class="model">{{ light.model }}</p>
            <p class="name">{{ light.name }}</p>
            <a @click="toggle(light.id)">Toggle</a>
            <br>
            <a @click="getValues(light.id)">Get values</a>
    </div>
    </div>
    </div>
</template>

<script>
    import io from 'socket.io-client'
    export default {
        data() {
            return {
                socket: io(),
                lights: [],
            }
        },
        methods: {
            toggle(id) {
                this.socket.emit('toggle.light', id)
                this.socket.on('toggle.light.return', (rst) => {
                    console.log('RST', rst)
                })
                this.socket.on('toggle.light.error', (err) => {
                    this.$store.commit('setAlert', {type: 'error', message: err})
                })
            },
            getValues(id) {
                this.socket.emit('get.light.values', id)
                this.socket.on('get.light.values.return', (rst) => {
                    console.log('RST', rst)
                })
                this.socket.on('get.light.values.error', (err) => {
                    this.$store.commit('setAlert', {type: 'error', message: err})
                })
            },
        },
        created() {
            this.socket.on('found.lights', (lights) => {
                console.log('Lights', lights)
                this.lights = lights
            })
        }
    }
</script>

<style lang="sass">
</style>