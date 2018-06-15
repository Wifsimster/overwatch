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
    computed: {
        ws() {
            return this.$store.getters.ws.socket
        }
    }
}
</script>