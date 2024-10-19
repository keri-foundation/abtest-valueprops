<template>
    <div href="#" class="statement" id="leftStatement" :class="statementClassLeft">

        <div class="notary-document">
            <h2 class="notary-header">Statement A</h2>
            <div class="notary-body">
                <p class="statement-text">{{ leftStatement }}</p>
                <br><br>
                <div class="text-center"><a href="#" @click="chooseLeftStatement"
                        class="btn btn-outline-secondary d-inline-block mb-2">Choose this statement</a></div>
                <!-- <strong>Choose this statement</strong><br>
                if you agree with this the most -->
            </div>
            <!-- <div class="notary-footer">Issued on {{ currentDate }}</div> -->
        </div>
    </div>

    <div href="#" class="statement" id="rightStatement" :class="statementClassRight">
        <div class="notary-document">
            <h2 class="notary-header">Statement B</h2>
            <div class="notary-body">
                <p class="statement-text">{{ rightStatement }}</p>
                <br><br>
                <div class="text-center"><a href="#" @click="chooseRightStatement"
                        class="btn btn-outline-secondary d-inline-block mb-2">Choose this statement</a></div>
                <!-- <strong>Choose this statement</strong><br>
                if you agree with this the most -->
            </div>
            <!-- <div class="notary-footer">Issued on {{ currentDate }}</div> -->
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';

import { useMainStore } from '../stores/mainStore.js';
import myConfig from '../../myConfig';
const baseUrl = import.meta.env.BASE_URL;

import { useSounds } from '@/composables/useSounds';
const { wooshSound } = useSounds();

import { useEvaluation } from '@/composables/useEvaluation';
const { evaluation, error } = useEvaluation();
const statements = ref([]);
const leftStatement = ref(null);
const leftStatementScore = ref(null);
const rightStatement = ref(null);
const rightStatementScore = ref(null);
const store = useMainStore();
const currentDate = new Date().toLocaleDateString();

let statementChosen = computed(() => store.statementChosen);
const hasSlideInClassOnStatements = computed(() => store.hasSlideInClassOnStatements);
const hasInactiveClassOnStatements = computed(() => store.hasInactiveClassOnStatements);

const loadStatements = async () => {
    try {
        const response = await fetch(`${baseUrl}${myConfig.statementsData}`);
        statements.value = await response.json();
    } catch (error) {
        console.error('Failed to load statements:', error);
    }
};

const showNewStatement = () => {
    store.resetStatementsAndMultipleChoice();
    createRandomStatementPair();
    setTimeout(() => {
        store.setSlideInClassOnStatements(true);
        store.setInactiveClassOnStatements(false);
    }, 0);
};

const createRandomStatementPair = () => {
    const randomIndex = Math.floor(Math.random() * statements.value.length);
    const statementPair = statements.value.splice(randomIndex, 1)[0];

    const firstIndex = Math.floor(Math.random() * statementPair.statements.length);
    let secondIndex;
    do {
        secondIndex = Math.floor(Math.random() * statementPair.statements.length);
    } while (secondIndex === firstIndex);

    leftStatement.value = statementPair.statements[firstIndex].statement;
    leftStatementScore.value = statementPair.statements[firstIndex].score;

    rightStatement.value = statementPair.statements[secondIndex].statement;
    rightStatementScore.value = statementPair.statements[secondIndex].score;
};

const chooseStatement = (event) => {
    if (!statementChosen.value) {
        store.incrementNrOfStatementsChosen();
        store.setStatementChosen(true);
        store.setInactiveClassOnStatements(true);
    }
};

const chooseLeftStatement = () => {
    store.setContentOfChosenStatement(leftStatement.value);
    store.addToResults('<hr>Chosen statement: ' + leftStatement.value + '<br>');
    store.incrementScore(leftStatementScore.value);
    chooseStatement();
};

const chooseRightStatement = () => {
    store.setContentOfChosenStatement(rightStatement.value);
    store.addToResults('Chosen statement: ' + rightStatement.value + '<br>');
    store.incrementScore(rightStatementScore.value);
    chooseStatement();
}

const statementClassLeft = computed(() => ({
    'slide-in-left': hasSlideInClassOnStatements.value,
    'inactive': hasInactiveClassOnStatements.value,
}));
const statementClassRight = computed(() => ({
    'slide-in-right': hasSlideInClassOnStatements.value,
    'inactive': hasInactiveClassOnStatements.value,
}));

watch(hasSlideInClassOnStatements, (newVal) => {
    if (newVal) {
        setTimeout(() => {
            wooshSound.play();
        }, 1000);// value must be the same as the animation duration in CSS
        setTimeout(() => {
            wooshSound.play();
        }, 1200);// value must be the same as the animation duration in CSS
    }
});

onMounted(async () => {
    await loadStatements();
});

defineExpose({
    showNewStatement
});
</script>

<style scoped>
.statement {
    position: fixed;
    top: 3em;
    width: calc(50%);
    max-width: 400px;
    height: calc(100% - 6em);
    padding: 0;
    margin: 0;
    font-size: 1em;
}

a {
    text-decoration: none;
    color: black;
}

.statement .notary-document {
    background: var(--financial-color);
    color: #222;
    max-height: 100%;
}

.statement.inactive .notary-document {
    background-color: rgb(227, 232, 234);
    cursor: not-allowed;
    color: #ccc;
}

#leftStatement {
    left: calc(-50% - 4em);
    /* Start off-screen to the left */
}

#rightStatement {
    right: calc(-50% - 4em);
    /* Start off-screen to the right */
}

.slide-in-left {
    animation: slideInLeft 0.1s forwards;
    animation-delay: 1s;
}

.slide-in-right {
    animation: slideInRight 0.1s forwards;
    animation-delay: 1.2s;
}

@keyframes slideInLeft {
    to {
        left: 0em;
    }
}

@keyframes slideInRight {
    to {
        right: 0em;
    }
}


.notary-document {
    padding: 3%;
    overflow: scroll;
    border-radius: 5px;
    background: #fdfdfe;
    font-family: "Georgia", serif;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    position: relative;

    font-size: 0.7em;
    margin: 0.2em;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
    .notary-document {
        font-size: 1em;
        margin: 1em;
    }
}

.notary-header {
    text-align: center;
    font-size: 1.5em;
    margin-bottom: 20px;
    letter-spacing: 0.05em;
}

.notary-body {
    line-height: 1.6;
    font-size: 1.1em;
    color: #333;
}

.statement-text {
    font-variant: small-caps;
    font-size: 1.5em;
    background: var(--accent-color);
    padding: 0.5em;
}

.notary-footer {
    margin-top: 40px;
    text-align: center;
    font-size: 0.9em;
    font-style: italic;
    color: #555;
}
</style>