<template>
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasLabel">Info</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <InfoBar />
            <button @click="showResults" type="button" class="btn btn-outline-primary d-inline-block btn-sm mb-5">Show results</button>
            <SendResults />
            <SendComments />
            <hr>
            <p>After you click START, you will be shown two statements each time. Choose the statement that fits you best.</p>

            <p>After that, you will get a multiple-choice question. If all <span class="number-of-tasks">{{
                myConfig.nrOfTasksToBeDone }}</span> sets have been answered times, you will be shown the results.
            </p>
            <hr>
        </div>
    </div>
    <button class="btn btn-outline-secondary settings" type="button" data-bs-toggle="offcanvas"
        data-bs-target="#offcanvas" aria-controls="offcanvas">
        <font-awesome-icon :icon="['fas', 'bars']" /> <!-- Hamburger menu icon -->
    </button>
</template>

<script setup>
import InfoBar from './InfoBar.vue';
import SendResults from './SendResults.vue';
import SendComments from './SendComments.vue';
import { Offcanvas } from 'bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import myConfig from '../../myConfig.js';


// Add the specific icon to the library
library.add(faBars);

const emit = defineEmits(['call-show-results']);

const showResults = () => {
    closeOffcanvas();
    emit('call-show-results');
}

const closeOffcanvas = () => {
    const offcanvasElement = document.getElementById('offcanvas');
    if (offcanvasElement) {
        const offcanvasInstance = Offcanvas.getInstance(offcanvasElement);
        if (offcanvasInstance) {
            offcanvasInstance.hide();
        }
    }
};

</script>

<style scoped>
button.settings {
    position: fixed;
    top: 0.1em;
    left: 0.1em;
    background-color: var(--financial-color);
    /*background-color: red;*/
}

.offcanvas {
    background-color: var(--financial-color);
}

.number-of-tasks {
    font-weight: bold;
    font-size: 1.5em;
}
</style>
