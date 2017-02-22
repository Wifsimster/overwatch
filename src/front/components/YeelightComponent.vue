<template>
<div>
    <div v-for="light in lights">
        <span class="id">{{ light.id }}</span>
        <span class="model">{{ light.model }}</span>
        <span class="name">{{ light.name }}</span>
    </div>
    </div>
</template>

<script>
    import io from 'socket.io-client'
    export default {
        data() {
            return {
                socket: io(),
            }
        },
        methods: {
            toggleLight(id) {
                this.socket.emit('set.light', id)
            },
        },
        created() {
            this.socket.on('found.lights', (lights) => {
                console.log('Lights', lights)
            })
        }
    }
</script>

<style lang="sass">
</style>