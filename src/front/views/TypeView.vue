<template>
    <div>
        <div class="pure-g">
            <div class="pure-u-1 pure-u-lg-1-3">
                <h2>Types ({{ types.length }})
                    <a @click="edit = true" title="Edit thes types">
                        <i class="material-icons">edit</i>
                    </a>
                </h2>
                <div class="types" v-if="types.length > 0">
                    <form class="pure-form">
                        <fieldset class="pure-group">
                            <ul v-for="type in types" :key="type.id">
                                <li>
                                    <span v-if="!edit">{{ type.name }}</span>
                                    <input class="pure-input-1" v-if="edit" type="text" v-model="type.name">
                                </li>
                            </ul>
                        </fieldset>
                        <button v-if="edit" @click="submit" class="pure-button pure-input-1 pure-button-primary">Edit</button>
                    </form>
                </div>
                <div v-else>
                    <p>No type found.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    components: {},
    data() {
        return {
            types: [],
            socket: this.$store.state.socket.socket,
            edit: false,
        }
    },
    created() {
        this.socket.emit('type.getAll')
        this.socket.on('type.getAll.result', (types) => {
            this.types = types
        })
    },
    methods: {
        submit() {
            this.socket.emit('type.updateAll', this.types)
            this.edit = false
        },
    },
}  
</script>

<style lang="scss" scoped>
@import '../sass/transition'
</style>