<template>
<div class="pure-g">
    <div class="pure-u-1">            
        <div class="card">
            <h1>Settings</h1>
            <form class="pure-form pure-form-aligned">
                <div class="pure-control-group" v-for="setting in settings">
                    <label class="pure-checkbox" :for="setting.name">
                        <input :id="setting.name" 
                               type="checkbox" 
                               v-bind:true-value="'true'"
                               v-bind:false-value="'false'"
                               v-model="setting.value">{{ setting.name }}</label>
    </div>
                <div class="pure-controls">
                    <button class="pure-button pure-button-primary" @click="save">Save</button>
    </div>
    </form>
    </div>
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
                settings: {},
            }
        },
        created() {
            this.socket.emit('get.setting', (settings) => {
                this.settings = settings
            })
            this.socket.on('get.setting', (settings) => {
                this.settings = settings
            })
        },
        methods: {
            save() {
                this.socket.emit('updateAll.setting', (this.settings))
            },
        },
    }
</script>

<style lang="sass">
@import '../sass/card';
@import '../sass/checkbox';
</style>