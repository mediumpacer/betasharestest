<template>
  <div class="search-pagination">
    <button
      :class="[
        'search-pagination__button button',
        {
          'button--disabled': currentPage <= 1,
        },
      ]"
      :disabled="currentPage === 1"
      @click="changePage(currentPage - 1)"
    >
      Previous
    </button>
    <span class="search-pagination__page"> Page {{ currentPage }} of {{ totalPages }} </span>
    <button
      :class="[
        'search-pagination__button button',
        {
          'button--disabled': currentPage === totalPages,
        },
      ]"
      :disabled="currentPage === totalPages"
      @click="changePage(currentPage + 1)"
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['page-changed']);

// Handle and emit a page change event
const changePage = (page: number) => {
  if (page < 1 || page > props.totalPages) return;
  emit('page-changed', page);
};
</script>

<style scoped>
.search-pagination {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
</style>
