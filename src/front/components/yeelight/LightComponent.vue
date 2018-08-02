<template>
    <div>
        <transition name="opacity">
            <div class="light" v-if="device" @click="modalShow = true">
                <div class="image">
                    <img :src="bulbImg">
                </div>
                <span v-if="state" class="led pull-right"></span>
                <span class="location">{{ device.name }}</span>
            </div>
        </transition>
    
        <modal v-if="modalShow" @close="onClose">
            <div slot="header">
                <i class="material-icons" @click="info = !info">info</i> Light - {{ device.name }}
            </div>
            <div slot="body">
    
                <div class="alert error">{{ error }}</div>
    
                <switchy :row="state" @switch="onState"></switchy>
    
                <slider :value="device.bright" :hex="hex" @update="setBrightness"></slider>
    
                <colors-picker :value="hex" v-if="device.model === 'color'" @update="setRGB"></colors-picker>
    
                <transition name="opacity">
                    <ul v-if="info">
                        <li>Id: {{ device.id }}</li>
                        <li>Hostname: {{ device.hostname }}</li>
                        <li>Port: {{ device.port }}</li>
                        <li>Model: {{ device.model }}</li>
                        <li>Name: {{ device.name }}</li>
                        <li v-if="device.power">Power: {{ device.power }}</li>
                        <li v-if="device.bright">Bright: {{ device.bright }}</li>
                        <li v-if="device.color_mode == 1">Color mode: Color (1)</li>
                        <li v-if="device.color_mode === 2">Color mode: Temperature (2)</li>
                        <li v-if="device.color_mode === 3">Color mode: HSV (3)</li>
                        <li v-if="device.rgb">RGB: {{ device.rgb }}</li>
                        <li v-if="device.ct">CT: {{ device.ct }}</li>
                        <li v-if="device.hue">Hue: {{ device.hue }}</li>
                    </ul>
                </transition>
            </div>
        </modal>
    </div>
</template>

<script>
const Modal = () => import('../ModalComponent.vue')
const Slider = () => import('../SliderComponent.vue')
import bulbImg from '../../assets/bulb.svg'
const Switchy = () => import('../SwitchComponent.vue')
const ColorsPicker = () => import('../ColorsPickerComponent.vue')
import Vue from 'vue'
export default {
    components: {
        Modal,
        Slider,
        Switchy,
        ColorsPicker,
    },
    props: {
        row: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {            
            bulbImg: bulbImg,
            error: null,
            modalShow: false,
            state: false,
            device: {
                id: null,
                bright: null,
                color_mode: null,
                ct: null,
                hue: null,
                power: null,
                rgb: null,
            },
            hex: null,
            info: false,
        }
    },
    created() {
        Object.assign(this.device, this.row)
        this.getValues()
    },
    watch: {
        device(val) {
            console.log('Change trigger')
            this.getValues()
        },
        'device.bright'(val) {
            this.setBrightness(val)
        },
        'device.rgb'(val) {
            this.hex = Colors.parseRGB(val)
        },
    },
    methods: {
        onState() {
            this.toggle()
            this.getValues()
        },
        getValues() {
            if (this.device) {           
                 this.$ws.send(JSON.stringify({ object: 'Light', method: 'findOne', uuid: this.uuid, parameters : { id: this.device.id } }))
                 this.$ws.onmessage = message => {
                    const data = JSON.parse(message.data)
                    if(this.uuid === data.uuid) {
                        if('Light' === data.object && 'findOne' === data.method) {
                            Object.assign(this.device, data.results)
                            if (this.device.power === 'on') { this.state = true }
                            if (this.device.power === 'off') { this.state = false }
                        }
                    }
                }
            }
        },
        toggle() {
            this.$ws.send(JSON.stringify({ object: 'Light', method: 'toggle', uuid: this.uuid, parameters : { id: this.device.id } }))
            this.$ws.onmessage = message => {
                const data = JSON.parse(message.data)
                if(this.uuid === data.uuid) {
                    if('Light' === data.object && 'toggle' === data.method) {
                        this.getValues()
                    }
                }
            }
        },
        setBrightness(value) {            
            this.$ws.send(JSON.stringify({ object: 'Light', method: 'setBrightness', uuid: this.uuid, parameters : {
                id: this.device.id,
                brightness: parseInt(value)
            }}))
            this.$ws.onmessage = message => {
                const data = JSON.parse(message.data)
                if(this.uuid === data.uuid) {
                    if('Light' === data.object && 'setBrightness' === data.method) {
                        this.getValues()
                    }
                }
            }
        },
        setRGB(value) {
             this.$ws.send(JSON.stringify({ object: 'Light', method: 'setRGB', uuid: this.uuid, parameters : {
                id: this.device.id,
                hex: value
            }}))
            this.$ws.onmessage = message => {
                const data = JSON.parse(message.data)
                if(this.uuid === data.uuid) {
                    if('Light' === data.object && 'setRGB' === data.method) {
                        this.hex = value
                    }
                }
            }
        },
        onClose() {
            this.modalShow = false
        },
    },
}
</script>

<style lang="scss" scoped>
@import '../../sass/components/light';
</style>