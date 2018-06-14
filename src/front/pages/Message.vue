<template>
    <div>
        <div class="pure-g">
            <div class="pure-u-1 pure-u-lg-1-1">
                <messages></messages>
            </div>
        </div>
    </div>
</template>

<script>
const Messages = () => import('../components/message/MessagesComponent.vue')
export default {
    components: {
        Messages,
    },
}
</script>
