<template>
    <div>
        <h2>Devices</h2>
        <transition name="opacity">
            <div class="devices" v-if="list && list.length > 0">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Mac</th>
                            <th>IP</th>
                            <th>Types</th>
                            <th>Location</th>
                            <th>Last update</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in list" :key="item.id">
                            <td>{{ item.name }}</td>
                            <td>{{ item.mac }}</td>
                            <td>{{ item.ip }}</td>
                            <td>
                                <span v-if="item.types">
                                    <span v-if="item.types.length === 0">--</span>
                                    <span v-if="item.types.length === 1">{{ item.types[0].name }}</span>
                                    <span v-if="item.types.length > 1">Multiples</span>
                                </span>
                            </td>
                            <td>
                                <span v-if="item.location">{{ item.location.name }}</span>
                                <span v-else>--</span>
                            </td>
                            <td>{{ item.updatedAt | moment('DD/MM/YY HH:mm:ss') }}</td>
                            <td>
                                <a @click="openEditModal(item)">
                                    <i class="material-icons" title="Edit">edit</i>
                                </a>
                                <a @click="openDestroyModal(item)" title="Destroy">
                                    <i class="material-icons">delete</i>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
const Edit = () => import('./EditComponent.vue')
const Destroy = () => import('./DestroyComponent.vue')
export default {
    components: {
        Edit,
        Destroy
    },
    data() {
        return {
            uuid: null,
            list: null,
            selected: null,
            editModalShow: false,
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
        onDestroy(data) {
            this.getList()
            this.destroyModalShow = false
        },
        getList() {
            this.$ws.send(JSON.stringify({ object: 'Device', method: 'findAll', uuid: this.uuid, parameters : { orderBy: 'name'} }))
            this.$ws.onmessage = message => {
                const data = JSON.parse(message.data)
                if(this.uuid === data.uuid) {
                    if('Device' === data.object && 'findAll' === data.method) {
                        this.list = data.results
                    }
                }
            }
        }
    }
}  
</script>