<template>
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
    
        <remove-modal v-if="removeShow" :message="removeMessage" @remove="onRemove" @close="removeShow = false"></remove-modal>
        <remove-all-modal v-if="removeAllShow" @removeAll="onRemoveAll" @close="removeAllShow = false"></remove-all-modal>
    </div>
</template>

<script>
import RemoveModal from './MessageRemoveModalComponent.vue'
import RemoveAllModal from './MessageRemoveAllModalComponent.vue'
import UUID from '../../mixins/uuid'
export default {
    components: {
        RemoveModal,
        RemoveAllModal,
    },
    data() {
        return {
            removeMessage: null,
            removeShow: false,
            removeAllShow: false,
            type: 'data',
            uuid: null,
        }
    },
    computed: {
        socket() {
            return this.$store.getters.socket
        },
        messages() {
            return this.$store.getters.messages
        },
        filters() {
            return this.$store.getters.filters
        },
    },
    created() {
        this.uuid = UUID.getOne()

        this.getMessages()

        this.socket.on('message.remove.result.' + this.uuid, data => {
            this.getMessages()
        })

        this.socket.on('message.removeAll.result.' + this.uuid, data => {
            this.getMessages()
        })

        this.socket.on('message.add.result', data => {
            this.getMessages()
        })

        this.socket.on('message.getAll.result.' + this.uuid, data => {
            this.$store.dispatch('setMessages', data)
        })

        this.socket.on('message.getAll.result', data => {
            console.log('Broadcast message')
        })

    },
    methods: {
        getMessages() {
            this.socket.emit('message.getAll', {
                type: this.type,
                limit: 22,
                offset: 0,
                uuid: this.uuid
            })
        },
        openRemoveModal(message) {
            this.removeShow = true
            this.removeMessage = message
        },
        openRemoveAllModal() {
            this.removeAllShow = true
        },
        onRemove() {
            this.getMessages()
            this.removeShow = false
        },
        onRemoveAll() {
            this.getMessages()
            this.removeAllShow = false
        },
    },
    watch: {
        type(val) {
            this.getMessages()
        },
    },
}  
</script>

<style lang="scss" scoped>
@import '../../sass/components/messages'
</style>