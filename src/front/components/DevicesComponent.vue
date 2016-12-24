<template>
<div>
  <h2>Devices detected ({{ devices.length }}) <a @click="removeAll" title="Remove all devices"><i class="material-icons">delete</i></a></h2>
  <div class="devices" v-if="devices.length > 0">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Mac</th>
          <th>IP</th>
          <th>Type</th>
          <th>Location</th>
          <th>Last seen</th>
          <th></th>
  </tr>
  </thead>
      <tbody>
        <tr v-for="device in devices">
          <td>{{ device.name }}</td>
          <td>{{ device.mac }}</td>
          <td>{{ device.ip }}</td>
          <td>
            <span v-if="device.type">{{ device.type.name }}</span>
            <span v-else>--</span>
  </td>
          <td>
            <span v-if="device.location">{{ device.location.name }}</span>
            <span v-else>--</span>
  </td>
          <td>{{ device.updatedAt | moment('DD/MM/YY HH:mm:ss') }}</td>
          <td>
            <a @click="openModal(device)"><i class="material-icons" title="Edit device info">edit</i></a> 
            <a @click="openRemoveModal(device)" title="Remove the device"><i class="material-icons">remove</i></a>
  </td>
  </tr>
  </tbody>
  </table>
    <edit-device-modal></edit-device-modal>
    <remove-device-modal></remove-device-modal>
  </div>
  <div v-else>
    <p>No device found.</p>
  </div>

  </div>
</template>

<script>
  import io from 'socket.io-client'
  import EditDeviceModal from './EditDeviceModalComponent.vue'
  import RemoveDeviceModal from './RemoveDeviceModalComponent.vue'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    components: {
      EditDeviceModal,
      RemoveDeviceModal,
    },
    data() {
      return {
        devices: [],
        socket: io(),
      }
    },
    created() {
      this.socket.emit('get.device', (devices) => {
        this.devices = devices
      })

      this.socket.on('get.device', (devices) => {
        this.devices = devices
      })
    },
    methods: {
      openModal(device) {
        this.$store.dispatch('openModal', device)
      },
      openRemoveModal(device) {
        this.$store.dispatch('openRemoveModal', device)
      },
      removeAll() { 
        this.socket.emit('removeAll.device') 
      },
    },
  }  
</script>

<style lang="sass">
@import '../sass/transition';
</style>