import { ref } from 'vue';
import myConfig from '../../myConfig';

export function useLedgerLocalStorage() {
    const ledger = ref([]);

    // Method to save the ledger to localStorage
    const saveLedgerToLocalStorage = (newLedger) => {
        // Convert the ledger array to a JSON string
        const ledgerString = JSON.stringify(newLedger);
        // Store the string in localStorage under the key 'ledger'
        localStorage.setItem(myConfig.localStorageKey, ledgerString);
    };

    // Method to load the ledger from localStorage
    const loadLedgerFromLocalStorage = () => {
        // Retrieve the ledger string from localStorage
        const ledgerString = localStorage.getItem(myConfig.localStorageKey);

        // If no ledger is found in localStorage, return an empty array
        if (!ledgerString) {
            ledger.value = [];
            return ledger.value;
        }

        return ledgerString;
    };

    return {
        ledger,
        saveLedgerToLocalStorage,
        loadLedgerFromLocalStorage,
    };
}
