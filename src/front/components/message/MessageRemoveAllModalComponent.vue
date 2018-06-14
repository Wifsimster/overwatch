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