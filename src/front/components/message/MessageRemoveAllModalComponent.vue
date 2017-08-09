<template>
    <modal @close="hide()">
        <div slot="header">Remove all messages</div>
        <div slot="body">
            <p>Do you really want to delete all existing messages ?</p>
        </div>
        <div slot="footer">
            <button class="pure-button pure-button-red" @click="removeAll()">Remove all</button>
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

        this.socket.on('message.removeAll.result.' + this.uuid, () => {
            this.$emit('removeAll')
        })
    },
    methods: {
        hide() {
            this.$emit('close')
        },
        removeAll() {
            this.socket.emit('message.removeAll', { uuid: this.uuid })
        },
    }
}
</script>