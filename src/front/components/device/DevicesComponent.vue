<template>
<div>
    <h2>Devices <a @click="openRemoveAllModal()" title="Remove all devices"><i class="material-icons">delete</i></a>
    </h2>
    <transition name="opacity">
        <div class="devices" v-if="devices && devices.length > 0">
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
                    <tr v-for="device in devices">
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
                            <a @click="openEditModal(device)">
                                <i class="material-icons" title="Edit device info">edit</i>
    </a> 
                            <a @click="openRemoveModal(device)" title="Remove the device">
                                <i class="material-icons">remove</i>
    </a>
    </td>
    </tr>
    </tbody>
    </table>

            <edit-modal v-if="editShow" 
                        :device="editDevice"
                        @close="editShow = false"></edit-modal>

            <remove-modal v-if="removeShow" 
                          :device="removeDevice"
                          @close="removeShow = false"></remove-modal>

            <remove-all-modal v-if="removeAllShow"
                              @close="removeAllShow = false"></remove-all-modal>

    </div>
        <div v-else>
            <br>
            <p class="center">No device</p>
    </div>
    </transition>
    </div>
</template>

<script>
    import EditModal from './DeviceEditModalComponent.vue'
    import RemoveModal from './DeviceRemoveModalComponent.vue'
    import RemoveAllModal from './DeviceRemoveAllModalComponent.vue'
    export default {
        components: {
            EditModal,
            RemoveModal,
            RemoveAllModal,
        },
        data() {
            return {              
                socket: this.$store.state.socket.socket,
                devices: null,
                editDevice: null,
                removeDevice: null,
                editShow: false,
                removeShow: false,
                removeAllShow: false,
            }
        },
        created() {
            this.socket.emit('device.getAll')
            this.socket.on('device.getAll.result', (devices) => {
                this.devices = devices
            })
            this.socket.on('device.removeAll.result', (rst) => {
                this.devices = null
            })
            this.socket.on('device.add.result', (rst) => {
                this.socket.emit('device.getAll')
            })
        },
        methods: {
            openEditModal(device) {
                this.editShow = true
                this.editDevice = device
            },
            openRemoveModal(device) {
                this.removeShow = true
                this.removeDevice = device
            },
            openRemoveAllModal() {
                this.removeAllShow = true
            },
        },
        watch: {
            editShow(val) {
                this.socket.emit('device.getAll')
            },
            removeShow(val) {
                this.socket.emit('device.getAll')
            },
            removeAllShow(val) {
                this.socket.emit('device.getAll')
            },
        },
    }  
</script>