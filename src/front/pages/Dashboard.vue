<template>
    <div class="flex-container" v-if="settings">    
        <h1>Others</h1>
        <div class="flex-container others">
            <date-time v-if="settings" :settings="settings"></date-time>
            <freebox v-if="settings" :settings="settings"></freebox>
        </div>
    
        <h1>ESP8266</h1>
        <esp8266 v-if="settings" :settings="settings"></esp8266>
    
        <h1>Netatmo</h1>
        <netatmo v-if="settings" :settings="settings"></netatmo>
    
        <h1>Lights</h1>
        <lights v-if="settings" :settings="settings"></lights>
    
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
import Vue from 'vue'
const DateTime = () => import('../components/DateTimeComponent.vue')
const Freebox = () => import('../components/freebox/FreeboxComponent.vue')
const Camera = () => import('../components/camera/CameraComponent.vue')
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
    data() {
        return {
            uuid: null,
            settings: null,
            camera: null
        }
    },
    created() {
        this.uuid = Vue.getUUID()
        this.getSettings()
    },
    methods: {       
        getSettings() {
            this.$ws.send(JSON.stringify({ object: 'Settings', method: 'findAll', uuid: this.uuid}))            
            this.$ws.onmessage = message => {
                const data = JSON.parse(message.data)
                if('findAll' === data.method && this.uuid === data.uuid) {
                    this.settings = data.results
                }
            }
        },
        display(name) {
            this.settings.map((setting, index) => {
                return (setting.name === name && setting.value)
            })
        },
        renderAlert(devices) {
            if (devices.length > 0) {
                alertify.notify(devices.length + ' device(s) to configure !', 'info', 5)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../sass/pages/dashboard';
</style>