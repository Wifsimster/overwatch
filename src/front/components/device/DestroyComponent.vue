<template>
    <modal @close="hide()">
        <div slot="header">Destroy</div>
        <div slot="body">
            <p v-if="device">Destroy "{{ device.name }}"" ?</p>
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
    data() {
        return {            
            uuid: null,
            device: null
        }
    },
    created() {
        this.uuid = Vue.getUUID()
        this.getInfo()
    },
    methods: {
        getInfo() {
            this.$ws.send(JSON.stringify({ object: 'Device', method: 'findOne', parameters: { id: this.id }, uuid: this.uuid }))
            this.$ws.onmessage = message => {
                const data = JSON.parse(message.data)
                if(this.uuid === data.uuid) {
                    if('Device' === data.object && 'findOne' === data.method)  {
                        this.device = data.results
                    }
                }
            }
        },
        destroy() {
            this.$ws.send(JSON.stringify({ object: 'Device', method: 'destroy', parameters: { id: this.id }, uuid: this.uuid}))
             this.$ws.onmessage = message => {
                const data = JSON.parse(message.data)
                if(this.uuid === data.uuid) {
                    if('Device' === data.object && 'destroy' === data.method)  {
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