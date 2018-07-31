<template>
    <modal @close="hide()">
        <div slot="header">Edit</div>
        <div slot="body">
            <form class="pure-form pure-form-aligned" v-if="location">
                <div class="pure-control-group">
                    <label for="name">Name</label>
                    <input id="name" type="text" v-model="location.name">
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
        id: {
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
            location: null
        }
    },
    created() {
        this.uuid = Vue.getUUID()
        this.getInfo()
    },
     watch: {
        ws() {
            this.getInfo()
        }
    },
    methods: {
        setListener() {
            if(this.ws) {           
                this.ws.onmessage = message => {
                    const data = JSON.parse(message.data)
                    if(this.uuid === data.uuid) {
                        if('Location' === data.object && 'findOne' === data.method)  {
                            this.location = data.results
                        }
                        if('Location' === data.object && 'update' === data.method)  {
                            this.$emit('update', data.results)
                        }
                    }
                }
            }
        },
        getInfo() {
            this.ws.send(JSON.stringify({ object: 'Location', method: 'findOne', parameters:{ id: this.id }, uuid: this.uuid }))
            this.setListener()
        },
        update() {
            this.ws.send(JSON.stringify({ object: 'Location', method: 'update', parameters: this.location, uuid: this.uuid}))
            this.setListener()
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