<template>
<div>
    <h2>Devices detected ({{ devices.length }}) <a @click="removeAll" title="Remove all devices"><i class="material-icons">delete</i></a></h2>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Mac</th>
                <th>IP</th>
                <th>Last seen</th>
                <th></th>
    </tr>
    </thead>
        <tbody>
            <tr v-for="device in devices">
                <td>{{ device.name }}</td>
                <td>{{ device.mac }}</td>
                <td>{{ device.ip }}</td>
                <td>{{ device.updatedAt | moment('DD/MM/YY HH:mm:ss') }}</td>
                <td>
                    <a @click="openModal(device)"><i class="material-icons">edit</i></a> 
                    <a @click="remove(device)"><i class="material-icons">remove</i></a>
    </td>
    </tr>
    </tbody>
    </table>

    <edit-device-modal></edit-device-modal>
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