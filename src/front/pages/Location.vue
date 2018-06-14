<template>
    <div class="locations">
        <div class="pure-g">
            <div class="pure-u-1 pure-u-lg-1-3">
                <h2>Locations ({{ locations.length }})
                    <a v-if="!edit" @click="edit = true" title="Edit locations">
                        <i class="material-icons">edit</i>
                    </a>
                </h2>
                <div class="locations" v-if="locations.length > 0">
                    <div class="pure-form">
                        <fieldset class="pure-group">
                            <ul>
                                <li v-for="location in locations" :key="location.id">
                                    <span v-if="!edit">{{ location.name }}</span>
                                    <input class="pure-input-1" v-if="edit" type="text" v-model="location.name">
                                    <a v-if="edit" @click="remove(location)">
                                        <i class="material-icons">remove</i>
                                    </a>
                                </li>
                            </ul>
                        </fieldset>
                        <a class="add" v-if="edit" @click="add">Add one more</a>
                        <button v-if="edit" @click="submit" class="pure-button pure-input-1 pure-button-primary">Edit</button>
                    </div>
                </div>
                <div v-else>
                    <p>No location found.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
export default {    
    computed: {
        socket() {
            return this.$store.getters.socket.socket
        }
    },
    data() {
        return {
            locations: [],
            edit: false,
            uuid: null,
        }
    },
    created() {
        this.uuid = Vue.getUUID()

        this.socket.emit('location.getAll', { uuid: this.uuid })

        this.socket.on('location.getAll.result.' + this.uuid, data => {
            this.locations = data
        })

        this.socket.on('location.updateAll.result.' + this.uuid, data => {
            this.edit = false
            this.socket.emit('location.getAll', { uuid: this.uuid })
        })

        this.socket.on('location.remove.result.' + this.uuid, data => {
            this.edit = false
        })

        this.socket.on('location.getAll.error', err => {
            console.log('Error :', err)
            this.$store.dispatch('setAlert', { type: 'error' })
        })

        this.socket.on('location.updateAll.error', err => {
            console.log('Error :', err)
            this.$store.dispatch('setAlert', { type: 'error' })
        })

        this.socket.on('location.remove.error', err => {
            console.log('Error :', err)
            this.$store.dispatch('setAlert', { type: 'error' })
        })
    },
    methods: {
        submit() {
            this.socket.emit('location.updateAll', { uuid: this.uuid, data: this.locations })
        },
        add() {
            this.locations.push({})
        },
        remove(location) {
            this.socket.emit('location.remove', { uuid: this.uuid, id: location.id })
        },
    },
}  
</script>

<style lang="scss" scoped>
@import '../sass/components/location';
</style>