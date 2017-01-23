<template>
<div class="camera">
  <canvas :id="id"></canvas>
  <span class="name">{{ name }}</span>
  </div>
</template>

<script>
  import io from 'socket.io-client'
  export default {
    props: {
      name: String,
      port: String,
    },
    data() {
      return {
        socket: io(),
        id: 'canvas_'+this.port
      }
    },
    created() {
      const jsmpeg = require('jsmpeg')
      const client = new WebSocket('ws://192.168.0.83:'+this.port)
      this.$nextTick(() => {
        let canvas = document.getElementById('canvas_'+this.port)
        let player = new jsmpeg(client, { canvas: canvas })
        })
    },
  }
</script>

<style lang="sass" scoped>
.camera {
  text-align: center;
  margin: 5px;
  canvas {
    width: 200px;
    }
  }
</style>