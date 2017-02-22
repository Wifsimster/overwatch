<template>
<div>
    <div v-for="light in lights">
        <span class="id">{{ light.id }}</span>
        <span class="model">{{ light.model }}</span>
        <span class="name">{{ light.name }}</span>
        <a @click="toggle(light.id)">Toggle</a>
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
            },
            getValues(id) {
                this.socket.emit('get.light.values', id)
                this.socket.on('get.light.values.return', (rst) => {
                    console.log('RST', rst)
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