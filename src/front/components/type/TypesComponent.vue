<template>
    <div>
        <h2>Types
            <a @click="createModalShow = true" title="Create"><i class="material-icons">add</i></a>
        </h2>
        <transition name="opacity">
            <div v-if="list && list.length > 0">
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
                        <tr v-for="item in list" :key="item.id">
                            <td>{{ item.name }}</td>
                            <td>{{ item.key }}</td>
                            <td>{{ item.updatedAt | moment('DD/MM/YY HH:mm:ss') }}</td>
                            <td>
                                <a @click="openEditModal(item)">
                                    <i class="material-icons" title="Edit">edit</i>
                                </a>
                                 <a @click="openDestroyModal(item)">
                                    <i class="material-icons" title="Destroy">delete</i>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <create v-if="createModalShow" @create="onCreate" @close="createModalShow = false"></create>
                <edit v-if="editModalShow" :id="selected.id" @update="onUpdate" @close="editModalShow = false"></edit>
                <destroy v-if="destroyModalShow" :id="selected.id" @destroy="onDestroy" @close="destroyModalShow = false"></destroy>
            </div>
            <div v-else>
                <br>
                <p class="center">No item.</p>
            </div>
        </transition>
    </div>
</template>

<script>
import Vue from 'vue'
const Create = () => import('./CreateComponent.vue')
const Edit = () => import('./EditComponent.vue')
const Destroy = () => import('./DestroyComponent.vue')
export default {
    components: {
        Create,
        Edit,
        Destroy
    },
    data() {
        return {
            uuid: null,
            list: null,
            selected: null,
            editModalShow: false,
            createModalShow: false,
            destroyModalShow: false
        }
    },
    created() {
        this.uuid = Vue.getUUID()
        this.getList()
    },
    methods: {
        openEditModal(item) {
            this.editModalShow = true
            this.selected = item
        },
        openDestroyModal(item) {
            this.destroyModalShow = true
            this.selected = item
        },
        onUpdate(data) {
            this.list.map((item, index) => {
                if(item.id === data.id) {
                    this.list[index] = data 
                }
            })
            this.editModalShow = false
        },
        onCreate(data) {
            this.getList()
            this.createModalShow = false
        },
        onDestroy(data) {
            this.getList()
            this.destroyModalShow = false
        },
        getList() {
            this.$ws.send(JSON.stringify({ object: 'Type', method: 'findAll', uuid: this.uuid, parameters : { orderBy: 'name'} }))       
            this.$ws.onmessage = message => {
                const data = JSON.parse(message.data)
                if(this.uuid === data.uuid) {
                    if('Type' === data.object && 'findAll' === data.method) {
                        this.list = data.results
                    }
                }
            }
        }
    }
}
</script>

