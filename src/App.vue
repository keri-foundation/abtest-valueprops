<template>
  <div id="animation-container">
    <h1 class="text-center">Autonomous Identity Test</h1>
    <CylinderLock ref="refCylinderLock" />
    <Statements ref="refStatements" />
    <div class="vue-speedometer-container">
      <VueSpeedometer @click="showResults" :minValue="0" :maxValue="100" :value="percentage" :fluidWidth="true"
        :ringWidth="60" needleTransition="easeElastic" :needleTransitionDuration="3333" :customSegmentLabels='[
          {
            text: "No",
            position: "INSIDE",
            color: "#555",
          },
          {
            text: "Little",
            position: "INSIDE",
            color: "#555",
          },
          {
            text: "Medium",
            position: "INSIDE",
            color: "#555",
            fontSize: "19px",
          },
          {
            text: "Good",
            position: "INSIDE",
            color: "#555",
          },
          {
            text: "Excellent",
            position: "INSIDE",
            color: "#555",
          },
        ]' />
    </div>
    <OpeningScreen />
    <Conclusion />
    <ToggleSound />
    <OffCanvas @call-show-results="showResults" />
    <Results ref="refResults" />
    <MultipleChoiceModal />
    <!-- <p class="fs-5 text-center">awareness</p> -->
    <button @click="sendEmailWithResults(resultsFromLocalStorage)">Send Email</button>
    <div v-if="emailFallbackVisible">
      <p>Copy the following email content:</p>
      <textarea v-model="emailContent" readonly></textarea>
      <button @click="copyToClipboard">Copy to Clipboard</button>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, watch } from 'vue';
import CylinderLock from './components/CylinderLock.vue'
import OpeningScreen from './components/OpeningScreen.vue';
import Conclusion from './components/Conclusion.vue'
import Statements from './components/Statements.vue';
import MultipleChoiceModal from './components/MultipleChoiceModal.vue';
import ToggleSound from './components/ToggleSound.vue';
import Results from './components/Results.vue';
import OffCanvas from './components/OffCanvas.vue';
import VueSpeedometer from "vue-speedometer"

import myConfig from '../myConfig';
import { useMainStore } from './stores/mainStore.js'
const baseUrl = import.meta.env.BASE_URL;

import { useSounds } from '@/composables/useSounds';
const { clickSound } = useSounds();

const store = useMainStore();
const nrOfMultipleChoiceAnswersChosen = computed(() => store.nrOfMultipleChoiceAnswersChosen);

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

import { useResults } from '@/composables/useResults';
const { resultsFromLocalStorage, loadResults } = useResults();

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
    const wait = refCylinderLock.value.startFullAnimationDuringRandomLength();
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

// Reactive state variables
const emailFallbackVisible = ref(false);
const emailContent = ref('');

const sendEmailWithResults = (results) => {
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


const resetStatementsAndMultipleChoice = () => {
  store.setStatementChosen(false);
  store.setMultipleChoiceAnswerChosen(false);
  store.setAllStatementsChosen(false);
  store.setAllMultipleChoiceAnswered(false);
};
</script>