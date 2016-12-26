<template>
<div v-if="device.type" class="device">
    <div v-if="device.type.name === 'Temperature'">
        <div class="image"><img :src="icons.temperature"></div>
        <span class="data">{{ data.temperature }} °C</span>
        <span class="name">{{ device.name }}</span>
        <span class="location" v-if="device.location">{{ device.location.name }}</span>
    </div>

    <div v-if="device.type.name === 'Humidity'">
        <div class="image"><img :src="icons.humidity"></div>
        <span class="data">{{ data.humidity }} %</span>
        <span class="name">{{ device.name }}</span>
        <span class="location" v-if="device.location">{{ device.location.name }}</span>
    </div>

    <div v-if="device.type.name == 'Luminosity'">
        <div class="image"><img :src="icons.luminosity"></div>
        <span class="data">{{ data.luminosity }} LUX</span>
        <span class="name">{{ device.name }}</span>
        <span class="location" v-if="device.location">{{ device.location.name }}</span>
    </div>
    <div v-if="device.type.name == 'Pressure'">
        <div class="image"><img :src="icons.pressure"></div>
        <span class="data">{{ data.pressure }} HPA</span>
        <span class="name">{{ device.name }}</span>
        <span class="location" v-if="device.location">{{ device.location.name }}</span>
    </div>
    <div v-if="device.type.name == 'Switch'">
        <div class="image"><img :src="icons.switch"></div>
        <span class="data">{{ data.switch }}</span>
        <span class="name">{{ device.name }}</span>
        <span class="location" v-if="device.location">{{ device.location.name }}</span>
    </div>
    <div v-if="device.type.name == 'Dimmer'">
        <div class="image"><img :src="icons.dimmer"></div>
        <span class="data">{{ data.dimmer }} LUX</span>
        <span class="name">{{ device.name }}</span>
        <span class="location" v-if="device.location">{{ device.location.name }}</span>
    </div>
    <div v-if="device.type.name == 'Gas'">
        <div class="image"><img :src="icons.gas"></div>
        <span class="data">{{ data.gas }} LUX</span>
        <span class="name">{{ device.name }}</span>
        <span class="location" v-if="device.location">{{ device.location.name }}</span>
    </div>
    <div v-if="device.type.name == 'Water'">
        <div class="image"><img :src="icons.water"></div>
        <span class="data">{{ data.water }} LUX</span>
        <span class="name">{{ device.name }}</span>
        <span class="location" v-if="device.location">{{ device.location.name }}</span>
    </div>
    <div v-if="device.type.name == 'RGBW'">
        <div class="image"><img :src="icons.rgbw"></div>
        <span class="data">{{ data.rgbw }} LUX</span>
        <span class="name">{{ device.name }}</span>
        <span class="location" v-if="device.location">{{ device.location.name }}</span>
    </div>
    </div>
</template>

<script>
    import thermometer from '../assets/thermometer.png'
    import humidity from '../assets/humidity.png'
    import pressure from '../assets/pressure.png'
    import _switch from '../assets/switch.png'
    import dimmer from '../assets/dimmer.png'
    import gas from '../assets/gas.png'
    import rgbw from '../assets/led_strip.png'

    export default {
        props: {
            device: Object,
        },
        data() {
            return {
                data: {},
                icons: { 
                    temperature: thermometer, 
                    humidity: humidity,
                    pressure: pressure,
                    switch: _switch,
                    dimmer: dimmer,
                    gas: gas,
                    rgbw: rgbw,
                },
            }
        },
        created() {
            this.data = JSON.parse(JSON.parse(this.device.messages[0].data).data)
        },
        methods: {},
        watch: {
            device(value) {
                console.log(device)
            }  
        },
    }
</script>

<style lang="sass" scoped>
@import '../sass/_colors.scss';

.device {
    position: relative;   
    .image {
    height: 75px;
    width: 90px;
    overflow: hidden;
    img {
        width: inherit;
        overflow: hidden;
        }
    }
span {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    }
.location {
    color: $dusty-gray;
    }
.data {
    color: $gallery;
    font-size: 32px;
    position: absolute;
    top: 0;
    right: 0;
    }
}
</style>