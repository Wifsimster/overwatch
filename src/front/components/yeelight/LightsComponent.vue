<template>
<div class="flex-container" v-if="settings.yeelight.display">
    <div v-for="light in lights">
        <light :device="light"></light>
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
            this.socket.on('light.found', light => {
                let exist = this.lights.filter(li => {
                    if(li.id === light.id) { return true }
                })
                if(exist.length === 0) {
                    console.log('New light found :', light)
                    this.lights.push(light) 
                }
            })

            this.socket.emit('light.getAll')

            setInterval(() => { 
                this.socket.emit('light.getAll') 
            }, 5000)

            this.socket.on('light.getAll.result', lights => {
                //                console.log('Get all lights :', lights)
                this.lights = lights 
            })
        },
    }
</script>

<style lang="sass" scoped>
@import '../../sass/components/lights'
</style>