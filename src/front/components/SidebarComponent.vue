<template>
    <div class="sidebar">
        <ul>
            <li>
                <router-link to="/devices" class="link">
                    <i class="material-icons">devices</i>
                    <span>Devices</span>
                </router-link>
            </li>
            <li>
                <router-link to="/messages" class="link">
                    <i class="material-icons">message</i>
                    <span>Messages</span>
                </router-link>
            </li>
            <li>
                <router-link to="/types" class="link">
                    <i class="material-icons">settings</i>
                    <span>Types</span>
                </router-link>
            </li>
            <li>
                <router-link to="/locations" class="link">
                    <i class="material-icons">location_on</i>
                    <span>Locations</span>
                </router-link>
            </li>
            <li>
                <router-link to="/backup" class="link">
                    <i class="material-icons">backup</i>
                    <span>Backup</span>
                </router-link>
            </li>
            <li>
                <router-link to="/scenario" class="link">
                    <i class="material-icons">alarm_on</i>
                    <span>Scenario</span>
                </router-link>
            </li>
        </ul>
    
        <div class="bottom">
            <mqtt-health></mqtt-health>
        </div>
    
    </div>
</template>

<script>
const MqttHealth = () => import('./MqttHealthComponent.vue')
export default {
    components: { 
        MqttHealth 
    },
}
</script>

<style lang="scss" scoped>
@import '../sass/components/sidebar';
</style>