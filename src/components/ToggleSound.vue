<template>
    <button @click="toggleSound" class="btn btn-outline-secondary toggleSound">
        <font-awesome-icon v-if="isSoundOn" :icon="['fas', 'volume-up']" />
        <font-awesome-icon v-else :icon="['fas', 'volume-mute']" />
    </button>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { Howler } from 'howler';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
// Add only the specific icons to the library
library.add(faVolumeUp, faVolumeMute);

const isSoundOn = ref(true);

onMounted(() => {
    // Check if localStorage has isSoundOn key, if not set it to true
    if (localStorage.getItem('isSoundOn') === null) {
        localStorage.setItem('isSoundOn', 'true');
    }

    // Initialize isSoundOn from localStorage
    isSoundOn.value = localStorage.getItem('isSoundOn') === 'true';
    Howler.mute(!isSoundOn.value);
});

// Watch for changes in isSoundOn and update localStorage
watch(isSoundOn, (newValue) => {
    localStorage.setItem('isSoundOn', newValue);
    Howler.mute(!newValue);
});

function toggleSound() {
    isSoundOn.value = !isSoundOn.value;
}
</script>

<style scoped>
button.toggleSound {
    background-color: var(--financial-color);
    cursor: pointer;
    /*font-size: 30px;*/
    color: #222;
    position: fixed;
    top: 0.1em;
    right: 0.1em;
}
</style>