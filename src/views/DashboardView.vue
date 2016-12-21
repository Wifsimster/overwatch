<template>
<div>
  <com-header></com-header>
  <com-devices></com-devices>
  </div>
</template>

<script>
  import ComHeader from '../components/HeaderComponent.vue'
  import ComDevices from '../components/DevicesComponent.vue'

  export default {
    data() {
      return {

      }
    },
    components: {
      ComHeader, ComDevices,
    }
  }
</script>

<style lang="sass" scoped>

</style>