<template>
<div class="camera">
  <canvas id="videoCanvas"></canvas>
  </div>
</template>

<script>
  import io from 'socket.io-client'
  export default {
    data() {
      return {
        socket: io(),
      }
    },
    created() {
      var jsmpeg = require('jsmpeg')
      var client = new WebSocket('ws://localhost:9999')
      this.$nextTick(function () {
        var canvas = document.getElementById('videoCanvas')
        console.log('Canvas', canvas)
        console.log('Canvas', this.$el)
        var player = new jsmpeg(client, { canvas: canvas })
        })
    },
  }
</script>

<style lang="sass" scoped>
.camera {
  margin: 5px;
  canvas {
    height: 100px;
    }
  }
</style>