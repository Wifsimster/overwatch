<template>
    <div class="switchy">
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

<style lang="scss" scoped>
@import '../sass/components/switchy'
</style>