<template>
<div class="flex-container">
    <div v-for="device in splittedDevices">
        <type :settings="settings" :device="device"></type>
    </div>
    </div>
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
            }
        },
        data() {
            return {
                socket: this.$store.state.socket.socket,
                splittedDevices: [],
            }
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
            this.socket.on('device.getAll.result', (devices) => {                
                console.log('Devices', devices)
                this.split(devices)
            })

            this.socket.on('message.add.result', (message) => {
                this.socket.emit('device.getAll')
            })
        }
    }
</script>

<style lang="sass" scoped>
</style>