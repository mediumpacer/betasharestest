<template>
  <div class="search-bar">
    <form class="search-bar__form" role="search" @submit.prevent>
      <div class="search-bar__form-inner">
        <IconSearch />
        <input
          ref="searchInputRef"
          type="search"
          class="search-bar__input"
          v-model="searchValue"
          autocomplete="off"
          list="suggestions"
          placeholder="Search the site by ASX code, fund name, phrase or topic"
          :aria-expanded="isSuggestionsOpen"
          max-length="100"
          @input="onInput"
          @blur="onBlur"
          @focus="onFocus"
        />

        <ul
          v-if="isSuggestionsOpen"
          class="search-bar__suggestions"
          role="listbox"
          id="suggestions"
        >
          <li
            v-for="item in suggestions"
            :value="item"
            :key="item"
            role="option"
            class="search-bar__suggestions-item"
            @click="setSuggestedValue(item)"
          >
            <IconSearch width="12" height="12" />
            {{ item }}
          </li>
        </ul>

        <IconClose v-if="searchValue.length" class="clear-icon" @click="resetSearchInput" />
      </div>
      <button
        type="submit"
        class="search-bar__submit"
        aria-label="Search"
        @click="submitSearchForm()"
      >
        Search
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import IconSearch from './icons/IconSearch.vue';
import { sanitize } from '@/utils/formatters.ts';

const props = defineProps({
  enableAutoFocus: {
    type: Boolean,
    default: false,
  },
  focusDelay: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(['search-submit']);
const searchInputRef = ref<HTMLInputElement | null>(null);
const searchValue = ref('');

// Common terms for suggestions
const commonTerms = [
  'Betashares',
  'Bitcoin',
  'Exchange',
  'Funds',
  'International',
  'Invest',
  'Australian',
  'Thematic',
  'Sustainability',
  'Capital growth',
  'Cybersecurity',
  'Cloud computing',
];

const suggestions = ref<string[]>([]);
const isSuggestionsOpen = ref(false);

// Fires when user types in the search input and fetches suggestions and search data
const onInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  updateSuggestions(value);
  submitSearchForm();
};

// Fetches matching words from the common terms
const getMatchingWords = (s: string) => {
  const matches = commonTerms.filter((words) => words.toLowerCase().includes(s.toLowerCase()));
  return Promise.resolve(matches);
};

// Debounced function to update and toggle the suggestions dropdown
const updateSuggestions = useDebounceFn((query: string) => {
  getMatchingWords(query).then((words) => {
    suggestions.value.splice(0, suggestions.value.length, ...words.slice(0, 5));
  });

  isSuggestionsOpen.value = suggestions.value.length > 0;
}, 50);

// Sets the search value to the selected suggestion and closes the suggestions dropdown
const setSuggestedValue = (value: string) => {
  searchValue.value = value;
  isSuggestionsOpen.value = false;
  submitSearchForm();
};

function onFocus() {
  updateSuggestions(searchValue.value);
}

function onBlur() {
  // give the suggestion item a chance to trigger
  setTimeout(() => {
    isSuggestionsOpen.value = false;
  }, 200);
}

// Automatically focuses the search input if enabled
function autoFocus() {
  if (props.enableAutoFocus) {
    searchInputRef.value?.focus();
  }
}

// Submits the search form
const submitSearchForm = useDebounceFn(() => {
  emit('search-submit', sanitize(searchValue.value));
}, 500);

// Clears the search input
const resetSearchInput = () => {
  searchValue.value = '';
  isSuggestionsOpen.value = false;
};

onMounted(() => {
  setTimeout(() => {
    autoFocus();
  }, props.focusDelay);
});
</script>

<style scoped>
.search-bar {
  --search-bar-height: 6rem;

  display: flex;
  width: 100%;
  height: var(--search-bar-height);
  background-color: #fff;
  border: 1px solid var(--color-standard-grey);
  border-bottom: 2px solid var(--color-standard-grey);
  border-top-right-radius: 0.4rem;
  border-bottom-right-radius: 0.4rem;
  position: relative;
}

.search-bar__form {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1rem;
}

.search-bar__form-inner {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  flex: 1;
}

.search-bar__input {
  font-size: 1.8rem;
  outline: none;
  border: none;
  flex: 1;
}

.search-bar__submit {
  font-size: 1.8rem;
  background-color: var(--color-beta-orange);
  color: #fff;
  border: none;
  border-radius: 0.4rem;
  height: var(--search-bar-height);
  padding: 0 2rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--color-beta-orange-highlight);
  }
}

.search-bar__suggestions {
  background: #fff;
  box-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.1);
  border: 1px solid var(--color-standard-grey);
  width: calc(100% + 0.2rem);
  position: absolute;
  left: -0.1rem;
  top: calc(var(--search-bar-height) - 0.3rem);
  transition: all 0.2s ease-in-out;
  list-style-type: none;
  margin: 0;
  padding: 0;
  z-index: 100;
}

.search-bar__suggestions-item {
  padding: 1rem;
  border-left: 2px solid transparent;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border 0.2s ease;

  &:hover {
    background-color: #f0f0f0;
    border-left: 2px solid var(--color-beta-orange);
  }
}

.clear-icon {
  cursor: pointer;
  margin-left: auto;
}
</style>
