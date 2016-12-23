<template>
<div>    
  <div class="pure-g">
    <div class="pure-u-1 pure-u-lg-1-1">
      <com-devices></com-devices>
  </div>
    <div class="pure-u-1 pure-u-lg-1-1">
      <com-messages></com-messages>
  </div>
  </div>
  </div>
</template>

<script>
  import ComDevices from '../components/DevicesComponent.vue'    
  import ComMessages from '../components/MessagesComponent.vue'
  import io from 'socket.io-client'

  export default {
    data() {
      return {

      }
    },
    components: {
      ComDevices,
      ComMessages,
    },
  }
</script>

<style lang="sass" scoped>

</style>