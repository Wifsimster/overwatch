<template>
    <modal @close="hide()">
        <div slot="header">Destroy all</div>
        <div slot="body">
            <p>Destroy all existing messages ?</p>
        </div>
        <div slot="footer">
            <button class="pure-button pure-button-red" @click="destroyAll()">Destroy all</button>
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
    data() {
        return {            
            uuid: null
        }
    },
    created() {
        this.uuid = Vue.getUUID()
        this.setListener()
    },
    methods: {
        setListener() {        
            this.$ws.onmessage = message => {
                const data = JSON.parse(message.data)
                if(this.uuid === data.uuid) {
                    if('Message' === data.object && 'destroy' === data.method)  {
                        this.$emit('destroyAll', data.results)
                    }
                }
            }
        },
        destroyAll() {
            this.$ws.send(JSON.stringify({ object: 'Message', method: 'destroy', parameters: {}, uuid: this.uuid}))
        },
        hide() {
            this.$emit('close')
        }
    }
}
</script>