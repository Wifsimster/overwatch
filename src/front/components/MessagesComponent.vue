<template>
<div>
  <h2>MQTT messages</h2>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Date</th>
        <th>Temperature</th>
        <th>Humidity</th>
  </tr>
  </thead>
    <tbody>
      <tr v-for="message in messages">
        <td>{{ message.id }}</td>
        <td>{{ message.createdAt }}</td>
        <td>{{ message.temperature }}</td>
        <td>{{ message.humidity }}</td>
  </tr>
  </tbody>
  </table>
  </div>
</template>

<script>
  import io from 'socket.io-client'

  export default {
    data() {
      return {
        messages: [],
      }
    },
    created() {      
      const socket = io()
      const self = this
      
      socket.on('messages', function(messages) {
        self.messages = messages
      })

      socket.on('mqttMessage', function(msg) {
        console.log('message', msg)
        self.messages.push(msg)
      })

    }
  }  
</script>

<style lang="sass">
</style>