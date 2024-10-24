<template>
    <button class="btn btn-outline-primary d-inline-block btn-sm mb-5 ms-3" @click="sendResults()">Send Results</button>
</template>

<script setup>
import { watch } from 'vue';
import { useMainStore } from '../stores/mainStore.js'
import { useResults } from '@/composables/useResults';
import { postRequest } from '@/composables/useSendResults';
import { useLedgerStorage } from '@/composables/useLedgerStorage';
const { ledger, saveLedgerToLocalStorage, loadLedgerFromLocalStorage } = useLedgerStorage();

const { resultsFromLocalStorage, loadResults } = useResults();
const store = useMainStore();

const sendResults = () => {
    const results = loadLedgerFromLocalStorage();
    postRequest("https://keri.foundation/various/inquiry-keri/data/data-receiver.php",results, succes);
};

const succes = () => {
    console.log('Results have been sent.');
}

// When all multiple choice questions have been answered, load the results and send them to remote server
watch(() => store.allMultipleChoiceAnswered, (newValue) => {
    if (newValue) {
        loadResults();
        sendResults(resultsFromLocalStorage.value);
    }
});
</script>