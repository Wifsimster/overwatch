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
                    <tr v-for="message in messages" :key="message.createdAt">
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
export default {        
    computed: {
        ws() {
            return this.$store.getters.ws
        },
    },
    data() {
        return {
            messages: [],
        }
    },
    created() {
        this.ws.emit('message.getAll')
        this.ws.on('message.getAll.result', (messages) => {
            this.messages = messages
        })
        this.ws.on('message.remove.result', (rst) => {
            this.ws.emit('message.getAll')
        })
        this.ws.on('message.removeAll.result', (rst) => {
            this.messages = []
        })
        this.ws.on('message.add.result', (rst) => {
            this.ws.emit('message.getAll')
        })
    },
    methods: {
        remove(message) { 
            this.ws.emit('message.remove', message) 
        },
        removeAll() { 
            this.ws.emit('message.removeAll') 
        },
    },
}  
</script>

<style lang="scss" scoped>
.messages {
  width: 100%;
  max-height: 650px;
  overflow: auto;
}
</style>