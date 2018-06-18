<template>
    <div class="flex-container" v-if="settings.yeelight.display">
        <div v-for="light in lights" :key="light.id">
            <light :row="light"></light>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
const Light = () => import('./LightComponent.vue')
export default {
    components: { 
        Light 
    },
    props: {
        settings: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ws() {
            return this.$store.getters.ws
        }
    },
    data() {
        return {    
            uuid: null,        
            lights: null,
        }
    },
    methods: {
        getLights() {
            if(this.ws) {
                this.ws.send(JSON.stringify({ object: 'Light', method: 'findAll', uuid: this.uuid}))
                    
                this.ws.onmessage = message => {
                    const data = JSON.parse(message.data)
                    if(this.uuid === data.uuid) {
                        this.lights = data.results
                    }
                }
            }
        }
    },
    created() {
        this.uuid = Vue.getUUID()
        this.getLights()
    },
    watch: {
        ws() {
            this.getLights()
        }
    }
        
        // this.ws.on('light.found', light => {
        //     console.log('Light found')
        //     let exist = this.lights.filter(li => {
        //         if (li.id === light.id) { return true }
        //     })
        //     if (exist.length === 0) {
        //         console.log('New light found :', light)
        //         this.lights.push(light)
        //     }
        // })

        // this.ws.emit('light.getAll')

        // // setInterval(() => {
        // //     console.log('Looking for light...')
        // //     this.ws.emit('light.getAll')
        // // }, 5000)

        // this.ws.on('light.getAll.result', lights => {
        //     console.log('Get all lights :', lights)
        //     this.lights = lights
        // })
        // this.ws.on('light.getAll.error', err => {
        //     console.error('Get all lights :', err.message)
        // })
}
</script>

<style lang="scss" scoped>
@import '../../sass/components/lights';
</style>