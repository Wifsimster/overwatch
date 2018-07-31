<template>
    <div>
        <h2>Messages
            <a @click="openDestroyAllModal()" title="Destroy all">
                <i class="material-icons">delete</i>
            </a>
        </h2>
    
        <div class="tabs">
            <a @click="type = 'data'" :class="{ 'active':type === 'data' }">Data</a>
            <a @click="type = 'online'" :class="{ 'active':type === 'online' }">Online</a>
            <a @click="type = 'new'" :class="{ 'active':type === 'new' }">New</a>
            <a @click="type = 'ping'" :class="{ 'active':type === 'ping' }">Ping</a>
        </div>
    
        <transition name="opacity">
            <div class="messages" v-if="list && list.length > 0">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Message</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in list" :key="item.id">
                            <td>{{ item.createdAt | moment('DD/MM/YY HH:mm:ss') }}</td>
                            <td>{{ item.data }}</td>
                            <td>
                                <a @click="openDestroyModal(item)" title="Destroy">
                                    <i class="material-icons">delete</i>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else>
                <br>
                <p class="center">No item.</p>
            </div>
        </transition>    
        <destroy v-if="destroyModalShow" :id="selected.id" @destroy="onDestroy" @close="destroyModalShow = false"></destroy>
        <destroy-all v-if="destroyAllModalShow" @destroyAll="onDestroyAll" @close="destroyAllModalShow = false"></destroy-all>
    </div>
</template>

<script>
import Vue from 'vue'
const Destroy = () => import('./DestroyComponent.vue')
const DestroyAll = () => import('./DestroyAllComponent.vue')
export default {
    components: {
        Destroy,
        DestroyAll,
    },
    computed: {
        filters() {
            return this.$store.getters.filters
        },
    },
    data() {
        return {
            uuid: null,
            list: null,
            selected: null,
            destroyModalShow: false,
            destroyAllModalShow: false,
            type: 'data',
        }
    },
     created() {
        this.uuid = Vue.getUUID()
        this.getList()
        this.setListener()
    },
    watch: {
        type() {
            this.getList()
        }
    },
    methods: {
        setListener() {
            this.$ws.onmessage = message => {
                const data = JSON.parse(message.data)
                if(this.uuid === data.uuid) {
                    if('Message' === data.object && 'findAll' === data.method) {
                        this.list = data.results
                    }
                }
            }
        },
        getList() {
            this.$ws.send(JSON.stringify({ object: 'Message', method: 'findAll', parameters: { type: this.type, limit: 22, offset: 0 }, uuid: this.uuid}))
            this.setListener()
        },
        openDestroyModal(item) {
            this.destroyModalShow = true
            this.selected = item
        },
        openDestroyAllModal() {
            this.destroyAllModalShow = true
        },
        onDestroy() {
            this.list.map((item, index) => {
                if(item.id === this.selected.id) {
                    this.list.splice(index, 1)
                }
            })
            this.destroyModalShow = false
        },
        onDestroyAll() {
            this.list = null
            this.destroyAllModalShow = false
        },
    }
}  
</script>

<style lang="scss" scoped>
@import '../../sass/components/messages';
</style>