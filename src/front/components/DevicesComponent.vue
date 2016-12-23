<template>
<div>
  <h2>Devices detected</h2>
  <table>
    <tr v-for="device in devices">
      <td>{{ device }}</td>
  </tr>
  </table>
  </div>
</template>

<script>
  import io from 'socket.io-client'

  export default {
    data() {
      return {
        devices: [],
      }
    },
    created() {      
      const socket = io()
      const self = this

      socket.on('devices', function(devices) {
        self.devices = devices
      })

    }
  }  
</script>

<style lang="sass">
</style>