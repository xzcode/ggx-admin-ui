<template>
    <transition name="fade">
      <router-view></router-view>
    </transition>
</template>

<script>
export default {
  components: {}
};
</script>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0px;
  padding: 0px;
  width: 100%;
}
.fade-enter-active, .fade-leave-avtive {
    transition: opacity 1s
}
.fade-enter, .fade-leave-to {
    opacity: 0
}
</style>
