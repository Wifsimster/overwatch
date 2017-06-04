<template>
<transition-group name="opacity" tag="div" class="flex-container">
    <div v-for="device in splittedDevices" :key="device.id">
        <type :settings="settings" :device="device"></type>
    </div>
    </transition-group>
</template>

<script>
    import Type from './Esp8266TypeComponent.vue' 
    export default {
        components: {
            Type,
        },
        props: {
            settings: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                splittedDevices: [],
            }
        },
        computed: {
            socket() {
                return this.$store.getters.socket
            },
        },
        methods: {
            split(devices) {
                this.splittedDevices = []
                if(devices) {
                    devices.map(device => {
                        if(device.types) {
                            if(device.types.length > 0) {
                                device.types.forEach((type, j) => {
                                    let sd = JSON.parse(JSON.stringify(device))
                                    sd.type = type
                                    delete sd.types
                                    this.splittedDevices.push(sd)
                                })
                            } else {
                                let sd = JSON.parse(JSON.stringify(device))
                                sd.type = null
                                delete sd.types
                                this.splittedDevices.push(sd)
                            }
                        }
                    })
                }
            }, 
        },
        created() {
            this.socket.emit('device.getAll')
            this.socket.on('device.getAll.result', devices => {                
                this.split(devices)
            })
        }
    }
</script>

<style lang="sass" scoped>
@import '../../sass/components/esp8266'
</style>