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
                <multiselect
                             :options="locations"
                             placeholder="Select one location"
                             label="name" 
                             selectLabel="" 
                             selectedLabel="" 
                             deselectLabel="" 
                             :value="selectedLocation"
                             @input="updateSelectedLocation"
                             v-model="device.location">
    </multiselect>
    </div>
            <div class="pure-control-group">
                <label for="type">Type</label>
                <multiselect
                             :options="types"
                             :multiple="true"
                             placeholder="Select at least one type"
                             label="name" 
                             selectLabel="" 
                             selectedLabel="" 
                             deselectLabel="" 
                             :close-on-select="false"
                             :value="selectedTypes"
                             @input="updateSelectedTypes"
                             v-model="device.types">
    </multiselect>
    </div>
            <div class="pure-control-group" v-if="refreshRate">
                <label for="message">Refresh rate</label>
                <p class="message">{{ refreshRate }} min</p>
    </div>
            <div class="pure-control-group">
                <label for="message">Last message</label>
                <p class="message">{{ message }}</p>
    </div>
    </form>
    </div>
    <div slot="footer">
        <button class="pure-button pure-button-primary" @click="edit">Edit</button>
        <button class="pure-button" @click="hide()">Cancel</button>
    </div>
    </modal>
</template>

<script>
    import Multiselect from 'vue-multiselect'
    import Modal from '../ModalComponent.vue'
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
                message: '',
                refreshRate: null,
            }
        },
        created() {
            this.socket.emit('type.getAll')
            this.socket.on('type.getAll.result', (types) => {
                this.types = types
            })
            this.socket.emit('location.getAll')
            this.socket.on('location.getAll.result', (locations) => {
                this.locations = locations
            })
        },
        watch: {
            device() {
                this.selectedTypes = this.device.types                
                this.selectedLocation = this.device.location
                if(this.device.messages.length > 0) {
                    this.message = this.device.messages[this.device.messages.length - 1].data
                    this.refreshRate = parseInt(JSON.parse(this.device.messages[this.device.messages.length - 1].data).refresh) / 60000
                }
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
                console.log('loc', this.device.locationId)
            },
            edit() {
                this.socket.emit('device.update', this.device)
                this.hide()
            },
        }
    }
</script>

<style lang="sass" scoped>
.multiselect {
    display: inline-block;
    width: 250px;
    }

.message {
    padding: 0;
    margin: 0;
    overflow: inherit !important;
    white-space: normal !important;
    width: calc(100% - 185px);
    word-wrap: break-word;
    display: inline-block;
    }
</style>