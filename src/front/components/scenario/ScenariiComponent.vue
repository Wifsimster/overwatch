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
export default {    
    computed: {
        ws() {
            return this.$store.getters.ws
        },
    },
    data() {
        return {            
            scenarii: null,
        }
    },
    created() {
        this.ws.emit('scenario.getAll')
        this.ws.on('scenario.getAll.result', scenarii => {
            this.scenarii = scenarii
        })
    }
}
</script>

<style lang="scss" scoped>
@import '../../sass/components/scenario';
</style>