<template>
<transition name="expand">
    <div class="pure-g" v-if="message && type">
        <div class="pure-u-1">
            <div class="alert" :class="type">
                <a class="pull-right" @click="resetAlert">x</a>
                <p>{{ message }}</p>
    </div>
    </div>
    </div>
    </transition>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        name: 'Alert',
        computed: {
            ...mapGetters({
                type: 'type',
                message: 'message',
            }),
        },
        methods: mapActions([
            'resetAlert'
        ]),
    }
</script>

<style lang="scss" scoped>
@import '../sass/alert';
</style>