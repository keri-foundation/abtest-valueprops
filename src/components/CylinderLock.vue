<template>
  <div class="lock-container" ref="lockContainer">
    <div v-for="(item, index) in 10" :key="index" class="lock-cylinder" :data-id="index + 1" ref="cylinders">
    </div>
  </div>
  <div class="knob-container" ref="knobContainer">
    <div class="knob" ref="knob">
      <div class="knob-center"></div> <!-- Vault knob center -->
    </div>
  </div>

  <div class="key" ref="key"></div>
  <div class="nr-of-tasks-to-go text-center">Questions to go:<span class="nr-of-tasks-to-go-nr">{{ nrTasksToGo }}</span>
  </div>
  <Conclusion />
</template>

<script setup>

import { useSounds } from '@/composables/useSounds';
const { lockSound, keySound } = useSounds();

import { ref, onMounted, computed } from 'vue';
import { useMainStore } from '../stores/mainStore.js'
import myConfig from '../../myConfig.js';

import Conclusion from './Conclusion.vue'

const cylinders = ref([]);
const knob = ref(null);
const key = ref(null);
const lockContainer = ref(null);
const knobContainer = ref(null);

const store = useMainStore();

const emit = defineEmits(['call-show-new-statement']);
const nrOfStatementsChosen = computed(() => store.nrOfStatementsChosen);
let nrTasksToGo = computed(() => myConfig.nrOfTasksToBeDone - nrOfStatementsChosen.value);

let timeoutReset = null;

let cylinderLockAnimationRun;

function moveKeyInsideLock() {
  const rect = lockContainer.value.getBoundingClientRect();
  key.value.style.left = `${rect.left - 30}px`;
  key.value.style.top = `${rect.bottom - 98}px`;
}

function moveKeyOutsideLock() {
  const rect = lockContainer.value.getBoundingClientRect();
  key.value.style.left = `${rect.right - 67}px`;
  key.value.style.top = `${rect.bottom - 80}px`;
}

const rotateKnobFixedDuration = (animLength) => {
  knobContainer.value.classList.add("rotating-object");

  setTimeout(() => {
    knobContainer.value.classList.remove("rotating-object");
  }, animLength);// This is the duration of the animation, see the CSS

  const playLockSound = () => {
    lockSound.play();
  };

  const intervalId = setInterval(playLockSound, myConfig.cylinderLockSpeed);

  setTimeout(() => {
    clearInterval(intervalId);
  }, animLength);
};

function playKeySoundDelayed() {
  setTimeout(() => {
    keySound.play();
  }, 200);
}

function moveCylindersToUnlockPosition() {
  cylinders.value.forEach(cylinder => {
    cylinder.classList.remove('step-1', 'step-2', 'step-3');
  });
}


// Start cylinder randomization after a random time period
function startFullAnimationDuringRandomLength() {
  moveKeyOutsideLock();
  cylinderLockAnimationRun.start();
  const randomTime = myConfig.lockAnimationMinimalSeconds * 1000 + Math.random() * (myConfig.lockAnimationMaximalSeconds - myConfig.lockAnimationMinimalSeconds) * 1000;
  rotateKnobFixedDuration(randomTime);
  timeoutReset = setTimeout(() => {
    playKeySoundDelayed();
    cylinderLockAnimationRun.stop();
    moveCylindersToUnlockPosition();
    moveKeyInsideLock();
  }, randomTime);
  return randomTime;
}


