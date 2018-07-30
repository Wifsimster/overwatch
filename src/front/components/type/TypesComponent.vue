<template>
    <div>
        <h2>Types</h2>
        <transition name="opacity">
            <div class="types" v-if="types && types.length > 0">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Key</th>
                            <th>Last update</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="type in types" :key="type.id">
                            <td>{{ type.name }}</td>
                            <td>{{ type.key }}</td>
                            <td>{{ type.updatedAt | moment('DD/MM/YY HH:mm:ss') }}</td>
                            <td>
                                <a @click="openEditModal(type)">
                                    <i class="material-icons" title="Edit type info">edit</i>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <edit v-if="editShow" :type-id="editType.id" @update="onUpdate" @close="editShow = false"></edit>
            </div>
            <div v-else>
                <br>
                <p class="center">No type.</p>
            </div>
        </transition>
    </div>
</template>

<script>
import Vue from 'vue'
const Edit = () => import('./TypeEditModalComponent.vue')
export default {
    components: {
        Edit
    },
    computed: {
        ws() {
            return this.$store.getters.ws
        }
    },
    data() {
        return {
            uuid: null,
            types: null,
            editType: null,
            editShow: false,
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
        openEditModal(type) {
            this.editShow = true
            this.editType = type
        },
        onUpdate(data) {
            this.types.map((type, index) => {
                if(type.id === data.id) {
                    this.types[index] = data 
                }
            })
            this.editShow = false
        },
        getTypes() {
            this.ws.send(JSON.stringify({ object: 'Type', method: 'findAll', uuid: this.uuid, parameters : { orderBy: 'name'} }))
        },
        setListener() {   
            if(this.ws) {           
                this.ws.onmessage = message => {
                    const data = JSON.parse(message.data)
                    if(this.uuid === data.uuid) {
                        if('Type' === data.object && 'findAll' === data.method) {
                            this.types = data.results
                        }
                    }
                }
            }
        }
    }
}
</script>

