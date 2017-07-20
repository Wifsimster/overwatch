<template>
    <div>
        <div class="pure-g">
            <div class="pure-u-1 pure-u-lg-1-3">
                <h2>MQTT Settings</h2>
                <div class="pure-form pure-form-stacked" v-if="settings">
                    <label for="ip">IP</label>
                    <input v-model="settings.mqtt.ip" id="ip">
                    <label for="port">Port</label>
                    <input v-model="settings.mqtt.port" id="port">
                    <button @click="update()" class="pure-button pure-button-primary">Update</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            socket: this.$store.state.socket.socket,
            settings: null,
        }
    },
    created() {
        this.socket.emit('setting.getAll')
        this.socket.on('setting.getAll.result', (result) => {
            this.settings = result
        })
    },
    methods: {
        update() {
            this.socket.emit('setting.update', this.settings)
        },
    },
}  
</script>