<template>
<div>
    <h2>Devices ({{ devices.length }}) <a @click="removeAll" title="Remove all devices"><i class="material-icons">delete</i></a></h2>
    <div class="devices" v-if="devices.length > 0">
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Mac</th>
                    <th>IP</th>
                    <th>Types</th>
                    <th>Location</th>
                    <th>Last update</th>
                    <th></th>
    </tr>
    </thead>
            <tbody>
                <tr v-for="device in devices" :key="device.id">
                    <td>{{ device.name }}</td>
                    <td>{{ device.mac }}</td>
                    <td>{{ device.ip }}</td>
                    <td>
                        <span v-if="device.types">
                            <span v-if="device.types.length === 0">--</span>
                            <span v-if="device.types.length === 1">{{ device.types[0].name }}</span>
                            <span v-if="device.types.length > 1">Multiples</span>
    </span>
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
        <p class="center">No device.</p>
    </div>

    </div>
</template>

<script>
const EditDeviceModal = () => import('./EditDeviceModalComponent.vue')
const RemoveDeviceModal = () => import('./RemoveDeviceModalComponent.vue')
export default {
    components: {
        EditDeviceModal,
        RemoveDeviceModal,
    },
    computed: {
        socket() {
            return this.$store.getters.socket
        },
    },
    data() {
        return {
            devices: [],
            socket: io(),
        }
    },
    created() {
        this.socket.emit('device.getAll')
        this.socket.on('device.getAll.result', (devices) => {
            this.devices = devices
        })
        this.socket.on('device.removeAll.result', (rst) => {
            this.devices = []
        })
        this.socket.on('device.add.result', (rst) => {
            this.socket.emit('device.getAll')
        })
    },
    methods: {
        openModal(device) {
            this.$store.commit('openModal', device)
        },
        openRemoveModal(device) {
            this.$store.commit('openRemoveModal', device)
        },
        removeAll() { 
            this.socket.emit('device.removeAll') 
        },
    },
}  
</script>

<style lang="scss" scoped></style>