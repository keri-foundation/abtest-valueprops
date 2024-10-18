<template>
    <button class="btn btn-outline-primary d-inline-block btn-sm mb-5 ms-3"
        @click="sendEmailWithResults(resultsFromLocalStorage)">Send Results via Email</button>
    <div v-if="emailFallbackVisible">
        <p>Copy the following email content:</p>
        <textarea v-model="emailContent" readonly></textarea>
        <button class="btn btn-outline-primary d-inline-block btn-sm mb-5" @click="copyToClipboard">Copy to
            Clipboard</button>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Modal } from 'bootstrap';
import { useMainStore } from '../stores/mainStore.js'
import { useResults } from '@/composables/useResults';
const { resultsFromLocalStorage, loadResults } = useResults();
const store = useMainStore();

// Reactive state variables
const emailFallbackVisible = ref(false);
const emailContent = ref('');

const sendEmailWithResults = (results) => {
    alert('ATTENTION: an email will be created with the results. Please send this email to us.');
    const subject = encodeURIComponent('Quiz Results');
    const body = encodeURIComponent(`Here are the results: ${results}`);
    const mailtoLink = `mailto:kor@dwarshuis.com?subject=${subject}&body=${body}`;

    try {
        window.location.href = mailtoLink;
    } catch (e) {
        emailContent.value = `Subject: Quiz Results\n\nHere are the results: ${results}`;
        emailFallbackVisible.value = true;
    }
};

const copyToClipboard = () => {
    navigator.clipboard.writeText(emailContent.value).then(() => {
        alert('Email content copied to clipboard');
    });
};

watch(() => store.allMultipleChoiceAnswered, (newValue) => {
    if (newValue) {
        loadResults();
        console.log(resultsFromLocalStorage.value);
        sendEmailWithResults(resultsFromLocalStorage.value);

    }
});

</script>