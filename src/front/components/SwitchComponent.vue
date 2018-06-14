<template>
    <div class="switch-container">
    
        <span class="option option-left" @click="setOff()" :class="{ 'active': state === false }">OFF</span>
    
        <div class="switch" @click="toggle()">
            <span class="handle" :class="{ 'handle-right': state === true }"></span>
        </div>
    
        <span class="option option-right" @click="setOn()" :class="{ 'active': state === true }">ON</span>
    
    </div>
</template>

<script>
export default {
    props: {
        row: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            state: false,
        }
    },
    created() {
        this.state = this.row
    },
    methods: {
        setOn() {
            this.state = true
            this.$emit('switch', this.state)
        },
        setOff() {
            this.state = false
            this.$emit('switch', this.state)
        },
        toggle() {
            this.state = this.state ? false : true
            this.$emit('switch', this.state)
        }
    },
}
</script>

<style lang="scss" scoped>
@import '../sass/components/switch';
</style>