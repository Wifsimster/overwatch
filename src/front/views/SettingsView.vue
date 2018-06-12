<template>
<div class="pure-g">
    <div class="pure-u-1">
        <h1>Settings</h1>
        <form class="pure-form pure-form-aligned" v-if="settings">
            <div class="pure-g">
                <div class="pure-u-1 pure-u-lg-1-3">
                    <h2><input id="datetime" 
                               type="checkbox" 
                               v-bind:true-value="'true'"
                               v-bind:false-value="'false'"
                               v-model="settings.datetime.display"><label for="datetime">Date & time</label></h2>
    </div>
                <div class="pure-u-1 pure-u-lg-1-3">
                    <h2><input id="esp8266" 
                               type="checkbox" 
                               v-bind:true-value="'true'"
                               v-bind:false-value="'false'"
                               v-model="settings.esp8266.display"><label for="esp8266">ESP8266</label></h2>
    </div>
                <div class="pure-u-1 pure-u-lg-1-3">
                    <h2><input id="cameras" 
                               type="checkbox" 
                               v-bind:true-value="'true'"
                               v-bind:false-value="'false'"
                               v-model="settings.cameras.display"><label for="cameras">Cameras</label></h2>
    </div>
                <div class="pure-u-1 pure-u-lg-1-3">
                    <h2><input id="netatmo" 
                               type="checkbox" 
                               v-bind:true-value="'true'"
                               v-bind:false-value="'false'"
                               v-model="settings.netatmo.display"><label for="netatmo">Netatmo</label></h2>
                    <div class="pure-control-group" v-if="settings.netatmo">
                        <label for="clientId">Client id</label>
                        <input id="clientId" type="text" v-model="settings.netatmo.client_id">
    </div> 
                    <div class="pure-control-group" v-if="settings.netatmo">
                        <label for="secret">Client secrect</label>
                        <input id="secret" type="text" v-model="settings.netatmo.client_secret">
    </div>
                    <div class="pure-control-group" v-if="settings.netatmo">
                        <label for="username">Username</label>
                        <input id="username" type="text" v-model="settings.netatmo.username">
    </div>
                    <div class="pure-control-group" v-if="settings.netatmo">
                        <label for="password">Password</label>
                        <input id="password" type="text" v-model="settings.netatmo.password">
    </div>
    </div>
                <div class="pure-u-1 pure-u-lg-1-3">
                    <h2><input id="freebox" 
                               type="checkbox" 
                               v-bind:true-value="'true'"
                               v-bind:false-value="'false'"
                               v-model="settings.freebox.display"><label for="freebox">Freebox</label></h2>
                    <div class="pure-control-group" v-if="settings.freebox">
                        <label for="baseURL">Base URL</label>
                        <input id="baseURL" type="text" v-model="settings.freebox.baseURL">
    </div>
                    <div class="pure-control-group" v-if="settings.freebox">
                        <label for="app_token">App token</label>
                        <input id="app_token" type="text" v-model="settings.freebox.app_token">
    </div>
                    <div class="pure-control-group" v-if="settings.freebox">
                        <label for="track_id">Track id</label>
                        <input id="track_id" type="text" v-model="settings.freebox.track_id">
    </div>
                    <div class="pure-control-group" v-if="settings.freebox">
                        <label for="app_id">App id</label>
                        <input id="app_id" type="text" v-model="settings.freebox.app_id">
    </div>
    </div>
                <div class="pure-u-1 pure-u-lg-1-3">
                    <h2><input id="google" 
                               type="checkbox" 
                               v-bind:true-value="'true'"
                               v-bind:false-value="'false'"
                               v-model="settings.google.display"><label for="google">Google</label></h2>
                    <div class="pure-control-group" v-if="settings.google">
                        <label for="email">Email</label>
                        <input id="email" type="text" v-model="settings.google.email">
    </div>  
                    <div class="pure-control-group" v-if="settings.google">
                        <label for="gpassword">Password</label>
                        <input id="gpassword" type="text" v-model="settings.google.password">
    </div>
    </div>

                <div class="pure-controls">
                    <button class="pure-button pure-button-primary" @click="save">Save</button>
    </div>
    </div>
    </form>
    </div>
    </div>
</template>

<script>
    import io from 'socket.io-client'

    export default {
        components: {},
        data() {
            return {
                socket: io(),
                settings: null,
            }
        },
        created() {
            this.socket.emit('setting.getAll')
            this.socket.on('setting.getAll.result', (settings) => {
                this.settings = settings
            })
        },
        methods: {
            save() {
                this.socket.emit('setting.updateAll', (this.settings))
            },
        },
    }
</script>

<style lang="scss" scoped></style>