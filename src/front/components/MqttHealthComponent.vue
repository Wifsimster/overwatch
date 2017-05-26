<template>
<div class="mqtt">
    <transition name="opacity">
        <span v-if="online" class="green">
            <span class="led green"></span>
            <span>MQTT Online</span>
    </span>
    </transition>
    <transition name="opacity">
        <span v-if="offline" class="red">
            <span class="led red"></span>
            <span>MQTT Offline</span>
    </span>
    </transition>
    <transition name="opacity">
        <span v-if="close" class="red">
            <span class="led red"></span>
            <span>MQTT Disconnected</span>
    </span>
    </transition>
    <transition name="opacity">
        <span v-if="reconnecting">
            <span class="led"></span>
            <span>MQTT Reconnecting...</span>
    </span>
    </transition>
    <transition name="opacity">
        <span v-if="error">
            <span class="led red"></span>
            <span>MQTT Error !</span>
    </span>
    </transition>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                socket: this.$store.state.socket.socket,
                online: false,
                offline: false,
                close: false,
                reconnecting: false,
                error: false,
            }
        },
        created() {
            this.socket.on('mqtt.connected', result => {
                this.online = true
                this.offline = false
                this.close = false
                this.reconnecting = false
                this.error = false
            })
            this.socket.on('mqtt.close', result => {
                this.online = false
                this.offline = false
                this.close = true
                this.reconnecting = false
                this.error = false
            })
            this.socket.on('mqtt.offline', result => {
                this.online = false
                this.offline = true
                this.close = false
                this.reconnecting = false
                this.error = false
            })
            this.socket.on('mqtt.reconnecting', result => {
                this.online = false
                this.offline = false
                this.close = false
                this.reconnecting = true
                this.error = false
            })
            this.socket.on('mqtt.error', result => {
                this.online = false
                this.offline = false
                this.close = false
                this.reconnecting = false
                this.error = true
            })
        },
    }
</script>

<style lang="sass" scoped>
@import '../sass/mqtt-health'
</style>