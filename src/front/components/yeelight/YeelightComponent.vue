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
            <range-slider class="slider" min="1" max="100" step="10" v-model="slider">
            </range-slider>
        </div>
    </div>
</template>

<script>
const RangeSlider = () => import('vue-range-slider')
import bulb from '../assets/bulb.png'
import 'vue-range-slider/dist/vue-range-slider.css'
export default {
    components: {
        RangeSlider,
    },
    props: {
        light: Object,
    },
    data() {
        return {
            state: false,
            bulb: bulb,
            name: null,
            error: false,
            slider: 1,
        }
    },
    created() {
        switch(this.light.id) {
            case '0x00000000033601d3': this.name = "Salon" 
            break
            case '0x0000000003360d2c': this.name = "Couloir" 
            break
            case '0x0000000003312a03': this.name = "Bureau"                 
            break
        }
        this.turnOff()
    },
    watch: {
        slider(val) { this.setBrightness(val) },
    },
    methods: {
        toggle() {
            this.$ws.send(JSON.stringify({ object: 'Light', method: 'toggle', uuid: this.uuid, parameters : { id: this.light.id } }))
            this.$ws.onmessage = message => {
                const data = JSON.parse(message.data)
                if(this.uuid === data.uuid) {
                    if('Light' === data.object && 'toggle' === data.method) {
                       this.state = !this.state
                    }
                }
            }
        },
        setBrightness(value) {            
            this.$ws.send(JSON.stringify({ object: 'Light', method: 'setBrightness', uuid: this.uuid, parameters : {
                id: this.light.id,
                brightness: parseInt(value)
            }}))
            this.$ws.onmessage = message => {
                const data = JSON.parse(message.data)
                if(this.uuid === data.uuid) {
                    if('Light' === data.object && 'setBrightness' === data.method) {
                        // NOTHING
                    }
                }
            }
        },
        turnOn() {
            this.$ws.send(JSON.stringify({ object: 'Light', method: 'turnOn', uuid: this.uuid, parameters : { id: this.light.id } }))
            this.$ws.onmessage = message => {
                const data = JSON.parse(message.data)
                if(this.uuid === data.uuid) {
                    if('Light' === data.object && 'turnOn' === data.method) {
                        this.state = true
                    }
                }
            }
        },
        turnOff() {
            this.$ws.send(JSON.stringify({ object: 'Light', method: 'turnOff', uuid: this.uuid, parameters : { id: this.light.id } }))
            this.$ws.onmessage = message => {
                const data = JSON.parse(message.data)
                if(this.uuid === data.uuid) {
                    if('Light' === data.object && 'turnOff' === data.method) {
                        this.state = false
                    }
                }
            }
        },        
        getValues() {      
            this.$ws.send(JSON.stringify({ object: 'Light', method: 'findOne', uuid: this.uuid, parameters : { id: this.light.id } }))
            this.$ws.onmessage = message => {
                const data = JSON.parse(message.data)
                if(this.uuid === data.uuid) {
                    if('Light' === data.object && 'findOne' === data.method) {
                        // NOTHING
                    }
                }
            }
        },
    },
}
</script>

<style lang="scss" scoped>
@import '../sass/yeelight';
</style>