function cylinderLockAnimation() {
  // Function to update the cylinder based on its step
  function updateCylinder(cylinder, step) {
    cylinder.classList.remove('step-1', 'step-2', 'step-3');
    if (step === 1) {
      cylinder.classList.add('step-1');
    } else if (step === 2) {
      cylinder.classList.add('step-2');
    } else if (step === 3) {
      cylinder.classList.add('step-3');
    }
    // if data-id is 10 then if step is 0 then add step-1 class, so that the key will always be hold by this cylinder
    if (cylinder.getAttribute('data-id') === '10') {
      if (step === 0) {
        cylinder.classList.add('step-1');
      }
    }
  }

  // Randomize function to trigger animations for all cylinders
  function randomizeCylinders() {
    cylinders.value.forEach(cylinder => {
      const randomStep = Math.floor(Math.random() * 4);
      updateCylinder(cylinder, randomStep);
    });
  }

  let randomizeCylindersInterval;

  function start() {
    // Make cylinders move every cylinderLockSpeed milliseconds
    randomizeCylindersInterval = setInterval(() => {
      randomizeCylinders();
    }, myConfig.cylinderLockSpeed);
  }

  function stop() {
    // Make cylinders move every cylinderLockSpeed milliseconds
    clearInterval(randomizeCylindersInterval);
  }

  // Initial position of key
  moveKeyOutsideLock();
  return {
    start,
    stop
  }
};

onMounted(() => {
  cylinderLockAnimationRun = cylinderLockAnimation();
});

defineExpose({
  startFullAnimationDuringRandomLength
});
</script>

<style scoped>
.lock-container {
  display: flex;
  justify-content: center;
  /* width: auto; */
  width: 300px;
  margin: auto;
  padding: 3em 3em 0;
  /*background: #5d5f5f;*/
  border: 2px solid #553e3e;
  gap: 0;
  margin-bottom: 20px;
  box-sizing: border-box;
}


.nr-of-tasks-to-go {
  margin-top: 6em;
}

.nr-of-tasks-to-go-nr {
  font-size: 4em;
  /*color: #d4af37;*/
  text-align: center;
  margin-bottom: 20px;
  width: 1em;
  display: block;
  margin: auto;
}

.lock-cylinder {
  width: 20px;
  height: 100px;
  position: relative;
  /*cursor: pointer;*/
  transition: transform 0.1s ease;
  /* Ensure smooth transition */
  /*transform: translateY(1px);*/
  transform: translate(0px, 2px);
  
  /* Make the cylinder overlap the previous one by 1px */
  display: inline-block;
  margin: 0;
  margin-left: -2px;
  
  border: 2px solid #000;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 0;
  box-sizing: border-box;
}

.lock-cylinder.step-1 {
  /*transform: translateY(20px);*/
  transform: translate(0px, 20px);
  /* Animate to 20px */
}

.lock-cylinder.step-2 {
  /*transform: translateY(40px);*/
  transform: translate(0px, 40px);
  /* Animate to 40px */
}

.lock-cylinder.step-3 {
  /*transform: translateY(60px);*/
  transform: translate(0px, 60px);
  /* Animate to 60px */
}

.knob-container {
  position: absolute;
  top: 5em;
  left: 0;
  width: 100%;
  text-align: center;
  margin-top: 0px;
  opacity: 0.1;
}

.knob-container.disabled .knob {
  pointer-events: none;
  opacity: 0.05;
  /* Optional: to visually indicate it's disabled */
}

.knob {
  
  width: 130px;
  height: 130px;
  border-radius: 50%;
  margin: auto;
  background: transparent url('../assets/img/safe-box.png') no-repeat center center/cover;
  cursor: grab;
  /*transition: transform 0.1s ease;*/
}

/* #randomize-btn {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
}

#randomize-btn:hover {
  background-color: #0056b3;
} */

.key {
  position: absolute;
  width: 450px;
  /* Adjust to match the width needed */
  height: 150px;
  /*background: linear-gradient(to right, #262525, #d4af37, #c9a25e);*/
  transition: left 0.2s;
  transition-delay: 0.2s;
  /* Transition for sliding animation */
  background: transparent url('../assets/img/Skeleton-Key-Silhouette.svg') no-repeat center center/cover;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.rotating-object {
  /*animation: rotate 0.5s ease-in-out infinite;*/
  animation: rotate 3s linear infinite;
}
</style>