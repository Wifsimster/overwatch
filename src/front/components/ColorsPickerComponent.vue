<template>
    <div class="colors-container">
        <div class="flex-container">
            <span v-for="color in colors" :key="color" :class="{ 'active': active === color }" :style="'background-color: ' + color" @click="setRGB(color)"></span>
        </div>
        <div class="flex-container">
            <span v-for="color in colors2" :key="color" :class="{ 'active': active === color }" :style="'background-color: ' + color" @click="setRGB(color)"></span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
        }
    },
    data() {
        return {
            active: null,
            colors: ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e'],
            colors2: ['#f1c40f', '#e67e22', '#e74c3c', '#ecf0f1', '#95a5a6']
        }
    },
    created() {
        this.active = '#' + this.value
    },
    watch: {
        value(val) {
            this.active = '#' + val
        },
    },
    methods: {
        setRGB(value) {
            this.active = value
            this.$emit('update', value)
        },
    },
}
</script>

<style lang="scss" scoped>
@import '../sass/components/colors-picker'
</style>

