<template>
    <div class="notification-container">
        <transition-group name="flip" appear>
            <div v-for="(item, key) in notifications" :key="item.id" class="alert notify-me" :class="item.type">
                <i class="close" @click="close(key)">&times;</i>
                <h1 v-if="item.title">{{ item.title }}</h1>
                <p v-if="item.message">{{ item.message }}</p>
            </div>
        </transition-group>
    </div>
</template>

<script>
export default {
  computed: {
    notifications() {
      return this.$store.getters.notifications
    }
  },
  methods: {
    close(key) {
      this.$store.dispatch("removeNotification", key)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../sass/components/notification";
</style>