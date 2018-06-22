<template>
    <div>
        <h2>Devices
            <a @click="openRemoveAllModal()" title="Remove all devices">
                <i class="material-icons">delete</i>
            </a>
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
                <edit v-if="editShow" :device="editDevice" @update="onUpdate" @close="editShow = false"></edit>    
                <remove v-if="removeShow" :device="removeDevice" @remove="onRemove" @close="removeShow = false"></remove>    
                <remove-all v-if="removeAllShow" @removeAll="onRemoveAll" @close="removeAllShow = false"></remove-all>    
            </div>
            <div v-else>
                <br>
                <p class="center">No device</p>
            </div>
        </transition>
    </div>
</template>

<script>
import Vue from 'vue'
const Edit = () => import('./DeviceEditModalComponent.vue')
const Remove = () => import('./DeviceRemoveModalComponent.vue')
const RemoveAll = () => import('./DeviceRemoveAllModalComponent.vue')
export default {
    components: {
        Edit,
        Remove,
        RemoveAll,
    },
    computed: {
        ws() {
            return this.$store.getters.ws
        }
    },
    data() {
        return {
            uuid: null,   
            devices: null,
            editDevice: null,
            removeDevice: null,
            editShow: false,
            removeShow: false,
            removeAllShow: false,
        }
    },
    created() {
        this.uuid = Vue.getUUID()
        this.setListener()
        this.getDevices()
    },
    watch: {
        ws() {
            this.setListener()
            this.getDevices()
        }
    },
    methods: {
        setListener() {
            if(this.ws) {           
                this.ws.onmessage = message => {
                    const data = JSON.parse(message.data)
                    if('findAll' === data.method && this.uuid === data.uuid) {
                        this.devices = data.results.devices
                    }
                }
            }
        },
        getDevices() {
            if(this.ws) {
                this.ws.send(JSON.stringify({ object: 'Device', method: 'findAll', uuid: this.uuid}))
            }
        },
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
        onRemove() {
            this.getDevices()
            this.removeShow = false
        },
        onRemoveAll() {
            this.getDevices()
            this.removeAllShow = false
        },
        onUpdate() {
            this.getDevices()
            this.editShow = false
        },
    }
}  
</script>