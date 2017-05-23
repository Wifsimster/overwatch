<template>
<transition name="modal">
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                <div class="modal-header">
                    <h2>Remove device <a @click="hide()" class="pull-right">x</a></h2>
    </div>            
                <div class="modal-body modal-lg">
                    <p>Do you really want to delete this device ?</p>
    </div>  
                <div class="modal-footer">
                    <button class="pure-button pure-button-primary" @click="remove()">Remove</button>
                    <button class="pure-button" @click="hide()">Cancel</button>
                    <div class="clearfix"></div>
    </div>
    </div>
    </div>
    </div>
    </transition>
</template>

<script>
    export default {
        props: {
            device: {
                type: Object,
            },
        },
        data() { 
            return {
                socket: this.$store.state.socket.socket,
            }
        },
        methods: {
            remove() {
                this.socket.emit('device.remove', this.device) 
                this.socket.on('device.remove.result', () => {
                    this.$emit('close')
                })
            },
            hide() {
                this.$emit('close')
            },
        }
    }
</script>

<style lang="sass" scoped>
@import '../sass/modal'
</style>