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
        ws() {
            return this.$store.getters.ws
        }
    },
    data() {
        return {
            uuid: null,
            locations: [],
            edit: false,
        }
    },
    created() {
        this.uuid = Vue.getUUID()
        this.setListener()
        this.getLocations()
    },
    watch: {
        ws() {
            this.setListener()
            this.getLocations()
        }
    },
    methods: {
        setListener() {
            if(this.ws) {           
                this.ws.onmessage = message => {
                    const data = JSON.parse(message.data)
                    if('findAll' === data.method && this.uuid === data.uuid) {
                        this.locations = data.results.locations
                    }
                }
            }
        },
        getLocations() {
            if(this.ws) {
                this.ws.send(JSON.stringify({ object: 'Location', method: 'findAll', uuid: this.uuid}))
            }
        },
        submit() {
           this.getLocations()
        },
        add() {
            this.locations.push({})
        },
        remove(location) {
            if(this.ws) {
                this.ws.send(JSON.stringify({ object: 'Location', method: 'destroy', parameters: { id: location.id }, uuid: this.uuid}))
            }
        },
    },
}  
</script>

<style lang="scss" scoped>
@import '../sass/components/location';
</style>