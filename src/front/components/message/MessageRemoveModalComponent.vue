<template>
    <modal @close="hide()">
        <div slot="header">Remove a message</div>
        <div slot="body">
            <p v-if="message">Remove this message {{ message.data }} ?</p>
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
        messageId: {
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
            message: null
        }
    },
    created() {
        this.uuid = Vue.getUUID()
        this.setListener()
        this.getMessage()
    },
     watch: {
        ws() {
            this.setListener()
            this.getMessage()
        }
    },
    methods: {
         setListener() {
            if(this.ws) {           
                this.ws.onmessage = message => {
                    const data = JSON.parse(message.data)
                    if(this.uuid === data.uuid) {
                        if('Message' === data.object && 'findOne' === data.method)  {
                            this.message = data.results
                        }
                        if('Message' === data.object && 'destroy' === data.method)  {
                            this.$emit('remove', data.results)
                        }
                    }
                }
            }
        },
        getMessage() {
            this.ws.send(JSON.stringify({ object: 'Message', method: 'findOne', parameters: { id: this.messageId }, uuid: this.uuid }))
        },
        remove() {
            this.ws.send(JSON.stringify({ object: 'Message', method: 'destroy', parameters: { id: this.messageId }, uuid: this.uuid}))
        },
        hide() {
            this.$emit('close')
        }
    }
}
</script>