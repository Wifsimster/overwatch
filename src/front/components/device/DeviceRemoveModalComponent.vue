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
import Modal from '../ModalComponent.vue'
import UUID from '../../mixins/uuid'
export default {
    components: { Modal },
    props: {
        device: {
            type: Object,
        },
    },
    data() {
        return {
            socket: this.$store.state.socket.socket,
            uuid: null,
        }
    },
    created() {
        this.uuid = UUID.getOne()
    },
    methods: {
        remove() {
            this.socket.emit('device.remove', { data: this.device, uuid: this.uuid })
            this.socket.on('device.remove.result.' + this.uuid, () => {
                this.$emit('close')
            })
        },
        hide() {
            this.$emit('close')
        },
    }
}
</script>