<template>
    <div>
        <h2>Scenario</h2>
        <transition name="opacity">
            <div class="scenario" v-for="item in list" :key="item.id">
                <div class="scenario">
                    <i class="material-icons">check</i>
                    <div class="title">{{ item.name }}</div>
                    <div class="description">{{ item.description }}</div>
                    <button class="pure-button">Run now</button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
    data() {
        return {
            uuid: null,
            list: null,
        }
    },
    created() {
        this.uuid = Vue.getUUID()
        this.getScenarii()
    },
    methods: {
        getScenarii() {
            this.$ws.send(JSON.stringify({ object: 'Scenario', method: 'findAll', uuid: this.uuid}))
            this.$ws.onmessage = message => {
            const data = JSON.parse(message.data)
                if('findAll' === data.method && this.uuid === data.uuid) {
                    this.list = data.results
                }
            }
        },
    }
}
</script>

<style lang="scss" scoped>
@import '../../sass/components/scenario';
</style>