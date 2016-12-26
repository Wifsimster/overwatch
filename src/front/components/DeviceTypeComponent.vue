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
        <span>{{ device.luminosity }} LUX</span>
    </div>
    <div v-if="device.type.name == 'Pressure'">
        <span>{{ device.pressure }} HPA</span>
    </div>
    <div v-if="device.type.name == 'Switch'">
        <span>{{ device.switch }}</span>
    </div>
    <div v-if="device.type.name == 'Dimmer'">
        <span>{{ device.dimmer }}</span>
    </div>
    <div v-if="device.type.name == 'Gaz'">
        <span>{{ device.gaz }}</span>
    </div>
    <div v-if="device.type.name == 'Water'">
        <span>{{ device.water }}</span>
    </div>
    <div v-if="device.type.name == 'RGBW'">
        <span>{{ device.rgbw }}</span>
    </div>
    </div>
</template>

<script>
    import thermometer from '../assets/thermometer.png'
    import humidity from '../assets/humidity.png'

    export default {
        props: {
            device: Object,
        },
        data() {
            return {
                data: {},
                icons: { temperature: thermometer, humidity: humidity },
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