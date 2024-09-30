<template>
    <div id="info-bar">
        <p>Score: {{ score }}, Questions To Go: {{ nrTasksToGo }}</p>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useMainStore } from '../stores/mainStore.js';
import myConfig from '../../myConfig.js';

const store = useMainStore();
const score = computed(() => store.score);
const nrOfStatementsChosen = computed(() => store.nrOfStatementsChosen);
let nrTasksToGo = computed(() => myConfig.nrOfTasksToBeDone - nrOfStatementsChosen.value);
</script>

<style scoped>
</style>