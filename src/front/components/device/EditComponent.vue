<template>
    <modal @close="hide()">
        <div slot="header">Edit</div>
        <div slot="body">
            <form class="pure-form pure-form-aligned" v-if="device">
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
                    <multiselect v-model="device.location" :options="locations" placeholder="Select one location" label="name" selectLabel="" selectedLabel="" deselectLabel=""></multiselect>
                </div>
                <div class="pure-control-group">
                    <label for="type">Type</label>
                    <multiselect v-model="device.types" :options="types" :multiple="true" placeholder="Select at least one type" label="name" selectLabel="" selectedLabel="" deselectLabel="" :close-on-select="false">
                    </multiselect>
                </div>
            </form>
        </div>
        <div slot="footer">
            <button class="pure-button pure-button-primary" @click="update">Update</button>
        </div>
    </modal>
</template>

<script>
const Multiselect = () => import('vue-multiselect')
const Modal = () => import('../ModalComponent.vue')
import Vue from 'vue'
export default {
    components: {
        Multiselect,
        Modal,
    },
    props: {
        id: {
            type: Number,
        },
    },
    computed: {
        ws() {
            return this.$store.getters.ws
        }
    },
    data() {
        return {
            types: [],
            locations: [],
            selectedTypes: [],
            selectedLocation: null,
            refreshRate: null,
            uuid: null,
            device: null
        }
    },
    created() {
        this.uuid = Vue.getUUID()
        this.getDevice()
        this.getLocations()
        this.getTypes()
    },
     watch: {
        ws() {
            this.getDevice()
            this.getLocations()
            this.getTypes()
        }
    },
    methods: {
        setListener() {
            if(this.ws) {           
                this.ws.onmessage = message => {
                    const data = JSON.parse(message.data)
                    if(this.uuid === data.uuid) {
                        if('Device' === data.object && 'findOne' === data.method)  {
                            this.device = data.results
                        }
                        if('Device' === data.object && 'update' === data.method)  {
                            this.$emit('update', data.results)
                        }
                        if('Location' === data.object && 'findAll' === data.method) {
                            this.locations = data.results
                        }
                        if('Type' === data.object && 'findAll' === data.method) {
                            this.types = data.results
                        }
                    }
                }
            }
        },
        getDevice() {
            this.ws.send(JSON.stringify({ object: 'Device', method: 'findOne', parameters:{ id: this.id }, uuid: this.uuid }))
            this.setListener()
        },
        getLocations() {
            this.ws.send(JSON.stringify({ object: 'Location', method: 'findAll', uuid: this.uuid }))
            this.setListener()
        },
        getTypes() {
            this.ws.send(JSON.stringify({ object: 'Type', method: 'findAll', uuid: this.uuid }))
            this.setListener()
        },
        update() {
            this.ws.send(JSON.stringify({ object: 'Device', method: 'update', parameters: this.device, uuid: this.uuid}))
            this.setListener()
        },
        hide() {
            this.$emit('close')
        },
    }
}
</script>

<style lang="scss" scoped>
@import '../../sass/components/device-edit';
</style>