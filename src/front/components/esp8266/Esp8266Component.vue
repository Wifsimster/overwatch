<template>
    <transition-group name="opacity" tag="div" class="flex-container">
        <div v-for="device in devices" :key="device.id">
    
            <div v-if="device.types && device.types[0] && device.types[0].key === 'motion'">
                <esp8266-motion :id="device.id"></esp8266-motion>
            </div>
    
            <div v-if="device.types && device.types[0] && device.types[0].key === 'switch'">
                <esp8266-switch :id="device.id"></esp8266-switch>
            </div>
    
        </div>
    </transition-group>
</template>

<script>
import Esp8266Switch from './Esp8266SwitchComponent.vue'
import Esp8266Motion from './Esp8266MotionComponent.vue'
import UUID from '../../mixins/uuid'
export default {
    components: {
        Esp8266Switch,
        Esp8266Motion,
    },
    props: {
        settings: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            devices: [],
            uuid: null,
        }
    },
    computed: {
        socket() {
            return this.$store.getters.socket
        },
    },
    created() {
        this.uuid = UUID.getOne()

        this.socket.emit('device.getAll', { uuid: this.uuid })

        this.socket.on('device.getAll.result.' + this.uuid, devices => {
            console.log('Devices', devices)
            this.devices = devices
            //this.split(devices)
        })
    },
    methods: {
        isType(device, name) {
            return device.types.map(type => {
                if (type.key === name) {
                    return true
                }
            })
        },
        split(devices) {
            this.splittedDevices = []
            if (devices) {
                devices.map(device => {
                    if (device.types) {
                        if (device.types.length > 0) {
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
}
</script>

<style lang="scss" scoped>
@import '../../sass/components/esp8266'
</style>