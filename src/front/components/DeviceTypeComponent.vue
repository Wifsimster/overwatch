<template>
<div v-if="device" class="device">    
  <div v-if="device.type.name === 'Temperature'">
    <div class="image"><img :src="icons.temperature"></div>
    <span class="data">{{ data.temperature }}°C</span>
    <span class="name">{{ device.name }}</span>
    <span class="location" v-if="device.location">{{ device.location.name }}</span>
    <span class="date">{{ lastSeen | moment('HH:mm') }}</span>
  </div>

  <div v-if="device.type.name === 'Humidity'">
    <div class="image"><img :src="icons.humidity"></div>
    <span class="data">{{ data.humidity }}%</span>
    <span class="name">{{ device.name }}</span>
    <span class="location" v-if="device.location">{{ device.location.name }}</span>
    <span class="date">{{ lastSeen | moment('HH:mm') }}</span>
  </div>

  <div v-if="device.type.name == 'Luminosity'">
    <div class="image"><img :src="icons.luminosity"></div>
    <span class="data">{{ data.luminosity }}LUX</span>
    <span class="name">{{ device.name }}</span>
    <span class="location" v-if="device.location">{{ device.location.name }}</span>
    <span class="date">{{ lastSeen | moment('HH:mm') }}</span>
  </div>
  <div v-if="device.type.name == 'Pressure'">
    <div class="image"><img :src="icons.pressure"></div>
    <span class="data">{{ data.pressure }}mB</span>
    <span class="name">{{ device.name }}</span>
    <span class="location" v-if="device.location">{{ device.location.name }}</span>
    <span class="date">{{ lastSeen | moment('HH:mm') }}</span>
  </div>
  <div v-if="device.type.name == 'Switch'">
    <div class="image"><img :src="icons.switch"></div>    
    <span class="data">{{ data.state }}</span>
    <span class="name">{{ device.name }}</span>
    <span class="location" v-if="device.location">{{ device.location.name }}</span>
    <span class="date">{{ lastSeen | moment('HH:mm') }}</span>
  </div>
  <div v-if="device.type.name == 'Dimmer'">
    <div class="image"><img :src="icons.dimmer"></div>
    <span class="data">{{ data.dimmer }}</span>
    <span class="name">{{ device.name }}</span>
    <span class="location" v-if="device.location">{{ device.location.name }}</span>
    <span class="date">{{ lastSeen | moment('HH:mm') }}</span>
  </div>
  <div v-if="device.type.name == 'Gas'">
    <div class="image"><img :src="icons.gas"></div>
    <span class="data">{{ data.gas }}ppm</span>
    <span class="name">{{ device.name }}</span>
    <span class="location" v-if="device.location">{{ device.location.name }}</span>
    <span class="date">{{ lastSeen | moment('HH:mm') }}</span>
  </div>
  <div v-if="device.type.name == 'Water'">
    <div class="image"><img :src="icons.water"></div>
    <span class="data">{{ data.water }}</span>
    <span class="name">{{ device.name }}</span>
    <span class="location" v-if="device.location">{{ device.location.name }}</span>
    <span class="date">{{ lastSeen | moment('HH:mm') }}</span>
  </div>
  <div v-if="device.type.name == 'RGBW'">
    <div class="image"><img :src="icons.rgbw"></div>
    <span class="data">{{ data.rgbw }}</span>
    <span class="name">{{ device.name }}</span>
    <span class="location" v-if="device.location">{{ device.location.name }}</span>
    <span class="date">{{ lastSeen | moment('HH:mm') }}</span>
  </div>
  </div>
</template>

<script>
  import thermometer from '../assets/thermometer.png'
  import humidity from '../assets/humidity.png'
  import pressure from '../assets/pressure.png'
  import _switch from '../assets/switch.png'
  import dimmer from '../assets/dimmer.png'
  import luminosity from '../assets/luminosity.png'
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
          luminosity: luminosity,
          gas: gas,
          rgbw: rgbw,
        },
        lastSeen: null,
      }
    },
    created() {
      if(this.device.messages && this.device.messages.length > 0) {

        this.device.messages.sort((a, b) => {
          return new Date(a.createdAt) - new Date(b.createdAt)
        })

        this.data = JSON.parse(this.device.messages[this.device.messages.length - 1].data)

        this.lastSeen = this.device.messages[this.device.messages.length - 1].createdAt
      }
    },
    watch: {
      device: function() {
        this.device.messages.sort((a, b) => {
          return new Date(a.createdAt) - new Date(b.createdAt)
        })

        this.data = JSON.parse(this.device.messages[this.device.messages.length - 1].data)

        this.lastSeen = this.device.messages[this.device.messages.length - 1].createdAt
      }
    },
  }
</script>

<style lang="sass">
@import '../sass/_colors.scss';

$height: 100px;

.device {
  position: relative;
  background-color: $mine-shaft-app;
  margin: 5px;
  padding: 5px 10px;
  height: $height;
  div {
    position: relative;
    height: calc(100% - 2px);
    .image {
      position: absolute;
      overflow: hidden;
      height: $height - 10px;
      left: calc(50% - 45px);
      img {
        height: calc(100% + 15px);
        overflow: hidden;
        }
      }
    span {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      position: relative;
      padding: 2px 0;
      }
    .data {
      color: $gallery;
      font-size: 38px;
      top: 0;
      right: 0;
      }
    .location {
      color: $dusty-gray;
      }
    .date {
      position: absolute;
      right: 2px;
      bottom: 2px;
      font-size: 12px;
      }
    }
  }
</style>