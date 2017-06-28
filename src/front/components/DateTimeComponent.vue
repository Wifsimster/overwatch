<template>
    <div>
        <transition name="opacity">
            <div class="datetime" v-if="date" @click="modalShow = true">
                <span>{{ date | moment('ddd DD MMM YYYY') }}</span>
                <span>{{ date | moment('HH:mm:ss') }}</span>
            </div>
        </transition>
    
        <modal v-if="modalShow" @close="onClose">
            <div slot="header">Date & Time</div>
            <div slot="body">
                <ul>
                    <li>Date: {{ date | moment('ddd DD MMM YYYY') }}</li>
                    <li>Time: {{ date | moment('HH:mm:ss') }}</li>
                </ul>
            </div>
        </modal>
    
    </div>
</template>

<script>
import Modal from './ModalComponent.vue'
export default {
    components: { Modal },
    props: {
        settings: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            date: new Date(),
            modalShow: false,
        }
    },
    created() {
        setInterval(() => {
            this.date = new Date()
        }, 1000)
    },
    methods: {
        onClose() {
            this.modalShow = false
        },
    },
}
</script>

<style lang="sass" scoped>
@import '../sass/components/date-time'
</style>