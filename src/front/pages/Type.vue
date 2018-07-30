<template>
    <div>
        <div class="pure-g">
            <div class="pure-u-1">
                <types></types>
            </div>
        </div>
    </div>
</template>

<script>
const Types = () => import('../components/type/TypesComponent.vue')
export default {
    components: {
        Types
    }
}  
</script>