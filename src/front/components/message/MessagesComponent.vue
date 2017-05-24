<template>
<div>
    <h2>MQTT messages ({{ messages.length }}) <a @click="openRemoveAllModal()" title="Remove all messages"><i class="material-icons">delete</i></a></h2>
    <transition name="expand">
        <div class="messages" v-if="messages.length > 0">
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Mac</th>
                        <th>Message</th>
                        <th></th>
    </tr>
    </thead>
                <tbody>
                    <tr v-for="message in messages">
                        <td>{{ message.createdAt | moment('DD/MM/YY HH:mm:ss') }}</td>
                        <td><span v-if="message.device && message.device.mac">{{ message.device.mac }}</span></td>
                        <td>{{ message.data }}</td>
                        <td><a @click="openRemoveModal(message)" title="Remove the message"><i class="material-icons">remove</i></a></td>
    </tr>
    </tbody>
    </table>
    </div>
        <div v-else>
            <p class="center">No message.</p>
    </div>
    </transition>

    <remove-modal v-if="removeShow" 
                  :message="removeMessage"
                  @close="removeShow = false"></remove-modal>

    <remove-all-modal v-if="removeAllShow"
                      @close="removeAllShow = false"></remove-all-modal>
    </div>
</template>

<script>
    import RemoveModal from './MessageRemoveModalComponent.vue'
    import RemoveAllModal from './MessageRemoveAllModalComponent.vue'
    export default {
        components: {            
            RemoveModal,
            RemoveAllModal,
        },
        data() {
            return {
                messages: [],                
                socket: this.$store.state.socket.socket,
                removeShow: false,
                removeAllShow: false,
                removeMessage: null,
            }
        },
        created() {
            this.socket.emit('message.getAll')
            this.socket.on('message.getAll.result', (messages) => {
                this.messages = messages
            })
            this.socket.on('message.remove.result', (rst) => {
                this.socket.emit('message.getAll')
            })
            this.socket.on('message.removeAll.result', (rst) => {
                this.messages = []
            })
            this.socket.on('message.add.result', (rst) => {
                this.socket.emit('message.getAll')
            })
        },
        methods: {
            openRemoveModal(message) {
                this.removeShow = true
                this.removeMessage = message
            },
            openRemoveAllModal() {
                this.removeAllShow = true
            },
        },
        watch: {
            removeShow(val) {
                this.socket.emit('message.getAll')
            },
            removeAllShow(val) {
                this.socket.emit('message.getAll')
            },
        },
    }  
</script>

<style lang="sass" scoped>
.messages {
    width: 100%;
    max-height: 650px;
    overflow: auto;
    }
</style>