import { ref } from 'vue';
import { useMainStore } from '../stores/mainStore.js';

export function useResults() {
    const store = useMainStore();
    const resultsFromLocalStorage = ref('No results yet');

    const loadResults = () => {
        const results = store.loadResults();
        resultsFromLocalStorage.value = results === null ? 'No results yet' : results;
    };

    return {
        resultsFromLocalStorage,
        loadResults
    };
}