<template>
  <div class="filters-bar">
    <label for="order-by">Order By: </label>
    <select class="filter-dropdown" id="order-by" v-model="orderByValue">
      <option value="">Select an option</option>
      <option v-for="option in orderByOptions" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>

    <div
      :class="['filters-toggle button', { 'filters-toggle--active': showFilters }]"
      @click="toggleFilters"
    >
      <IconFilter width="20" height="20" /> Filters
    </div>
  </div>

  <Transition>
    <div class="filter-details" ref="filterDetailsRef" v-show="showFilters">
      <div class="filter-details__row">
        <label class="primary-label">Fund Size:</label>
        <span>
          <label for="fund-size-min">Min:</label>
          <input
            id="fund-size-min"
            v-model="fundSizeMinValue"
            type="text"
            placeholder="Min"
            maxlength="20"
          />
        </span>
        <span>
          <label for="fund-size-min">Max:</label>
          <input
            id="fund-size-min"
            v-model="fundSizeMaxValue"
            type="text"
            placeholder="Max"
            maxlength="20"
          />
        </span>
      </div>
      <div class="filter-details__row">
        <label class="primary-label">Management Fee:</label>
        <span>
          <label for="management-fee-min">Min:</label>
          <input
            id="management-fee-min"
            type="text"
            v-model="managementFeeMinValue"
            placeholder="Min"
            maxlength="5"
          />
        </span>
        <span>
          <label for="management-fee-max">Max:</label>
          <input
            id="management-fee-max"
            type="text"
            v-model="managementFeeMaxValue"
            placeholder="Max"
            maxlength="5"
          />
        </span>
      </div>
      <div class="filter-details__row">
        <label class="primary-label">One Year Return:</label>
        <span>
          <label for="one-year-return-min">Min:</label>
          <input
            id="one-year-return-min"
            type="text"
            v-model="oneYearReturnMinValue"
            placeholder="Min"
            maxlength="5"
          />
        </span>
        <span>
          <label for="one-year-return-max">Max:</label>
          <input
            id="one-year-return-max"
            type="text"
            v-model="oneYearReturnMaxValue"
            placeholder="Max"
            maxlength="5"
          />
        </span>
      </div>
      <div class="filter-details__row">
        <label class="primary-label">Five Year Return:</label>
        <span>
          <label for="five-year-return-min">Min:</label>
          <input
            id="five-year-return-min"
            type="text"
            v-model="fiveYearReturnMinValue"
            placeholder="Min"
            maxlength="5"
          />
        </span>
        <span>
          <label for="five-year-return-max">Max:</label>
          <input
            id="five-year-return-max"
            type="text"
            v-model="fiveYearReturnMaxValue"
            placeholder="Max"
            maxlength="5"
          />
        </span>
      </div>

      <div class="filter-details__row" ref="fundCategoryRef">
        <label class="primary-label">Fund Category:</label>
        <input type="checkbox" id="fund-category-1" class="filter-checkbox" value="Technology" />
        <label class="select-label" for="fund-category-1">Technology</label>
        <input type="checkbox" id="fund-category-2" class="filter-checkbox" value="Thematic" />
        <label class="select-label" for="fund-category-2">Thematic</label>
        <input
          type="checkbox"
          id="fund-category-3"
          class="filter-checkbox"
          value="International Equities"
        />
        <label class="select-label" for="fund-category-3">International Equities</label>
        <input
          type="checkbox"
          id="fund-category-4"
          class="filter-checkbox"
          value="Australian Equities"
        />
        <label class="select-label" for="fund-category-4">Australian Equities</label>
      </div>

      <div class="filter-details__row" ref="investmentSuitabilityRef">
        <label class="primary-label">Investment Suitability:</label>
        <input
          type="checkbox"
          id="investment-suitability-1"
          class="filter-checkbox"
          value="Capital Growth"
        />
        <label class="select-label" for="investment-suitability-1">Capital Growth</label>
        <input
          type="checkbox"
          id="investment-suitability-2"
          class="filter-checkbox"
          value="Regular Income"
        />
        <label class="select-label" for="investment-suitability-2">Regular Income</label>
      </div>

      <div class="filter-details__row" ref="managementApproachRef">
        <label class="primary-label">Management Approach:</label>
        <input type="checkbox" id="management-approach-1" class="filter-checkbox" value="Passive" />
        <label class="select-label" for="management-approach-1">Passive</label>
        <input type="checkbox" id="management-approach-2" class="filter-checkbox" value="Active" />
        <label class="select-label" for="management-approach-2">Active</label>
      </div>

      <div class="filter-details__row" ref="dividendFrequencyRef">
        <label class="primary-label">Dividend Frequency:</label>
        <input type="checkbox" id="dividend-frequency-1" class="filter-checkbox" value="Annually" />
        <label class="select-label" for="dividend-frequency-1">Annually</label>
        <input
          type="checkbox"
          id="dividend-frequency-2"
          class="filter-checkbox"
          value="Semiannually"
        />
        <label class="select-label" for="dividend-frequency-2">Semiannually</label>
        <input
          type="checkbox"
          id="dividend-frequency-3"
          class="filter-checkbox"
          value="Quarterly"
        />
        <label class="select-label" for="dividend-frequency-3">Quarterly</label>
      </div>

      <div class="filter-details__row filter-buttons">
        <button type="button" class="filter-details__button button" @click="applyFilters">
          Apply Filters
        </button>

        <button
          type="button"
          class="filter-details__button filter-details__button--clear button"
          @click="clearFilters"
        >
          Clear Filters
        </button>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { watch, ref } from 'vue';
