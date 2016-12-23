<template>
<div>
    <div class="pure-g">
        <div class="pure-u-1 pure-u-lg-1-2">
            <com-devices></com-devices>
    </div>
        <div class="pure-u-1 pure-u-lg-1-2">
            <com-messages></com-messages>
    </div>
    </div>
    </div>
</template>

<script>
    import ComDevices from '../components/DevicesComponent.vue'
    import ComMessages from '../components/MessagesComponent.vue'

    export default {
        data() {
            return {

            }
        },
        components: {
            ComDevices,
            ComMessages,
        }
    }
</script>

<style lang="sass" scoped>

</style>