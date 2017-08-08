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
            colors: ['#1ABC9C', '#2ECC71', '#3498DB', '#9B59B6', '#34495E'],
            colors2: ['#F1C40F', '#E67E22', '#E74C3C', '#ECF0F1', '#95A5A6']
        }
    },
    created() {
        this.active = this.value
    },
    watch: {
        value(val) {
            this.active = val
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

