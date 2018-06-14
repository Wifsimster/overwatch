<template>
    <div class="pure-g">
        <div class="pure-u-1">
            <transition name="opacity">
                <div v-if="show">
                    <div class="alert" :class="type">
                        <div v-if="delay" class="delay">
                            <div class="spinner"></div>
                        </div>
                        <a v-else class="right" @click="close">x</a>
                        <p v-if="message">{{ message }}</p>
                        <p v-else>Désolé, une erreur inattendue est survenue !</p>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
  computed: {
    show() {
      return this.$store.getters.alert.show
    },
    type() {
      return this.$store.getters.alert.type
    },
    message() {
      return this.$store.getters.alert.message
    },
    delay() {
      return this.$store.getters.alert.delay
    }
  },
  methods: {
    close() {
      this.$store.dispatch("resetAlert")
    }
  },
  watch: {
    show(val) {
      if (val) {
        this.$scrollTo("body")
        if (this.delay) {
          setTimeout(() => {
            this.$store.dispatch("resetAlert")
          }, this.delay)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../sass/components/alert";
</style>