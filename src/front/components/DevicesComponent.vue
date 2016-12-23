<template>
<div>
    <h2>Devices detected</h2>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Mac</th>
                <th>IP</th>
    </tr>
    </thead>
        <tbody>
            <tr v-for="device in devices">
                <td>{{ device.name }}</td>
                <td>{{ device.mac }}</td>
                <td>{{ device.ip }}</td>
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
                devices: [],
            }
        },
        created() {      
            const socket = io()
            const self = this

            socket.on('devices', function(devices) {
                self.devices = devices
            })

        }
    }  
</script>

<style lang="sass">
</style>