<template>
  <div class="search-results">
    <h2 class="search-results__title">
      Search Results <span class="search-results__title-count">({{ resultsCount }})</span>:
    </h2>
    <ul class="search-results__list" v-if="results.length">
      <li v-for="result in results" :key="result.symbol" class="search-results__item">
        <a href="#"
          ><h3 class="search-results__item-title">
            <span class="search-results__item-code">{{ result.symbol }}</span
            >{{ result.display_name }}
          </h3></a
        >
        <p class="search-results__item-category" v-if="result.categories.length">
          <span v-for="cat in result.categories" :key="cat">{{ cat }}</span>
        </p>
        <p v-if="result.flagship_description_short" class="search-results__item-description">
          {{ result.flagship_description_short }}
        </p>
        <div class="search-results__item-details">
          <div>
            <span class="search-results__detail-label">Fund Size:</span>
            <span class="search-results__detail-value">{{
              formatHundredToMillion(result.fund_size) || 'N/A'
            }}</span>
          </div>
          <div>
            <span class="search-results__detail-label">Management Fee:</span>
            <span class="search-results__detail-value">{{
              `${result.management_fee}%` || 'N/A'
            }}</span>
          </div>
          <div>
            <span class="search-results__detail-label">One Year Return:</span>
            <span class="search-results__detail-value">{{
              formatPercentage(result.one_year_return) || 'N/A'
            }}</span>
          </div>
          <div>
            <span class="search-results__detail-label">Five Year Return:</span>
            <span class="search-results__detail-value">{{
              formatPercentage(result.five_year_return) || 'N/A'
            }}</span>
          </div>
          <div>
            <span class="search-results__detail-label">Investment Suitability:</span>
            <span class="search-results__detail-value">{{
              result.investment_suitability || 'N/A'
            }}</span>
          </div>
          <div>
            <span class="search-results__detail-label">Management Approach:</span>
            <span class="search-results__detail-value">{{
              result.management_approach || 'N/A'
            }}</span>
          </div>
          <div>
            <span class="search-results__detail-label">Dividend Frequency:</span>
            <span class="search-results__detail-value">{{
              result.dividend_frequency || 'N/A'
            }}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { SearchResult } from '@/types/search';
import { formatHundredToMillion, formatPercentage } from '@/utils/formatters.ts';

defineProps({
  results: {
    type: Array<SearchResult>,
    default: () => [],
  },
  resultsCount: {
    type: Number,
    default: null,
  },
});
</script>

<style scoped>
.search-results {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.search-results__list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.search-results__item {
  padding: 1rem;
  background: #fff;
  border: 0.1rem solid var(--color-standard-grey);
  box-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.1);
  border-radius: 0.4rem;
}

.search-results__item a {
  text-decoration: none;
  color: var(--color-text);

  &:hover .search-results__item-title {
    text-decoration: underline;
  }
}

.search-results__item-title {
  color: var(--color-beta-orange);
  font-weight: 700;
  display: flex;
  align-items: center;
}

.search-results__item-code {
  border-radius: 20rem;
  font-size: 1.4rem;
  line-height: 1;
  padding: 0.4rem 0.8rem;
  background: var(--color-beta-orange);
  color: #fff;
  margin-right: 0.4rem;
  font-weight: bold;
}

.search-results__item-description {
  font-size: 1.4rem;
  margin: 0.5rem 0;
}

.search-results__item-category {
  display: inline-flex;
  gap: 0.6rem;
  font-size: 1.2rem;

  & span {
    color: var(--color-text-light);
    font-weight: 600;

    &:not(:last-child)::after {
      content: ', ';
      color: var(--color-text-light);
    }
  }
}

.search-results__item-details {
  font-size: 1.2rem;
  display: flex;
  flex-wrap: wrap;

  & > div {
    margin-right: 2rem;
    flex-basis: 30%;
  }
}

.search-results__detail-label {
  font-weight: bold;
  color: #333;
  margin-right: 0.8rem;
}
</style>
