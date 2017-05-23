<template>
<div class="sidebar">
    <!--    <h1>Réglages</h1>-->
    <ul>
        <li>
            <router-link to="/devices" class="link">
                <i class="material-icons">devices</i>
                <span>Devices</span>
    </router-link>
    </li>
        <li>
            <router-link to="/messages" class="link">
                <i class="material-icons">message</i>
                <span>Messages</span>
    </router-link>
    </li>
        <li>
            <router-link to="/types" class="link">
                <i class="material-icons">settings</i>
                <span>Types</span>
    </router-link>
    </li>
        <li>
            <router-link to="/locations" class="link">
                <i class="material-icons">location_on</i>
                <span>Locations</span>
    </router-link>
    </li>
        <li>    
            <router-link to="/backup" class="link">
                <i class="material-icons">backup</i>
                <span>Backup</span>
    </router-link>
    </li>
        <li>
            <router-link to="/scenario" class="link">
                <i class="material-icons">alarm_on</i>
                <span>Scenario</span>
    </router-link>
    </li>
    </ul>

    <ul class="bottom">
        <li>
            <span v-if="online" class="green">
                <span class="led green"></span>MQTT Online</span>
            <span v-else class="red">
                <span class="led red"></span>MQTT Offline</span>
    </li>
    </ul>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                socket: this.$store.state.socket.socket,
                online: false,
            }
        },
        created() {
            this.socket.on('mqtt.connected', (result) => {
                this.online = false
            })
            this.socket.on('mqtt.offline', (result) => {
                this.online = false
            })
        },
    }
</script>

<style lang="sass" scoped>
@import '../sass/sidebar'
</style>