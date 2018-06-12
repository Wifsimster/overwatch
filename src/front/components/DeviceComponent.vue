<template>
    <div class="device" :class="{ 'expand':expand }" @click="open()" v-if="display">
        <a class="close" @click="hide()">x</a>
        <slot name="body"></slot>
        <div class="more">
            <slot name="more"></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        show: String,
    },
    computed: {
        display() {
            return this.show === "true" ? true : false
        },
    },
    data() {
        return {
            expand: false,
            reduce: false,
        }
    },
    methods: {
        open() {
            if (this.reduce) {
                this.expand = false
                this.reduce = false
            } else {
                this.expand = true
            }
        },
        hide() {
            this.reduce = true
        },
    }
}
</script>