<template>
<div class="pure-g">
  <div class="pure-u-1">            
    <div class="card">
      <h1>Settings</h1>
      <form class="pure-form pure-form-aligned" v-if="settings">
        <div class="pure-control-group" v-if="settings.datetime">
          <label class="pure-checkbox" for="datetime">
            <input id="datetime" 
                   type="checkbox" 
                   v-bind:true-value="'true'"
                   v-bind:false-value="'false'"
                   v-model="settings.datetime.display">Date time</label>
  </div>
        <div class="pure-control-group" v-if="settings.esp8266">
          <label class="pure-checkbox" for="esp8266">
            <input id="esp8266" 
                   type="checkbox" 
                   v-bind:true-value="'true'"
                   v-bind:false-value="'false'"
                   v-model="settings.esp8266.display">ESP8266</label>
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
        settings: null,
      }
    },
    created() {
      this.socket.emit('get.setting', (settings) => {
        console.log(settings)
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