import type { FilterOptions } from '@/types/search';
import { sanitize } from '@/utils/formatters';

const emit = defineEmits(['order-change', 'apply-filters']);
const orderByValue = ref('');
const showFilters = ref(false);

const orderByOptions = [
  { label: 'Fund Size (Asc)', value: 'fund_size.asc' },
  { label: 'Fund Size (Desc)', value: 'fund_size.desc' },
  { label: 'Management Fee (Asc)', value: 'management_fee.asc' },
  { label: 'Management Fee (Desc)', value: 'management_fee.desc' },
  { label: 'One Year Return (Asc)', value: 'one_year_return.asc' },
  { label: 'One Year Return  (Desc)', value: 'one_year_return.desc' },
  { label: 'Five Year Return (Asc)', value: 'five_year_return.asc' },
  { label: 'Five Year Return  (Desc)', value: 'five_year_return.desc' },
];

const fundSizeMinValue = ref(null);
const fundSizeMaxValue = ref(null);
const managementFeeMinValue = ref(null);
const managementFeeMaxValue = ref(null);
const oneYearReturnMinValue = ref(null);
const oneYearReturnMaxValue = ref(null);
const fiveYearReturnMinValue = ref(null);
const fiveYearReturnMaxValue = ref(null);

const filterDetailsRef = ref<HTMLElement | null>(null);
const fundCategoryRef = ref<HTMLInputElement | null>(null);
const investmentSuitabilityRef = ref<HTMLInputElement | null>(null);
const managementApproachRef = ref<HTMLInputElement | null>(null);
const dividendFrequencyRef = ref<HTMLInputElement | null>(null);

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

// Apply the filters
const applyFilters = () => {
  filterOptions.value.fund_size.min = sanitize(fundSizeMinValue.value);
  filterOptions.value.fund_size.max = sanitize(fundSizeMaxValue.value);
  filterOptions.value.management_fee.min = sanitize(managementFeeMinValue.value);
  filterOptions.value.management_fee.max = sanitize(managementFeeMaxValue.value);
  filterOptions.value.one_year_return.min = sanitize(oneYearReturnMinValue.value);
  filterOptions.value.one_year_return.max = sanitize(oneYearReturnMaxValue.value);
  filterOptions.value.five_year_return.min = sanitize(fiveYearReturnMinValue.value);
  filterOptions.value.five_year_return.max = sanitize(fiveYearReturnMaxValue.value);

  const categoryCheckboxes = fundCategoryRef.value?.querySelectorAll(
    'input[type="checkbox"]:checked',
  );

  const suitabilityCheckboxes = investmentSuitabilityRef.value?.querySelectorAll(
    'input[type="checkbox"]:checked',
  );

  const approachCheckboxes = managementApproachRef.value?.querySelectorAll(
    'input[type="checkbox"]:checked',
  );

  const frequencyCheckboxes = dividendFrequencyRef.value?.querySelectorAll(
    'input[type="checkbox"]:checked',
  );

  filterOptions.value.asset_categories = categoryCheckboxes
    ? [...categoryCheckboxes].map((checkbox) => {
        return (checkbox as HTMLInputElement).value;
      })
    : [];

  filterOptions.value.investment_suitability = suitabilityCheckboxes
    ? [...suitabilityCheckboxes].map((checkbox) => {
        return (checkbox as HTMLInputElement).value;
      })
    : [];

  filterOptions.value.management_approach = approachCheckboxes
    ? [...approachCheckboxes].map((checkbox) => {
        return (checkbox as HTMLInputElement).value;
      })
    : [];

  filterOptions.value.dividend_frequency = frequencyCheckboxes
    ? [...frequencyCheckboxes].map((checkbox) => {
        return (checkbox as HTMLInputElement).value;
      })
    : [];

  emit('apply-filters', filterOptions.value);
};

