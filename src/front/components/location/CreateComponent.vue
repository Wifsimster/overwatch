<template>
    <modal @close="hide()">
        <div slot="header">Create</div>
        <div slot="body">
            <form class="pure-form pure-form-aligned">
                <div class="pure-control-group">
                    <label for="name">Name</label>
                    <input id="name" type="text" v-model="name">
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
    computed: {
        ws() {
            return this.$store.getters.ws
        }
    },
    data() {
        return {
            uuid: null,
            name: null
        }
    },
    created() {
        this.uuid = Vue.getUUID()
    },
    methods: {
        setListener() {
            if(this.ws) {           
                this.ws.onmessage = message => {
                    const data = JSON.parse(message.data)
                    if(this.uuid === data.uuid) {
                        if('Location' === data.object && 'create' === data.method)  {
                            this.$emit('create', data.results)
                        }
                    }
                }
            }
        },
        create() {
            if(this.name) {
                this.ws.send(JSON.stringify({ object: 'Location', method: 'create', parameters: { name: this.name }, uuid: this.uuid}))
                this.setListener()
            }
        },
        hide() {
            this.$emit('close')
        },
    }
}
</script>