<template>
    <modal @close="hide()">
        <div slot="header">Remove all messages</div>
        <div slot="body">
            <p>Do you really want to delete all existing messages ?</p>
        </div>
        <div slot="footer">
            <button class="pure-button pure-button-red" @click="removeAll()">Remove all</button>
            <button class="pure-button" @click="hide()">Cancel</button>
        </div>
    </modal>
</template>

<script>
import Modal from '../ModalComponent.vue'
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
        }
    },
    methods: {
        hide() {
            this.$emit('close')
        },
        removeAll() {
            this.socket.emit('message.removeAll')
            this.socket.on('message.removeAll.result', () => {
                this.$emit('close')
            })
        },
    }
}
</script>