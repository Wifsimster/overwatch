<template>
<transition name="modal">
  <div class="modal-mask" v-show="isOpenModal">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <h2>Edit device <a @click="close" class="pull-right">x</a></h2>
  </div>

        <div class="pure-g" v-show="error" transition="expand">
          <div class="pure-u-1">
            <div class="alert alert-error">
              <p>{{ error }}</p>
  </div>
  </div>
  </div>            
        <div class="modal-body modal-lg">
          <form class="pure-form pure-form-aligned">
            <div class="pure-control-group">
              <label for="name">Name</label>
              <input id="name" type="text" v-model="device.name">
  </div>
            <div class="pure-control-group">
              <label for="mac">MAC</label>
              <input id="mac" type="text" v-model="device.mac" readonly>
  </div>
            <div class="pure-control-group">
              <label for="ip">IP</label>
              <input id="ip" type="text" v-model="device.ip" readonly>
  </div>
            <div class="pure-control-group">
              <label for="type">Type</label>
              <select id="type" v-model="device.typeId">
                <option v-for="type in types" :value="type.id">{{ type.name }}</option>
  </select>
  </div>
            <div class="pure-control-group">
              <label for="location">Location</label>
              <select id="location" v-model="device.locationId">
                <option v-for="location in locations" :value="location.id">{{ location.name }}</option>
  </select>
  </div>
  </div>
          <div class="modal-footer">
            <button class="pure-button pure-button-primary" @click="edit">Edit</button>
            <button class="pure-button" @click="close">Cancel</button>
            <div class="clearfix"></div>
  </div>
  </form>
  </div>
  </div>
  </div>
  </transition>
</template>

<script>
  import io from 'socket.io-client'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data() { 
      return {
        error: '',
        socket: io(),
        types: [],
        locations: [],
      }
    },
    computed: {
      ...mapGetters({
        isOpenModal: 'modal',
        device: 'device',
      })
    },
    created() {
      this.socket.emit('get.type', (types) => {
        this.types = types
      })
      this.socket.emit('get.location', (locations) => {
        this.locations = locations
      })
    },
    methods: {
      edit() {
        this.socket.emit('update.device', this.device)
        this.$store.dispatch('closeModal')
      },
      close() {
        this.$store.dispatch('closeModal')
      },
    }
  }
</script>

<style lang="sass" scoped>
@import '../sass/modal';
</style>