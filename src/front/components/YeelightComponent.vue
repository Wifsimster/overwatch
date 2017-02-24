<template>
<div>
    <div class="device">
        <div class="image"><img :src="icons.dimmer"></div>
        <span class="data"></span>
        <span class="name">{{ light.id }}</span>
        <span class="location">{{ light.model }}</span>
        <a @click="toggle(light.id)">Toggle</a>
        <br>
        <a @click="getValues(light.id)">Get values</a>
    </div>
    </div>
</template>

<script>
    import io from 'socket.io-client'
    export default {
        props: {
            light: Object,
        },
        data() {
            return {
                socket: io(),
            }
        },
        methods: {
            toggle(id) {
                this.socket.emit('toggle.light', id)
                this.socket.on('toggle.light.return', (rst) => {
                    console.log('Toggle RST', rst)
                })
                this.socket.on('toggle.light.error', (err) => {
                    this.$store.commit('setAlert', {type: 'error', message: err})
                })
            },
            getValues(id) {
                this.socket.emit('get.light.values', id)
                this.socket.on('get.light.values.return', (rst) => {
                    console.log('Get values RST', rst)
                })
                this.socket.on('get.light.values.error', (err) => {
                    this.$store.commit('setAlert', {type: 'error', message: err})
                })
            },
        },
        created() {
        }
    }
</script>

<style lang="sass"></style>