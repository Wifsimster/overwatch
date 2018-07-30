j<template>
    <div>
        <h2>Messages
            <a @click="openRemoveAllModal()" title="Remove all messages">
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
            <div class="messages" v-if="messages && messages.length > 0">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Message</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="message in messages" :key="message.id">
                            <td>{{ message.createdAt | moment('DD/MM/YY HH:mm:ss') }}</td>
                            <td>{{ message.data }}</td>
                            <td>
                                <a @click="openRemoveModal(message)" title="Remove the message">
                                    <i class="material-icons">remove</i>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else>
                <br>
                <p class="center">No {{ type }} message</p>
            </div>
        </transition>
    
        <remove-modal v-if="removeShow" :messageId="removeMessage.id" @remove="onRemove" @close="removeShow = false"></remove-modal>
        <remove-all-modal v-if="removeAllShow" @removeAll="onRemoveAll" @close="removeAllShow = false"></remove-all-modal>
    </div>
</template>

<script>
import Vue from 'vue'
const RemoveModal = () => import('./MessageRemoveModalComponent.vue')
const RemoveAllModal = () => import('./MessageRemoveAllModalComponent.vue')
export default {
    components: {
        RemoveModal,
        RemoveAllModal,
    },
    computed: {
        ws() {
            return this.$store.getters.ws
        },
        filters() {
            return this.$store.getters.filters
        },
    },
    data() {
        return {
            uuid: null,
            messages: null,
            removeMessage: null,
            removeShow: false,
            removeAllShow: false,
            type: 'data',
        }
    },
     created() {
        this.uuid = Vue.getUUID()
        this.setListener()
        this.getMessages()
    },
    watch: {
        ws() {
            this.setListener()
            this.getMessages()
        },
        type() {
            this.setListener()
            this.getMessages()
        }
    },
    methods: {
        setListener() {
            if(this.ws) {
                this.ws.onmessage = message => {
                    const data = JSON.parse(message.data)
                    if(this.uuid === data.uuid) {
                        if('Message' === data.object && 'findAll' === data.method) {
                            this.messages = data.results
                        }
                    }
                }
            }
        },
        getMessages() {
            if(this.ws) {
                this.ws.send(JSON.stringify({ object: 'Message', method: 'findAll', parameters: { type: this.type, limit: 22, offset: 0 }, uuid: this.uuid}))
            }
        },
        openRemoveModal(message) {
            this.removeShow = true
            this.removeMessage = message
        },
        openRemoveAllModal() {
            this.removeAllShow = true
        },
        onRemove() {
            this.messages.map((message, index) => {
                if(message.id === this.removeMessage.id) {
                    this.messages.splice(index, 1)
                }
            })
            this.removeShow = false
        },
        onRemoveAll() {
            this.messages = null
            this.removeAllShow = false
        },
    }
}  
</script>

<style lang="scss" scoped>
@import '../../sass/components/messages';
</style>