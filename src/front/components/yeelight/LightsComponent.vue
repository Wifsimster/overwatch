<template>
    <div class="flex-container" v-if="settings.yeelight.display">
        <div v-for="item in list" :key="item.id">
            <light :row="item"></light>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
const Light = () => import('./LightComponent.vue')
export default {
    components: { 
        Light 
    },
    props: {
        settings: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {    
            uuid: null,        
            list: null,
        }
    },
    created() {
        this.uuid = Vue.getUUID()
        this.getLights()
    },
    methods: {
        getLights() {
            this.$ws.send(JSON.stringify({ object: 'Light', method: 'findAll', uuid: this.uuid}))                
            this.$ws.onmessage = message => {
                const data = JSON.parse(message.data)
                if(this.uuid === data.uuid) {
                    if('Light' === data.object && 'findAll' === data.method) {
                        this.list = data.results
                    }
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../sass/components/lights';
</style>