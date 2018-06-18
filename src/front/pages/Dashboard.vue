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
const DateTime = () => import('../components/DateTimeComponent.vue')
const Freebox = () => import('../components/FreeboxComponent.vue')
const Camera = () => import('../components/CameraComponent.vue')
const Lights = () => import('../components/yeelight/LightsComponent.vue')
const Esp8266 = () => import('../components/esp8266/Esp8266Component.vue')
const Netatmo = () => import('../components/netatmo/NetatmoComponent.vue')
export default {
    components: {
        DateTime,
        Freebox,
        Camera,
        Lights,
        Netatmo,
        Esp8266,
    },
    computed: {
        ws() {
            return this.$store.getters.ws
        }
    },
    data() {
        return {
            settings: null,
            camera: null,
        }
    },
    methods: {
        display(name) {
            this.settings.map((setting, index) => {
                return (setting.name === name && setting.value)
            })
        },
        renderAlert(devices) {
            if (devices.length > 0) {
                alertify.notify(devices.length + ' device(s) to configure !', 'info', 5)
            }
        },
    },
    created() {
        // this.ws.onopen = () => {
            this.ws.send(JSON.stringify({ object: 'Settings', method: 'findAll'}))
        // }

        // this.ws.emit('setting.getAll')
        // this.ws.on('setting.getAll.result', (settings) => {
        //     this.settings = settings
        // })
    },
}
</script>

<style lang="scss" scoped>
@import '../sass/pages/dashboard';
</style>