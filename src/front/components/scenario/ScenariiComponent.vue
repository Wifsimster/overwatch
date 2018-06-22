<template>
    <div>
        <h2>Scenario</h2>
        <transition name="opacity">
            <div class="scenario" v-for="scenario in scenarii" :key="scenario.id">
                <div class="scenario">
                    <i class="material-icons">check</i>
                    <div class="title">{{ scenario.name }}</div>
                    <div class="description">{{ scenario.description }}</div>
                    <button class="pure-button">Run now</button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import Vue from 'vue'
export default {    
    computed: {
        ws() {
            return this.$store.getters.ws
        },
    },
    data() {
        return {
            uuid: null,
            scenarii: null,
        }
    },
    created() {
        this.uuid = Vue.getUUID()
        this.setListener()
        this.getScenarii()
    },
    watch: {
        ws() {
            this.setListener()
            this.getScenarii()
        }
    },
     methods: {
        setListener() {
            if(this.ws) {           
                this.ws.onmessage = message => {
                    const data = JSON.parse(message.data)
                    if('findAll' === data.method && this.uuid === data.uuid) {
                        this.scenarii = data.results.scenarii
                    }
                }
            }
        },
        getScenarii() {
            if(this.ws) {
                this.ws.send(JSON.stringify({ object: 'Scenario', method: 'findAll', uuid: this.uuid}))
            }
        },
     }
}
</script>

<style lang="scss" scoped>
@import '../../sass/components/scenario';
</style>