<template>
    <modal @close="hide()">
        <div slot="header">Create</div>
        <div slot="body">
            <form class="pure-form pure-form-aligned">
                <div class="pure-control-group">
                    <label for="name">Name</label>
                    <input id="name" type="text" v-model="name">
                </div>
                <div class="pure-control-group">
                    <label for="key">Key</label>
                    <input id="key" type="text" v-model="key">
                </div>
            </form>
        </div>
        <div slot="footer">
            <button class="pure-button pure-button-primary" @click="create">Create</button>
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
    data() {
        return {
            uuid: null,
            name: null,
            key: null
        }
    },
    created() {
        this.uuid = Vue.getUUID()
    },
    methods: {
        create() {
            if(this.name) {
                this.$ws.send(JSON.stringify({ object: 'Type', method: 'create', parameters: { name: this.name, key: this.key }, uuid: this.uuid}))
                this.$ws.onmessage = message => {
                    const data = JSON.parse(message.data)
                    if(this.uuid === data.uuid) {
                        if('Type' === data.object && 'create' === data.method)  {
                            this.$emit('create', data.results)
                        }
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