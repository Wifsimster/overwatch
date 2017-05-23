<template>
<div class="pure-g">
    <div class="pure-u-1">
        <h1>Settings</h1>
        <form class="pure-form pure-form-stacked" v-if="settings">
            <div class="pure-g">

                <div class="pure-u-1 pure-u-lg-1-3" v-if="settings.mqtt">
                    <fieldset>
                        <legend>MQTT Broker</legend>
                        <label for="ip">IP</label>
                        <input v-model="settings.mqtt.ip" id="ip">
                        <label for="port">Port</label>
                        <input v-model="settings.mqtt.port" id="port">
    </fieldset>
    </div>
                <div class="pure-u-1 pure-u-lg-1-3" v-if="settings.netatmo">
                    <fieldset>
                        <legend>Netatmo</legend>

                        <label for="netatmo">
                            <input id="netatmo" 
                                   type="checkbox" 
                                   v-bind:true-value="'true'"
                                   v-bind:false-value="'false'"
                                   v-model="settings.netatmo.display"> Enable</label>

                        <label for="clientId">Client id</label>
                        <input id="clientId" type="text" v-model="settings.netatmo.client_id">

                        <label for="secret">Client secrect</label>
                        <input id="secret" type="text" v-model="settings.netatmo.client_secret">

                        <label for="username">Username</label>
                        <input id="username" type="text" v-model="settings.netatmo.username">

                        <label for="password">Password</label>
                        <input id="password" type="text" v-model="settings.netatmo.password">
    </fieldset>
    </div>
                <div class="pure-u-1 pure-u-lg-1-3" v-if="settings.freebox">
                    <fieldset>
                        <legend>Freebox</legend>
                        <label for="freebox">
                            <input id="freebox" 
                                   type="checkbox" 
                                   v-bind:true-value="'true'"
                                   v-bind:false-value="'false'"
                                   v-model="settings.freebox.display"> Enable</label>

                        <label for="baseURL">Base URL</label>
                        <input id="baseURL" type="text" v-model="settings.freebox.baseURL">

                        <label for="app_token">App token</label>
                        <input id="app_token" type="text" v-model="settings.freebox.app_token">

                        <label for="track_id">Track id</label>
                        <input id="track_id" type="text" v-model="settings.freebox.track_id">

                        <label for="app_id">App id</label>
                        <input id="app_id" type="text" v-model="settings.freebox.app_id">
    </fieldset>
    </div>
                <div class="pure-u-1 pure-u-lg-1-3" v-if="settings.datetime">
                    <fieldset>
                        <legend>Date & Time</legend>
                        <label for="datetime">
                            <input id="datetime" 
                                   type="checkbox" 
                                   v-bind:true-value="'true'"
                                   v-bind:false-value="'false'"
                                   v-model="settings.datetime.display"> Enable</label>
    </fieldset>
    </div>
                <div class="pure-u-1 pure-u-lg-1-3" v-if="settings.esp8266">
                    <fieldset>
                        <legend>ESP8266</legend>
                        <label for="esp8266">
                            <input id="esp8266" 
                                   type="checkbox" 
                                   v-bind:true-value="'true'"
                                   v-bind:false-value="'false'"
                                   v-model="settings.esp8266.display"> Enable</label>
    </fieldset>
    </div>
                <div class="pure-u-1 pure-u-lg-1-3" v-if="settings.cameras">
                    <fieldset>
                        <legend>Cameras</legend>
                        <label for="cameras"><input id="cameras" 
                                                    type="checkbox" 
                                                    v-bind:true-value="'true'"
                                                    v-bind:false-value="'false'"
                                                    v-model="settings.cameras.display"> Enable</label>
    </fieldset>
    </div>

                <div class="pure-controls">
                    <button class="pure-button pure-button-primary" @click="update()">Save</button>
    </div>
    </div>
    </form>
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

<style lang="sass" scoped></style>