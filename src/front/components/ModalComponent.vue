<template>
    <transition name="modal">
        <div class="modal-mask" @keyup.esc="$emit('close')">
            <div class="modal-wrapper">
                <div class="modal-container" :class="size">
                    <div class="modal-header">
                        <a @click="$emit('close')" class="close">X</a>
                        <h2>
                            <slot name="header"></slot>
                        </h2>
                    </div>
                    <div class="modal-error">
                        <slot name="error"></slot>
                    </div>
                    <div class="modal-body">
                        <slot name="body"></slot>
                    </div>
                    <div class="modal-footer">
                        <slot name="footer"></slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
  name: "modal",
  props: {
    size: {
      type: String,
      default: "md"
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../sass/components/modal';
</style>