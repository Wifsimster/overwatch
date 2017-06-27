<template>
<div class="flex-container" v-if="settings">

    <h1>Others</h1>
    <div class="flex-container others">
        <date-time :settings="settings"></date-time>
        <freebox :settings="settings"></freebox>
    </div>

    <h1>ESP8266</h1>
    <esp8266 :settings="settings"></esp8266>

    <h1>Netatmo</h1>
    <netatmo :settings="settings"></netatmo>

    <h1>Lights</h1>
    <lights :settings="settings"></lights>

    <h1>Cameras</h1>
    <div v-if="settings.cameras && settings.cameras.display !== 'false'">
        <camera port="9962"></camera>
    </div>

    <div v-if="settings.cameras && settings.cameras.display !== 'false'">
        <camera port="9963"></camera>
    </div>

    </div>
</template>

<script>
    import alertify from 'alertifyjs'
    import DateTime from '../components/DateTimeComponent.vue'
    import Freebox from '../components/FreeboxComponent.vue'
    import Camera from '../components/CameraComponent.vue'
    import Lights from '../components/yeelight/LightsComponent.vue'
    import Esp8266 from '../components/esp8266/Esp8266Component.vue'
    import Netatmo from '../components/netatmo/NetatmoComponent.vue'
    export default {
        components: {
            DateTime,
            Freebox,
            Camera,
            Lights,
            Netatmo,
            Esp8266,
        },
        data() {
            return {
                socket: this.$store.state.socket.socket,
                settings: null,
                camera: null,
            }
        },
        methods: {
            display(name) {
                this.settings.forEach((setting, index) => {
                    return (setting.name === name && setting.value)
                })
            },
            renderAlert(devices) {
                if(devices.length > 0) {
                    alertify.notify(devices.length + ' device(s) to configure !', 'info', 5)
                }
            }, 
        },
        created() {
            this.socket.emit('setting.getAll')
            this.socket.on('setting.getAll.result', (settings) => {
                this.settings = settings
            })
        },
    }
</script>

<style lang="sass" scoped>
@import '../sass/views/dashboard'
</style>