<template>
    <div class="switch">
        <div @click="$emit('switch', false)" v-if="state" class="">OFF</div>
        <div @click="$emit('switch', true)" v-else class="active">ON</div>
    </div>
</template>

<script>
export default {
    props: {
        state: {
            type: Boolean,
            required: true,
        }
    }
}
</script>

<style lang="sass" scoped>
@import '../sass/switch'
</style>