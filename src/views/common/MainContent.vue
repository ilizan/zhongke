<template>
    <div class="main-container position-left">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'MainContent'
    }
</script>

<style lang="scss" scoped>
.main-container{
    position: absolute;
    top: 60px;
    right: 0;
    bottom: 0;
    padding: 5px;
}
.position-left{
    left: 200px;
}
</style>