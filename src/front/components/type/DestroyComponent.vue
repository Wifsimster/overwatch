<template>
    <modal @close="hide()">
        <div slot="header">Destroy</div>
        <div slot="body">
            <p v-if="location">Destroy "{{ location.name }}" ?</p>
        </div>
        <div slot="footer">
            <button class="pure-button pure-button-red" @click="destroy">Destroy</button>
        </div>
    </modal>
</template>

<script>
const Multiselect = () => import('vue-multiselect')
const Modal = () => import('../ModalComponent.vue')
import Vue from 'vue'
export default {
    components: {
        Multiselect,
        Modal,
    },
    props: {
        id: {
            type: Number,
        },
    },
    data() {
        return {
            uuid: null,
            location: null
        }
    },
    created() {
        this.uuid = Vue.getUUID()
        this.getInfo()
    },
    methods: {       
        getInfo() {
            this.$ws.send(JSON.stringify({ object: 'Type', method: 'findOne', parameters:{ id: this.id }, uuid: this.uuid }))
            this.$ws.onmessage = message => {
                const data = JSON.parse(message.data)
                if(this.uuid === data.uuid) {
                    if('Type' === data.object && 'findOne' === data.method)  {
                        this.location = data.results
                    }
                }
            }
        },
        destroy() {
            this.$ws.send(JSON.stringify({ object: 'Type', method: 'destroy', parameters: { id: this.id }, uuid: this.uuid}))
            this.$ws.onmessage = message => {
                const data = JSON.parse(message.data)
                if(this.uuid === data.uuid) {
                    if('Type' === data.object && 'destroy' === data.method)  {
                        this.$emit('destroy', data.results)
                    }
                }
            }
        },
        hide() {
            this.$emit('close')
        },
    }
}
</script>

<style lang="scss" scoped>
@import '../../sass/components/device-edit';
</style>