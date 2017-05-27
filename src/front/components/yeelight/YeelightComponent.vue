<template>
<div class="flex-container">
    <div v-for="light in lights" class="light">
        <light :settings="settings" :light="light"></light>
    </div>
    </div>
</template>

<script>
    import Light from './LightComponent.vue'
    export default {
        components: { Light },
        props: {
            settings: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                socket: this.$store.state.socket.socket,
                lights: null,
            }
        },
        created() {
            this.socket.on('light.found', (light) => {
                let exist = this.lights.filter((li) => {
                    if(li.id === light.id) { return true }
                })
                if(exist.length === 0) { 
                    this.lights.push(light) 
                }
            })

            this.socket.emit('light.getAll')
            this.socket.on('light.getAll.result', (lights) => {
                console.log('lights', lights)
                this.lights = lights 
            })
        },
    }
</script>

<style lang="sass" scoped>
@import '../../sass/components/yeelight'
</style>