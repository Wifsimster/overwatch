<template>
    <div>
        <div class="pure-g">
            <div class="pure-u-1 pure-u-lg-1-1">
                <com-messages></com-messages>
            </div>
        </div>
    </div>
</template>

<script>
import ComMessages from '../components/message/MessagesComponent.vue'
export default {
    data() {
        return {
            socket: this.$store.state.socket.socket,
        }
    },
    components: {
        ComMessages,
    },
}
</script>
