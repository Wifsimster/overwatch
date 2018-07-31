<template>
  <div class="camera" @click="expand">
    <canvas :id="id"></canvas>
    <span class="name">{{ name }}</span>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    port: String,
  },
  data() {
    return {      
      id: 'canvas_' + this.port
    }
  },
  created() {
    const jsmpeg = require('jsmpeg')
    const client = new WebSocket('ws://192.168.0.83:' + this.port)
    this.$nextTick(() => {
      let canvas = document.getElementById('canvas_' + this.port)
      let player = new jsmpeg(client, { canvas: canvas })

      fitToContainer(canvas)

      function fitToContainer(canvas) {
        canvas.style.width = '100%'
        canvas.style.height = '100%'
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
      }

    })
  },
  methods: {
    expand() {
      let canvas = document.getElementById('canvas_' + this.port)

      window.addEventListener('resize', resizeCanvas, false)

      function resizeCanvas() {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }

      resizeCanvas()

    },
  },
}
</script>

<style lang="scss" scoped>
.camera {
  text-align: center;
  margin: 5px;
}
</style>