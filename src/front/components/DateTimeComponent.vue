<template>
<device :show="settings.datetime.display">
    <div slot="body">
        <span>{{ date | moment('ddd DD MMM YYYY') }}</span>
        <span>{{ date | moment('HH:mm:ss') }}</span>
    </div>
    </device>
</template>

<script>
    import Device from './DeviceComponent.vue'
    export default {
        components: { Device },
        props: {
            settings: {
                type: Object,
                required: true,
            }
        },
        data() {
            return {
                date: new Date(),
            }
        },
        created() {
            setInterval(() => {
                this.date = new Date()
            }, 1000)
        },
    }
</script>

<style lang="sass" scoped>
@import '../sass/components/date-time'
</style>