<template>
<div class="devices">
  <h1>Devices</h1>

  <table>
    <tr v-for="message in data">
      <td>{{ message }}</td>
  </tr>
  </table>

  </div>
</template>

<script>
  import io from 'socket.io-client'

  export default {
    data() {
      return {
        data: [],
      }
    },
    created() {
      const socket = io()
      const self = this
      socket.on('sensors', function(msg) {
        console.log('message', msg)
        self.data.push(msg)
      })
    }
  }  
</script>

<style lang="sass">
.devices {

  }
</style>