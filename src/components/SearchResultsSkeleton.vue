<template>
  <div class="search-results-skeleton">
    <div v-for="x in numRows" :key="x" class="search-results-skeleton__item"></div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  numRows: {
    type: Number,
    default: 8,
  },
})
</script>

<style scoped>
.search-results-skeleton {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.search-results-skeleton__item {
  height: 8rem;
  border-radius: 0.4rem;
  animation-duration: 1.8s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: skeletonShimmer;
  animation-timing-function: linear;
  background: linear-gradient(to right, #f0f0f0 8%, #fff 38%, #f0f0f0 54%);
  background-size: 1000px 640px;
}

@keyframes skeletonShimmer {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}
</style>
