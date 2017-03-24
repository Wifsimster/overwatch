<template>
<div>
    <h2>MQTT messages ({{ messages.length }}) <a @click="removeAll" title="Remove all messages"><i class="material-icons">delete</i></a></h2>
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
                        <td><a @click="remove(message)" title="Remove the message"><i class="material-icons">remove</i></a></td>
    </tr>
    </tbody>
    </table>
    </div>
        <div v-else>
            <p class="center">No message.</p>
    </div>
    </transition>
    </div>
</template>

<script>
    import io from 'socket.io-client'
    export default {
        data() {
            return {
                messages: [],
                socket: io(),
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
            remove(message) { 
                this.socket.emit('message.remove', message) 
            },
            removeAll() { 
                this.socket.emit('message.removeAll') 
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