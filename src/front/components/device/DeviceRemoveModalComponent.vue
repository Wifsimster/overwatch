<template>
    <modal @close="hide()">
        <div slot="header">Remove a device</div>
        <div slot="body">
            <p>Do you really want to delete this device ?</p>
        </div>
        <div slot="footer">
            <button class="pure-button pure-button-red" @click="remove()">Remove</button>
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
        device: {
            type: Object,
        },
    },
    computed: {
        socket() {
            return this.$store.getters.socket
        }
    },
    data() {
        return {            
            uuid: null,
        }
    },
    created() {
        this.uuid = Vue.getUUID()

        this.socket.on('device.remove.result.' + this.uuid, () => {
            this.$emit('remove')
        })
    },
    methods: {
        remove() {
            this.socket.emit('device.remove', { uuid: this.uuid, id: this.device.id })
        },
        hide() {
            this.$emit('close')
        },
    }
}
</script>