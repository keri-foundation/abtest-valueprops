<template>
  <div id="animation-container">
    <h1 class="text-center">Autonomous Identity Test</h1>
    <div class="vue-speedometer-container">
      <VueSpeedometer @click="showResults" :minValue="0" :maxValue="100" :value="percentage" :fluidWidth="true"
        :ringWidth="20" needleTransition="easeElastic" :needleTransitionDuration="3333"  />
    </div>
    <CylinderLock ref="refCylinderLock" />
    <Statements ref="refStatements" />
    <OpeningScreen />
    <ToggleSound />
    <OffCanvas @call-show-results="showResults" />

    <Results ref="refResults" />
    <MultipleChoiceModal />
    <SendComments />
    <SendResults />
  </div>
</template>


<script setup>
import { ref, computed, watch } from 'vue';
import CylinderLock from './components/CylinderLock.vue'
import OpeningScreen from './components/OpeningScreen.vue';
import Statements from './components/Statements.vue';
import MultipleChoiceModal from './components/MultipleChoiceModal.vue';
import ToggleSound from './components/ToggleSound.vue';
import Results from './components/Results.vue';
import OffCanvas from './components/OffCanvas.vue';
import SendComments from './components/SendComments.vue';
import VueSpeedometer from "vue-speedometer"
import SendResults from './components/SendResults.vue';
import { useLedgerLocalStorage } from './composables/useLedgerLocalStorage';

import myConfig from '../myConfig';
import { useMainStore } from './stores/mainStore.js'
import { useSounds } from '@/composables/useSounds';
const { clickSound } = useSounds();

const store = useMainStore();
const nrOfMultipleChoiceAnswersChosen = computed(() => store.nrOfMultipleChoiceAnswersChosen);
const { saveLedgerToLocalStorage } = useLedgerLocalStorage();

const refStatements = ref(null);
const refCylinderLock = ref(null);
const refResults = ref(null);

const totalAvailablePoints = computed(() => {
  const points = +store.nrOfStatementsChosen * 100;
  return points;
});

const score = computed(() => {
  const currentScore = +store.score;
  return currentScore;
});

const percentage = computed(() => {
  const totalPoints = totalAvailablePoints.value;
  const currentScore = score.value;
  const percent = totalPoints ? (currentScore / totalPoints) * 100 : 0;
  return percent;
});

import { onMounted } from 'vue';

onMounted(() => {
  document.addEventListener('click', function (event) {
    let targetElement = event.target;

    // Traverse up to the closest <button>, <a>, or <input> if the clicked element is a child
    if (targetElement.tagName === 'SVG' || targetElement.tagName === 'PATH') {
      targetElement = targetElement.closest('button, a, input');
    }

    if (targetElement && (targetElement.tagName === 'BUTTON' ||
      targetElement.tagName === 'A' ||
      targetElement.tagName === 'INPUT')) {
    }
    clickSound.play();
  });

});

const showNewStatement = () => {
  if (refStatements.value && typeof refStatements.value.showNewStatement === 'function') {
    const wait = refCylinderLock.value.startFullAnimationDuringRandomLength() - 300;
    setTimeout(() => {
      refStatements.value.showNewStatement();
    }, wait);
  }
};

const showResults = () => {
  if (refResults.value && typeof refResults.value.showResults === 'function') {
    refResults.value.showResults();
  }
};

watch(() => store.shouldNewStatementShow, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    if (nrOfMultipleChoiceAnswersChosen.value >= myConfig.nrOfTasksToBeDone) {
      store.setAllMultipleChoiceAnswered(true);
    } else {
      if (newValue) {// if store.shouldNewStatementShow is true
        showNewStatement();
        store.setShouldNewStatementShow(false);
      }
    }
  }
});

// Watch the getter `ledgerArray` for changes, this getter is necessary to trigger the watch because the normal way of watching the store.ledger directly does not work
watch(() => store.ledgerArray, (newValue, oldValue) => {
  saveLedgerToLocalStorage(newValue);
}, { deep: true });

</script>