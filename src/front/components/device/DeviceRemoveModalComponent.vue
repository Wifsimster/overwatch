<template>
    <modal @close="hide()">
        <div slot="header">Remove a device</div>
        <div slot="body">
            <p v-if="device">Remove {{ device.name }} ?</p>
        </div>
        <div slot="footer">
            <button class="pure-button pure-button-red" @click="destroy()">Remove</button>
        </div>
    </modal>
</template>

<script>
const Modal = () => import('../ModalComponent.vue')
import Vue from 'vue'
export default {
    components: { 
        Modal 
    },
    props: {
        deviceId: {
            type: Number,
        },
    },
    computed: {
        ws() {
            return this.$store.getters.ws
        }
    },
    data() {
        return {            
            uuid: null,
            device: null
        }
    },
    created() {
        this.uuid = Vue.getUUID()
        this.setListener()
        this.getDevice()
    },
     watch: {
        ws() {
            this.setListener()
            this.getDevice()
        }
    },
    methods: {
        setListener() {
            if(this.ws) {           
                this.ws.onmessage = message => {
                    const data = JSON.parse(message.data)
                    if(this.uuid === data.uuid) {
                        if('Device' === data.object && 'findOne' === data.method)  {
                            this.device = data.results
                        }
                        if('Device' === data.object && 'destroy' === data.method)  {
                            this.$emit('remove', data.results)
                        }
                    }
                }
            }
        },
        getDevice() {
            this.ws.send(JSON.stringify({ object: 'Device', method: 'findOne', parameters: { id: this.deviceId }, uuid: this.uuid }))
        },
        destroy() {
            this.ws.send(JSON.stringify({ object: 'Device', method: 'destroy', parameters: { id: this.deviceId }, uuid: this.uuid}))
        },
        hide() {
            this.$emit('close')
        },
    }
}
</script>