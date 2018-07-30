<template>
    <modal @close="hide()">
        <div slot="header">Edit type</div>
        <div slot="body">
            <form class="pure-form pure-form-aligned" v-if="type">
                <div class="pure-control-group">
                    <label for="name">Name</label>
                    <input id="name" type="text" v-model="type.name">
                </div>
                <div class="pure-control-group">
                    <label for="key">Key</label>
                    <input id="key" type="text" v-model="type.key">
                </div>
            </form>
        </div>
        <div slot="footer">
            <button class="pure-button pure-button-primary" @click="update">Edit</button>
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
        typeId: {
            type: Number,
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
            type: null
        }
    },
    created() {
        this.uuid = Vue.getUUID()
        this.setListener()
        this.getType()
    },
     watch: {
        ws() {
            this.setListener()
            this.getType()
        }
    },
    methods: {
        setListener() {
            if(this.ws) {           
                this.ws.onmessage = message => {
                    const data = JSON.parse(message.data)
                    if(this.uuid === data.uuid) {
                        if('Type' === data.object && 'findOne' === data.method)  {
                            this.type = data.results
                        }
                        if('Type' === data.object && 'update' === data.method)  {
                            this.$emit('update', data.results)
                        }
                    }
                }
            }
        },
        getType() {
            this.ws.send(JSON.stringify({ object: 'Type', method: 'findOne', parameters:{ id: this.typeId }, uuid: this.uuid }))
        },
        update() {
            this.ws.send(JSON.stringify({ object: 'Type', method: 'update', parameters: this.type, uuid: this.uuid}))
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