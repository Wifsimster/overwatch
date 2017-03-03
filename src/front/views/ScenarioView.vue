<template>
<div class="pure-g">
    <div class="pure-u-1">
        <div class="scenario" v-for="scenario in scenarios"></div>
    </div>
    </div>
</template>

<script>
    import io from 'socket.io-client'
    export default {
        data() {
            return {
                socket: io(),
                scenarios: [],
            }
        },
        created() {
            
        },
    }
</script>

<style lang="sass"></style>