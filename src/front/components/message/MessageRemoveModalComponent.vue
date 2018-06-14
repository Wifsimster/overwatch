<template>
    <modal @close="hide()">
        <div slot="header">Remove a message</div>
        <div slot="body">
            <p>Do you really want to delete this message ?</p>
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
        message: {
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
        this.socket.on('message.remove.result.' + this.uuid, () => {
            this.$emit('remove')
        })
    },
    methods: {
        hide() {
            this.$emit('close')
        },
        remove() {
            this.socket.emit('message.remove', { uuid: this.uuid, id: this.message.id })
        },
    }
}
</script>