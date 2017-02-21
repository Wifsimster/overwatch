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
    export default {
        methods: {
            toggleLight(id) {
                this.socket.emit('set.light', id)
            },
        },
        created() {
            this.socket.on('found.lights', (lights) => {
                console.log('Lights', lights)
                if(lights) {
                    this.socket.emit('get.light', (lights[0].id) => {
                        console.log('Get light')
                    })
                }
            })
        }
    }
</script>

<style lang="sass">
</style>