<template>
  <div v-if="isLoading" :class="$style.loaderContainer">
    <div :class="$style.loader">
      <div :class="$style.dot"></div>
      <div :class="$style.dot"></div>
      <div :class="$style.dot"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isLoading: Boolean
});
</script>

<style lang="scss" src="./Loader.module.scss" module>
</style>
