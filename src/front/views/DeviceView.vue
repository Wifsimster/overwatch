<template>
<div>    
    <div class="pure-g">
        <div class="pure-u-1 pure-u-lg-1-1">
            <com-devices></com-devices>
    </div>
    </div>
    </div>
</template>

<script>
    import ComDevices from '../components/DevicesComponent.vue'
    export default {
        data() {
            return {
                socket: this.$store.state.socket.socket,
            }
        },
        components: {
            ComDevices,
        },
    }
</script>

<style lang="sass" scoped></style>