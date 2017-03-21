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
    import io from 'socket.io-client'
    
    export default {
        data() {
            return {
                socket: io(),
            }
        },
        components: {},
        created() {},
    }
</script>

<style lang="sass" scoped>

</style>