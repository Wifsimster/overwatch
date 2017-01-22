<template>
<div class="pure-g">
    <div class="pure-u-1">
        <transition name="expand">
            <div v-if="$store.state.alert.message.length > 0">
                <div class="alert">
                    <a class="right" @click="close">x</a>
                    <p>{{ $store.state.alert.message }}</p>
    </div>
    </div>
    </transition>
    </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        methods: {
            close() {
                this.$store.commit('resetAlert')
            }
        },
    }
</script>

<style lang="sass" scoped>
@import '../sass/alert';
@import '../sass/transition';

a.right {
    cursor: pointer;
    float: right;
    }
</style>