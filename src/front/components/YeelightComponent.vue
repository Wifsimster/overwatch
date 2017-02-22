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
                this.socket.emit('set.light', id)
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