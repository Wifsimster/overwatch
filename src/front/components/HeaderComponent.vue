<template>
<div class="header">
    <ul>
        <li>
            <router-link to="/" exact class="link"><i class="material-icons">home</i></router-link>
    </li>
    </ul>
    <ul class="pull-right">
        <li>
            <router-link to="/settings" class="link settings"><i class="material-icons">settings</i></router-link>
    </li>
    </ul>
    </div>
</template>

<style lang="sass" scoped>
@import '../sass/header'
</style>