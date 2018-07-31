<template>
    <modal @close="hide()">
        <div slot="header">Destroy</div>
        <div slot="body">
            <p v-if="message">Destroy "{{ message.data }}"" ?</p>
        </div>
        <div slot="footer">
            <button class="pure-button pure-button-red" @click="destroy()">Destroy</button>
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
            message: null
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
                        if('Message' === data.object && 'findOne' === data.method)  {
                            this.message = data.results
                        }
                        if('Message' === data.object && 'destroy' === data.method)  {
                            this.$emit('destroy', data.results)
                        }
                    }
                }
            }
        },
        getInfo() {
            this.ws.send(JSON.stringify({ object: 'Message', method: 'findOne', parameters: { id: this.id }, uuid: this.uuid }))
            this.setListener()
        },
        destroy() {
            this.ws.send(JSON.stringify({ object: 'Message', method: 'destroy', parameters: { id: this.id }, uuid: this.uuid}))
            this.setListener()
        },
        hide() {
            this.$emit('close')
        }
    }
}
</script>