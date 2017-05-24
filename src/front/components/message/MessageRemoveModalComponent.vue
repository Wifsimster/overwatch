<template>
<modal @close="hide()">
    <div slot="header">Remove a message</div>
    <div slot="body">
        <p>Do you really want to delete this message ?</p>
    </div>
    <div slot="footer">
        <button class="pure-button pure-button-red" @click="remove()">Remove</button>
        <button class="pure-button" @click="hide()">Cancel</button>
    </div>
    </modal>
</template>

<script>
    import Modal from '../ModalComponent.vue'
    export default {
        components: { Modal },
        props: {
            message: {
                type: Object,
            },
        },
        data() { 
            return {
                socket: this.$store.state.socket.socket,
            }
        },
        methods: {
            remove() {
                this.socket.emit('message.remove', this.message) 
                this.socket.on('message.remove.result', () => {
                    this.$emit('close')
                })
            },
            hide() {
                this.$emit('close')
            },
        }
    }
</script>

<style lang="sass" scoped></style>