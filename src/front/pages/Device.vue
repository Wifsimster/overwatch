<template>
    <div>
        <div class="pure-g">
            <div class="pure-u-1">
                <devices></devices>
            </div>
        </div>
    </div>
</template>

<script>
const Devices = () => import('../components/device/DevicesComponent.vue')
export default {
    components: { 
        Devices 
    }
}
</script>