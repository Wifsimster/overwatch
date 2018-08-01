<template>
    <div class="header">
        <ul>
            <li>
                <router-link to="/" exact class="link">
                    <i class="material-icons">home</i>
                    <span class="title">Overwatch</span>
                </router-link>
            </li>
        </ul>
        <ul class="pull-right">
            <li>
                <router-link to="/settings" class="link settings">
                    <i class="material-icons">settings</i>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
@import '../sass/components/header';
</style>