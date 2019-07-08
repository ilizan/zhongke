<template>
  <div class="header position-left">header</div>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1030;
  height: 60px;
  line-height: 60px;
  background-color: rgba(180, 190, 190, 0.8);
  border-left-width: 1px;
  border-left-style: solid;
}
.position-left{
    left: 200px;
}
</style>