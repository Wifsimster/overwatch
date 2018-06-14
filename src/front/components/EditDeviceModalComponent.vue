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
                                    <option v-for="location in locations" :key="location.id" :value="location.id">{{ location.name }}</option>
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
                    <div class="modal-footer">
                        <button class="pure-button pure-button-primary" @click="edit">Edit</button>
                        <button class="pure-button" @click="close">Cancel</button>
                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
const Multiselect = () => import('vue-multiselect')
export default {
    components: { 
        Multiselect 
    },
    computed: {
        socket() {
            return this.$store.getters.socket
        },
    },
    data() { 
        return {
            types: [],
            locations: [],
            selectedTypes: [],
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
            this.message = this.device.messages[this.device.messages.length - 1].data
            this.refreshRate = parseInt(JSON.parse(this.device.messages[this.device.messages.length - 1].data).refresh) / 60000
        },
    },
    methods: {
        updateSelectedTypes(types) {
            this.device.types = types
        },
        edit() {
            this.socket.emit('device.update', this.device)
            this.$store.commit('closeModal')
        },
        close() {
            this.$store.commit('closeModal')
        },
    }
}
</script>

<style lang="scss" scoped>
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