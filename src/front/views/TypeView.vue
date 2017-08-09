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
                    <div class="pure-form">
                        <fieldset class="pure-group">
                            <ul>
                                <li v-for="type in types" :key="type.id">
                                    <span v-if="!edit">{{ type.name }}</span>
                                    <input class="pure-input-1" v-if="edit" type="text" v-model="type.name">
                                </li>
                            </ul>
                        </fieldset>
                        <button v-if="edit" @click="submit" class="pure-button pure-input-1 pure-button-primary">Edit</button>
                    </div>
                </div>
                <div v-else>
                    <p>No type found.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UUID from '../mixins/uuid'
export default {
    components: {},
    data() {
        return {
            types: [],
            socket: this.$store.state.socket.socket,
            edit: false,
            uuid: null,
        }
    },
    created() {
        this.uuid = UUID.getOne()

        this.socket.emit('type.getAll', { uuid: this.uuid })

        this.socket.on('type.getAll.result.' + this.uuid, data => {
            this.types = data
        })

        this.socket.on('type.updateAll.result.' + this.uuid, data => {
            this.edit = false
        })

        this.socket.on('type.updateAll.error', err => {
            console.log('Error :', err)
            this.$store.dispatch('setAlert', { type: 'error' })
        })
    },
    methods: {
        submit() {
            this.socket.emit('type.updateAll', { uuid: this.uuid, data: this.types })
        },
    },
}  
</script>