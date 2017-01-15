<template>
<div class="device">
    <span>{{ date | moment('ddd DD MMM YYYY') }}</span>
    <span>{{ date | moment('HH:mm:ss') }}</span>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                date: new Date(),
            }
        },
        created() {
            setInterval(() => {
                this.date = new Date()
            }, 1000)
        }
    }
</script>

<style lang="sass" scoped>
@import '../sass/_colors.scss';

$height: 116px;

.device {
    position: relative;
    background-color: $mine-shaft-app;
    margin: 5px;
    padding: 5px 10px;
    height: $height;
    text-align: center;
    span {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        position: relative;
        padding: 2px 0;
        font-size: 24px;
        &:nth-child(2) {
        font-size: 34px;
        }
    }
}
</style>