// reset all the filters to default values
const clearFilters = async () => {
  fundSizeMinValue.value = null;
  fundSizeMaxValue.value = null;
  managementFeeMinValue.value = null;
  managementFeeMaxValue.value = null;
  oneYearReturnMinValue.value = null;
  oneYearReturnMaxValue.value = null;
  fiveYearReturnMinValue.value = null;
  fiveYearReturnMaxValue.value = null;

  if (filterDetailsRef.value) {
    filterDetailsRef.value
      .querySelectorAll('input[type=checkbox]')
      .forEach((el) => ((el as HTMLInputElement).checked = false));
  }

  filterOptions.value = {
    fund_size: { min: null, max: null },
    management_fee: { min: null, max: null },
    one_year_return: { min: null, max: null },
    five_year_return: { min: null, max: null },
    asset_categories: [],
    investment_suitability: [],
    management_approach: [],
    dividend_frequency: [],
  };

  emit('apply-filters', filterOptions.value);
};

const toggleFilters = () => {
  showFilters.value = !showFilters.value;
};

watch(orderByValue, (newValue) => {
  if (newValue) {
    emit('order-change', newValue);
  }
});
</script>

<style scoped>
.filters-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  width: 100%;
}

.filters-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  color: var(--colour-text);
  background-color: var(--color-standard-grey);
  width: 10rem;
  margin-left: auto;

  &:hover {
    background-color: var(--color-beta-orange);
    color: var(--color-white);
  }
}

.filters-toggle--active {
  background-color: green;
  color: var(--color-white);
}

label,
input {
  margin-right: 0.8rem;
}

label {
  font-weight: bold;
  font-size: 1.4rem;
}

.filter-details {
  background-color: #fafafa;
  padding: 1rem;
  border-radius: 0.4rem;
  max-height: 80rem;
}

.filter-details__row {
  margin-bottom: 1.6rem;

  & > span {
    display: inline-block;
  }
}

.primary-label {
  display: block;
  font-weight: bold;
  margin-right: 0.5rem;

  @media (min-width: 768px) {
    display: inline-block;
    width: 20rem;
  }
}

.select-label {
  display: inline-block;
  font-weight: bold;
  margin-left: 0.5rem;
  cursor: pointer;
  border-radius: 4rem;
  padding: 0.5rem 1rem;
  font-size: 1.4rem;
  color: var(--colour-text);
  background-color: var(--color-standard-grey);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--color-beta-orange-highlight);
    color: var(--color-white);
  }

  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
}

.filter-checkbox {
  display: none;
}

.filter-checkbox:checked + .select-label {
  background-color: var(--color-beta-orange);
  color: var(--color-white);

  &:hover {
    background-color: var(--color-beta-orange-highlight);
  }
}

input,
select {
  border: 1px solid var(--color-standard-grey);
  background: white;
  padding: 0.6rem;
  border-radius: 0.2rem;
  cursor: pointer;
}

.filter-buttons {
  margin-top: 3rem;
}

.filter-details__button {
  margin-right: 1rem;
}

.filter-details__button--clear {
  background-color: var(--color-standard-grey);
  color: var(--colour-text);

  &:hover {
    background-color: var(--color-beta-orange-highlight);
    color: var(--color-white);
  }
}

.v-enter-active,
.v-leave-active {
  transition:
    opacity 0.5s ease,
    max-height 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
