<template>
    <modal @close="hide()">
        <div slot="header">Remove all devices</div>
        <div slot="body">
            <p>Do you really want to delete all existing devices ?</p>
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

        this.ws.on('device.removeAll.result.' + this.uuid, () => {
            this.$emit('removeAll')
        })
    },
    methods: {
        hide() {
            this.$emit('close')
        },
        removeAll() {
            this.ws.emit('device.removeAll', { uuid: this.uuid })
        },
    }
}
</script>