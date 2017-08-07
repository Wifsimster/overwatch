<template>
    <div class="slider-container">
        <div id="slider"></div>
    </div>
</template>

<script>
import noUiSlider from 'nouislider'
export default {
    props: {
        value: {
            type: String,
            default: 0,
        },
        rgb: {
            type: String
        },
    },
    created() {
        this.$nextTick(() => {
            let slider = document.getElementById('slider')
            noUiSlider.create(slider, {
                start: parseInt(this.value),
                connect: [true, false],
                range: {
                    'min': 0,
                    'max': 100
                },
            })

            slider.noUiSlider.on('update', (values, handle) => {
                this.$emit('update', values)
            })

            slider.children[0].children[0].style.backgroundImage = 'linear-gradient(to right, rgb(' + this.getRGB(this.rgb) + ') 0%, #f0cb35 100%)'
            console.log('RGB', 'linear-gradient(to right, #' + this.rgb + ' 0%, #f0cb35 100%)')
        })
    },
    methods: {
        getRGB(rgb) {
            let red = rgb.substring(0, 3)
            let green = rgb.substring(3, 6)
            let blue = rgb.substring(6, rgb.length)
            return red + ', ' + green + ', ' + blue
        }
    }
}
</script>

<style lang="scss">
@import '../sass/components/slider';
@import '../../../node_modules/nouislider/distribute/nouislider.css';
</style>