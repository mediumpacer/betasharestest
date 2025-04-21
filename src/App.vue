<template>
  <div id="main">
    <header>
      <img class="logo" src="./assets/logo.svg" alt="Betashares" />
    </header>

    <SearchBar @search-submit="onSearchSubmit" />

    <SearchFilters
      v-if="userHasSearched"
      @order-change="onOrderBy"
      @apply-filters="onApplyFilters"
    />

    <SearchResultsSkeleton v-if="isLoading" :numRows="pageSize" />
    <SearchResults
      v-if="!isLoading && searchResults.length"
      :results="searchResults"
      :resultsCount="resultsCount"
    />

    <SearchPagination
      v-if="showPagination"
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-changed="onChangePage"
    />

    <p v-else-if="!isLoading && !searchResults.length && userHasSearched">
      Sorry no results for your query were found.
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import type { SearchResultsResponse, SearchResult, FilterOptions } from '@/types/search';
import SearchPagination from './components/SearchPagination.vue';

const pageSize = 15;
const userHasSearched = ref(false);
const isLoading = ref(false);
const resultsCount = ref(0);
const currentPage = ref(1);
const searchText = ref('');
const searchResults = ref<SearchResult[]>([]);
const orderByValue = ref('');
const filterOptions = ref<FilterOptions>({
  fund_size: { min: null, max: null },
  management_fee: { min: null, max: null },
  one_year_return: { min: null, max: null },
  five_year_return: { min: null, max: null },
  asset_categories: [],
  investment_suitability: [],
  management_approach: [],
  dividend_frequency: [],
});

const showPagination = computed(() => {
  return resultsCount.value > pageSize;
});

const totalPages = computed(() => {
  return Math.ceil(resultsCount.value / pageSize);
});

// Fetch the search results based on the search text and filters
const fetchSearchResults = async () => {
  isLoading.value = true;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      search_text: searchText.value,
      size: pageSize,
      from: currentPage.value,
      order_by: orderByValue.value,
      kind: ['etf'],
      ...filterOptions.value,
    }),
  };

  try {
    const response = await fetch('https://search.betashares.services/search', options);
    const results: SearchResultsResponse = await response.json();
    searchResults.value = results.results;
    resultsCount.value = results.count;
    isLoading.value = false;
  } catch (error) {
    console.error(error);
    isLoading.value = false;
  }

  userHasSearched.value = true;
};

const onSearchSubmit = (searchValue: string) => {
  searchText.value = searchValue;
  fetchSearchResults();
};

const onChangePage = (page: number) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
  fetchSearchResults();
};

const onOrderBy = (order: string) => {
  orderByValue.value = order;
  currentPage.value = 1;
  fetchSearchResults();
};

const onApplyFilters = (options: FilterOptions) => {
  filterOptions.value = options;
  currentPage.value = 1;
  fetchSearchResults();
};

onMounted(() => {});

// If search text changes we need to reset the current page
watch(searchText, (newValue) => {
  if (newValue) {
    currentPage.value = 1;
  }
});
</script>
