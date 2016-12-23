<template>
<div>
    <h2>Devices detected ({{ devices.length }}) <a @click="removeAll" title="Remove all devices"><i class="material-icons">delete</i></a></h2>
    <transition name="expand">
        <div class="devices" v-if="devices.length > 0">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Mac</th>
                        <th>IP</th>
                        <th>Type</th>
                        <th>Last seen</th>
                        <th></th>
    </tr>
    </thead>
                <tbody>
                    <tr v-for="device in devices">
                        <td>{{ device.name }}</td>
                        <td>{{ device.mac }}</td>
                        <td>{{ device.ip }}</td>
                        <td>{{ device.type.name }}</td>
                        <td>{{ device.updatedAt | moment('DD/MM/YY HH:mm:ss') }}</td>
                        <td>
                            <a @click="openModal(device)"><i class="material-icons" title="Edit device info">edit</i></a> 
                            <a @click="remove(device)" title="Remove the device"><i class="material-icons">remove</i></a>
    </td>
    </tr>
    </tbody>
    </table>
            <edit-device-modal></edit-device-modal>
    </div>
        <div v-else>
            <p>No device found.</p>
    </div>
    </transition>
    </div>
</template>

<script>
    import io from 'socket.io-client'
    import EditDeviceModal from './EditDeviceModalComponent.vue'
    import { mapGetters, mapActions } from 'vuex'

    export default {
        components: {
            EditDeviceModal,
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
            remove(device) { 
                this.socket.emit('remove.device', device) 
            },
            removeAll() { 
                this.socket.emit('removeAll.device') 
            },
        },
    }  
</script>

<style lang="sass">
</style>