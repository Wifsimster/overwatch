<template>
    <div class="slider-container">
        <div id="slider"></div>
    </div>
</template>

<script>
import Vue from 'vue'
import noUiSlider from 'nouislider'
export default {
    props: {
        value: {
            type: String,
            default: 0,
        },
        hex: {
            type: String
        },
    },
    created() {
        this.$nextTick(() => {
            let slider = document.getElementById('slider')
            noUiSlider.create(slider, {
                start: parseInt(this.value),
                range: {
                    'min': 0,
                    'max': 100
                },
            })

            slider.noUiSlider.on('update', (values, handle) => {
                this.$emit('update', values)
            })

            this.setBackground(this.hex)
        })
    },
    watch: {
        hex(val) {
            this.setBackground(val)
        },
    },
    methods: {
        setBackground(val) {
            let lighter = Vue.lighten(0.8, val)
            slider.children[0].style.backgroundImage = 'linear-gradient(to right, ' + val + ' 0%, ' + lighter + ' 100%)'
        },
    },
}
</script>

<style lang="scss">
@import '../sass/components/slider';
// @import '../../../node_modules/nouislider/distribute/nouislider.css';
</style>