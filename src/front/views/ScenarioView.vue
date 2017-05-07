<template>
<div class="pure-g">
    <div class="pure-u-1">
        <h2>Scenario</h2>
        <div class="scenario" v-for="scenario in scenarios"></div>
    </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                socket: this.$store.state.socket.socket,
                scenarios: [],
            }
        },
        created() {

        },
        methods: {

        },
    }
</script>

<style lang="sass" scoped></style>