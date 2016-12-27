<template>
<transition name="modal">
    <div class="modal-mask" v-show="isOpenModal">
        <div class="modal-wrapper">
            <div class="modal-container">
                <div class="modal-header">
                    <h2>Edit device <a @click="close" class="pull-right">x</a></h2>
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
                            <label for="location">Location</label>
                            <select id="location" v-model="device.locationId">
                                <option v-for="location in locations" :value="location.id">{{ location.name }}</option>
    </select>
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
    import Multiselect from 'vue-multiselect'

    export default {
        components: { Multiselect },
        data() { 
            return {
                socket: io(),
                types: [],
                locations: [],
                selectedTypes: [],
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
        watch: {
            device: function() {
                this.selectedTypes = this.device.types   
            },
        },
        methods: {
            updateSelectedTypes(types) {
                this.device.types = types
            },
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

.multiselect {
    display: inline-block;
    width: 250px;
    }
</style>