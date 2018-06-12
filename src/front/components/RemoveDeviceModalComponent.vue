<template>
<transition name="modal">
    <div class="modal-mask" v-show="isOpenModal">
        <div class="modal-wrapper">
            <div class="modal-container">
                <div class="modal-header">
                    <h2>Remove device <a @click="close" class="pull-right">x</a></h2>
    </div>            
                <div class="modal-body modal-lg">
                    <p>Do you really want to delete this device ?</p>
    </div>  
                <div class="modal-footer">
                    <button class="pure-button pure-button-primary" @click="remove">Remove</button>
                    <button class="pure-button" @click="close">Cancel</button>
                    <div class="clearfix"></div>
    </div>
    </div>
    </div>
    </div>
    </transition>
</template>

<script>
    import io from 'socket.io-client'
    import { mapGetters, mapActions } from 'vuex'
    export default {
        data() { 
            return {
                socket: io(),
            }
        },
        computed: {
            ...mapGetters({
                isOpenModal: 'removeModal',
                device: 'removeDevice',
            })
        },
        created() {
            this.socket.on('device.remove.result', (rst) => {
                this.$store.commit('closeModal')
                this.socket.emit('device.getAll')
            })
        },
        methods: {
            remove() { 
                this.socket.emit('device.remove', this.device) 
            },
            close() {
                this.$store.commit('closeModal')
            },
        }
    }
</script>

<style lang="scss" scoped>
@import '../sass/modal';
</style>