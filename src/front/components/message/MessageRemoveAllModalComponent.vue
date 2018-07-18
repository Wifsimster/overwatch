<template>
    <modal @close="hide()">
        <div slot="header">Remove all messages</div>
        <div slot="body">
            <p>Remove all existing messages ?</p>
        </div>
        <div slot="footer">
            <button class="pure-button pure-button-red" @click="remove()">Remove all</button>
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
            uuid: null
        }
    },
    created() {
        this.uuid = Vue.getUUID()
        this.setListener()
    },
     watch: {
        ws() {
            this.setListener()
        }
    },
    methods: {
        setListener() {
            if(this.ws) {           
                this.ws.onmessage = message => {
                    const data = JSON.parse(message.data)
                    if(this.uuid === data.uuid) {
                        if('Message' === data.object && 'destroy' === data.method)  {
                            this.$emit('removeAll', data.results)
                        }
                    }
                }
            }
        },
        remove() {
            this.ws.send(JSON.stringify({ object: 'Message', method: 'destroy', parameters: {}, uuid: this.uuid}))
        },
        hide() {
            this.$emit('close')
        }
    }
}
</script>