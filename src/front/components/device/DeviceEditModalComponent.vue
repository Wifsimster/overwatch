<template>
    <modal @close="hide()">
        <div slot="header">Edit device</div>
        <div slot="body">
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
                    <label for="location">Location</label>
                    <multiselect :options="locations" placeholder="Select one location" label="name" selectLabel="" selectedLabel="" deselectLabel="" :value="selectedLocation" @input="updateSelectedLocation" v-model="device.location">
                    </multiselect>
                </div>
                <div class="pure-control-group">
                    <label for="type">Type</label>
                    <multiselect :options="types" :multiple="true" placeholder="Select at least one type" label="name" selectLabel="" selectedLabel="" deselectLabel="" :close-on-select="false" :value="selectedTypes" @input="updateSelectedTypes" v-model="device.types">
                    </multiselect>
                </div>
            </form>
        </div>
        <div slot="footer">
            <button class="pure-button pure-button-primary" @click="edit">Edit</button>
        </div>
    </modal>
</template>

<script>
import Multiselect from 'vue-multiselect'
import Modal from '../ModalComponent.vue'
import UUID from '../../mixins/uuid'
export default {
    components: {
        Multiselect,
        Modal,
    },
    props: {
        device: {
            type: Object,
        },
    },
    data() {
        return {
            socket: this.$store.state.socket.socket,
            types: [],
            locations: [],
            selectedTypes: [],
            selectedLocation: null,
            refreshRate: null,
            uuid: null,
        }
    },
    created() {
        this.uuid = UUID.getOne()

        this.socket.emit('type.getAll', { uuid: this.uuid })

        this.socket.on('type.getAll.result.' + this.uuid, data => {
            this.types = data
        })

        this.socket.emit('location.getAll', { uuid: this.uuid })

        this.socket.on('location.getAll.result.' + this.uuid, data => {
            this.locations = data
        })
    },
    watch: {
        device() {
            this.selectedTypes = this.device.types
            this.selectedLocation = this.device.location
        },
    },
    methods: {
        hide() {
            this.$emit('close')
        },
        updateSelectedTypes(types) {
            this.device.types = types
        },
        updateSelectedLocation(location) {
            this.device.locationId = location.id
        },
        edit() {
            this.socket.emit('device.update', { data: this.device, uuid: this.uuid })
            this.socket.on('device.update.result.' + this.uuid, data => {
                this.hide()
            })
        },
    }
}
</script>

<style lang="scss" scoped>
@import '../../sass/components/device-edit'
</style>