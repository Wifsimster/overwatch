<template>
<div class="devices">
  Devices Component
  </div>
</template>

<script>

  export default {
    created() {
      var io = require('socket.io-client')();
      io.on('connection', function(client){

      });
    }
  }  
</script>

<style lang="sass">
.devices {

  }
</style>