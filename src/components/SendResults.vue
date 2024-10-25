<template>
    <div v-if="isDataSend" class="alert alert-success" role="alert">
        Your results have been sent successfully. Thank you for participating!
    </div>

    <button :disabled="isDataSend" v-if="store.allMultipleChoiceAnswered"
        :class="{ 'btn-disabled': isDataSend, 'btn-glow': !isDataSend }"
        class="btn btn-outline-primary d-inline-block btn-sm mb-5 ms-3" @click="sendResults()">Send Results</button>
</template>

<script setup>
import { watch, ref } from 'vue';
import { useMainStore } from '../stores/mainStore.js'
import { useResults } from '@/composables/useResults';
import { postRequest } from '@/composables/useSendResults';
import { useLedgerStorage } from '@/composables/useLedgerStorage';
const { ledger, saveLedgerToLocalStorage, loadLedgerFromLocalStorage } = useLedgerStorage();
const isDataSend = ref(false);
const { resultsFromLocalStorage, loadResults } = useResults();
const store = useMainStore();

const sendResults = () => {
    const results = loadLedgerFromLocalStorage();
    postRequest("https://keri.foundation/various/inquiry-keri/data/data-receiver.php",results, succes);
};

const succes = () => {
    console.log('Results have been sent.');
    isDataSend.value = true;
}

// // When all multiple choice questions have been answered, load the results and send them to remote server
// watch(() => store.allMultipleChoiceAnswered, (newValue) => {
//     if (newValue) {
//         loadResults();
//         sendResults(resultsFromLocalStorage.value);
//     }
// });
</script>
<style scoped>



@keyframes glow {
    0% {
        box-shadow: 0 0 0 0 #14dca0;
    }

    50% {
        box-shadow: 0 0 30px 0 #14dca0;
    }
}

.btn {
    background: none;
    color: #333;
    font: inherit;
    border: none;
    outline: none;
    cursor: pointer;
}

.btn-glow {
    background: #14dca0;
    color: #333;
    font-size: 1em;
    font-weight: 600;
    text-transform: uppercase;
    padding: 16px 34px;
    box-shadow: 0 0 0 0 #14dca0;
    animation: glow 1.4s linear infinite;
}
</style>