import { ref } from 'vue';

export function useLedgerStorage() {
    const ledger = ref([]);

    // Method to save the ledger to localStorage
    const saveLedgerToLocalStorage = (newLedger) => {
        // Convert the ledger array to a JSON string
        const ledgerString = JSON.stringify(newLedger);
        // Store the string in localStorage under the key 'ledger'
        localStorage.setItem('ledger', ledgerString);
        console.log('Ledger saved to localStorage:', ledgerString);
    };

    // Method to load the ledger from localStorage
    const loadLedgerFromLocalStorage = () => {
        // Retrieve the ledger string from localStorage
        const ledgerString = localStorage.getItem('ledger');

        // If no ledger is found in localStorage, return an empty array
        if (!ledgerString) {
            console.log('No ledger found in localStorage.');
            ledger.value = [];
            return ledger.value;
        }

        // Convert the string back into a JavaScript object (array of entries)
        ledger.value = JSON.parse(ledgerString);
        console.log('Ledger loaded from localStorage:', ledger.value);
        return ledger.value;
    };

    return {
        ledger,
        saveLedgerToLocalStorage,
        loadLedgerFromLocalStorage,
    };
}
