<template>
<div>
  <h2>MQTT messages ({{ messages.length }}) <a @click="removeAll" title="Remove all messages"><i class="material-icons">delete</i></a></h2>
  <transition name="expand">
    <div class="messages" v-if="messages.length > 0">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Data</th>
  </tr>
  </thead>
        <tbody>
          <tr v-for="message in messages">
            <td>{{ message.createdAt | moment('DD/MM/YY HH:mm:ss') }}</td>
            <td>{{ message.data }} <a @click="remove(message)" title="Remove the message"><i class="material-icons">remove</i></a></td>
  </tr>
  </tbody>
  </table>
  </div>
    <div v-else>
      <p>No message found.</p>
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
      this.socket.emit('get.message', (messages) => {
        this.messages = messages
      })

      this.socket.on('get.message', (messages) => {
        this.messages = messages
      })
      
      this.socket.on('new.message', (message) => {
        this.messages.push(message)
      })
    },
    methods: {
      remove(message) { 
        this.socket.emit('remove.message', message) 
      },
      removeAll() { 
        this.socket.emit('removeAll.message') 
      },
    },
  }  
</script>

<style lang="sass">
@import '../sass/transition';
.messages {
  width: 100%;
  max-height: 650px;
  overflow: auto;
  }
</style>