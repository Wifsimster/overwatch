<template>
<div class="locations">
    <div class="pure-g">
        <div class="pure-u-1 pure-u-lg-1-3">
            <h2>Locations ({{ locations.length }}) 
                <a v-if="!edit" @click="edit = true" title="Edit locations"><i class="material-icons">edit</i></a>
    </h2>
            <div class="locations" v-if="locations.length > 0">
                <form class="pure-form">
                    <fieldset class="pure-group">
                        <ul v-for="location in locations">
                            <li>
                                <span v-if="!edit">{{ location.name }}</span>
                                <input class="pure-input-1" v-if="edit" type="text" v-model="location.name">
                                <a v-if="edit" @click="remove(location)"><i class="material-icons">remove</i></a>
    </li>
    </ul>
    </fieldset>
                    <a class="add" v-if="edit" @click="add">Add one more</a>
                    <button v-if="edit" @click="submit" class="pure-button pure-input-1 pure-button-primary">Edit</button>
    </form>
    </div>
            <div v-else>
                <p>No location found.</p>
    </div>
    </div>
    </div>
    </div>
</template>

<script>
    import io from 'socket.io-client'
    import { mapGetters, mapActions } from 'vuex'

    export default {
        components: {},
        data() {
            return {
                locations: [],
                socket: io(),
                edit: false,
            }
        },
        created() {
            this.socket.emit('location.getAll')
            this.socket.on('location.getAll.result', (locations) => {
                this.locations = locations
            })
        },
        methods: {
            submit() {
                this.socket.emit('location.updateAll', this.locations)
                this.edit = false
            },
            add() {
                this.locations.push({})
            },
            remove(location) {
                this.socket.emit('location.remove', location)
            },
        },
    }  
</script>

<style lang="sass" scoped>
@import '../sass/transition';

.add {
    display: block;
    text-align: center;
    padding: 0 0 10px;
    }

.locations input {
    width: calc(100% - 30px) !important;
    display: inline !important;
    }

</style>