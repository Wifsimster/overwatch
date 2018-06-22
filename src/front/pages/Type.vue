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
            types: [],
            edit: false,
        }
    },
    created() {
        this.uuid = Vue.getUUID()
        this.setListener()
        this.getTypes()
    },
    watch: {
        ws() {
            this.setListener()
            this.getTypes()
        }
    },
    methods: {
        submit() {
            this.ws.emit('type.updateAll', { uuid: this.uuid, data: this.types })
        },
        getTypes() {
            if(this.ws) {
                this.ws.send(JSON.stringify({ object: 'Type', method: 'findAll', uuid: this.uuid}))
            }
        },
        setListener() {    
            if(this.ws) {    
                this.ws.onmessage = message => {
                    const data = JSON.parse(message.data)
                    if('findAll' === data.method && this.uuid === data.uuid) {
                        this.types = data.results.types
                    }
                }
            }
        }
    },
}  
</script>

<style lang="scss" scoped>
@import '../sass/transition';
</style>