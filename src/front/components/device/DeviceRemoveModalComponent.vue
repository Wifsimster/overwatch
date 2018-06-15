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
        ws() {
            return this.$store.getters.ws
        }
    },
    data() {
        return {            
            uuid: null,
        }
    },
    created() {
        this.uuid = Vue.getUUID()

        this.ws.on('device.remove.result.' + this.uuid, () => {
            this.$emit('remove')
        })
    },
    methods: {
        remove() {
            this.ws.emit('device.remove', { uuid: this.uuid, id: this.device.id })
        },
        hide() {
            this.$emit('close')
        },
    }
}
</script>