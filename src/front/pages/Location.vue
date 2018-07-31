<template>
    <div>
        <div class="pure-g">
            <div class="pure-u-1">
                <locations></locations>
            </div>
        </div>
    </div>
</template>

<script>
const Locations = () => import('../components/location/LocationsComponent.vue')
export default {
    components: {
        Locations
    }
}  
</script>