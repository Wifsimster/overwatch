<template>
<div>    
    <div class="pure-g">
        <div class="pure-u-1">
            <h2>Backup</h2>
    </div>
    </div>
    </div>
</template>

<script>    
    export default {
        data() {
            return {
                socket: this.$store.state.socket.socket,
            }
        },
        components: {},
        created() {},
    }
</script>

<style lang="sass" scoped>
</style>