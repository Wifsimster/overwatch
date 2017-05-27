<template>
<div class="flex-container">
    <div v-for="device in devices">
        <p>{{ device }}</p>
        <type :settings="settings" :device="device"></type>
    </div>
    </div>
</template>

<script>
    import Type from './DeviceTypeComponent.vue' 
    export default {
        components: {            
            Type,
        },
        props: {
            settings: {
                type: Object,
                required: true,
            }
        },
        data() {
            return {                
                socket: this.$store.state.socket.socket,
                devices: [],
            }
        },
        methods: {
            renderDevices(devices) {
                this.splitDevices = []
                if(devices) {
                    devices.forEach((device, i) => {
                        if(device.types) {
                            device.types.forEach((type, j) => {
                                let sd = JSON.parse(JSON.stringify(device))
                                sd.type = type
                                delete sd.types
                                this.splitDevices.push(sd)
                            })
                        }
                    })
                }
            }, 
        },
        created() {
            this.socket.emit('device.getAll')
            this.socket.on('device.getAll.result', (devices) => {
                this.renderDevices(devices)
            })

            this.socket.on('message.add.result', (message) => {
                this.socket.emit('device.getAll')
            })
        }
    }
</script>

<style lang="sass" scoped>
</style>