<template>
    <div v-if="isDataSend" class="alert-glow alert alert-success" role="alert">
        Your results have been sent successfully. Thank you for participating!
    </div>

    <MathCaptcha v-if="store.allMultipleChoiceAnswered" @captcha-validated="isCaptchaValid = $event" />

    <button :disabled="!isCaptchaValid" v-if="!isDataSend && isCaptchaValid"
        :class="{ 'btn-disabled': isDataSend, 'glow': !isDataSend }" class="btn btn-outline-secondary d-inline-block"
        @click="sendResults()">Send Results</button>
</template>

<script setup>
import { ref } from 'vue';
import { useMainStore } from '../stores/mainStore.js'
import { postRequest } from '@/composables/useSendResults';
import { useLedgerLocalStorage } from '@/composables/useLedgerLocalStorage';
import MathCaptcha from './MathCaptcha.vue';
import myConfig from '../../myConfig.js';

const { loadLedgerFromLocalStorage } = useLedgerLocalStorage();
const isDataSend = ref(false);
const isCaptchaValid = ref(false);

const store = useMainStore();

const sendResults = () => {
    const results = loadLedgerFromLocalStorage();
    postRequest(myConfig.dataReceiverEndpoint, results, succes);
};

const succes = () => {
    isDataSend.value = true;
}
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

button:not(:disabled).glow {
    background: #14dca0;
    color: #333;
    font-size: 1em;
    font-weight: 600;
    text-transform: uppercase;
    padding: 16px 34px;
    box-shadow: 0 0 0 0 #14dca0;
    animation: glow 1.4s linear infinite;
}

.alert-glow {
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