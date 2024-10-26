<template>
    <div class="modal fade" ref="multipleChoiceModal" tabindex="-1" aria-labelledby="multipleChoiceModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content multiplechoicemodal">
                <div class="modal-header">
                    <h5 class="modal-title" id="multipleChoiceModalLabel">Follow up question</h5>
                </div>
                <div class="modal-body">
                    <p>Chosen Statement: {{ contentOfChosenStatement }}</p>
                    <form class="miniquiz">
                        <fieldset>
                            <legend>{{ correspondingQuestion }}</legend>
                            <template v-for="(item, index) in correspondingAnswers" :key="index">
                                <label>
                                    <input @click.stop="choose" type="radio" name="multipleChoice" :value="item" />
                                    {{ item }}
                                </label>
                            </template>
                        </fieldset>
                    </form>
                </div>
                <div class="modal-footer">
                    <button @click="processChoice" type="button" class="btn btn-secondary">Choose answer</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, watch, computed } from 'vue';
import { Modal } from 'bootstrap';
import { useMainStore } from '../stores/mainStore.js';
import myConfig from '../../myConfig';
import { useSounds } from '@/composables/useSounds';
const { electricSound } = useSounds();

const baseUrl = import.meta.env.BASE_URL;

export default {
    name: 'MultipleChoiceModal',
    setup() {
        let modal;
        const multipleChoiceModal = ref(null);
        const multipleChoiceData = ref([]);
        const randomQuestionObject = ref(null);
        const correspondingQuestion = ref('');
        const correspondingAnswers = ref([]);
        const store = useMainStore();
        const contentOfChosenStatement = computed(() => store.contentOfChosenStatement);
        const resetInputs = () => {
            const inputs = document.querySelectorAll('.miniquiz input[type="radio"]');
            inputs.forEach(input => {
                input.checked = false;
            });
        };

        const processChoice = () => {
            const chosenDomElement = document.querySelector('.correctAnswer');
            const multipleChoiceQuestion = document.querySelector('.miniquiz legend');
            if (chosenDomElement) {
                store.setContentOfChosenMultipleChoiceAnswer(chosenDomElement.textContent);
                store.updateLedger({
                    id: store.nrOfStatementsChosen,
                    multipleChoiceQuestion: multipleChoiceQuestion.textContent,
                    chosenMultipleChoiceAnswer: chosenDomElement.textContent
                });

                modal.hide();

                store.setMultipleChoiceAnswerChosen(true);
                store.incrementNrOfMultipleChoiceAnswersChosen();
                // Reset all labels and remove the correctAnswer class
                document.querySelectorAll('.miniquiz label').forEach((label) => {
                    label.classList.remove('correctAnswer');
                });
                store.setSlideInClassOnStatements(false);
                resetInputs();
            } else {
                alert('Please choose an answer');
            }
        };

        // const showNewStatement = () => {
        //     resetStatementsAndMultipleChoice();
        //     if (refStatements.value && typeof refStatements.value.showNewStatement === 'function') {
        //         const wait = refCylinderLock.value.startFullAnimationDuringRandomLength();
        //         setTimeout(() => {
        //             refStatements.value.showNewStatement();
        //         }, wait);
        //     }
        // };

        const loadMultipleChoiceData = async () => {
            try {
                const response = await fetch(`${baseUrl}${myConfig.multipleChoiceData}`);
                multipleChoiceData.value = await response.json();
            } catch (error) {
                console.error('Failed to load multipleChoice:', error);
            }
        };

        const pickRandomQuestion = () => {
            const randomIndex = Math.floor(Math.random() * multipleChoiceData.value.length);
            randomQuestionObject.value = multipleChoiceData.value.splice(randomIndex, 1)[0];
            correspondingQuestion.value = randomQuestionObject.value.question;
            correspondingAnswers.value = randomQuestionObject.value.choices;
        };

        const choose = (event) => {
            document.querySelectorAll('.miniquiz label').forEach((label) => {
                label.classList.remove('correctAnswer');
            });
            const parent = event.target.parentNode;
            if (parent.classList.contains('correctAnswer')) {
                parent.classList.remove('correctAnswer');
            } else {
                parent.classList.add('correctAnswer');
            }
        };

        onMounted(() => {
            loadMultipleChoiceData();
        });

        watch(
            () => contentOfChosenStatement.value,
            (newVal, oldVal) => {
                modal = new Modal(multipleChoiceModal.value, {
                    backdrop: 'static',
                    keyboard: false
                });
                pickRandomQuestion();
                setTimeout(() => {
                    modal.show();
                    setTimeout(() => {
                        electricSound.play();
                    }, 100);
                }, 300);
            }
        );

        return {
            randomQuestionObject,
            correspondingQuestion,
            correspondingAnswers,
            choose,
            multipleChoiceModal,
            processChoice,
            contentOfChosenStatement
        }
    }
}
</script>

<style lang="scss">
.modal-content.multiplechoicemodal {
    background-color: var(--financial-color);
}

form legend {
    font-size: 1.3em;
}

form label {
    font-size: 1.2em;
    display: inline-block;
    margin-left: 1.6em;
    text-indent: -1.6em;
    line-height: 1.5em;
    display: block;
    position: relative;
}

form input:focus {
    border: 1px solid #222;
}

.display-none {
    display: none !important;
}

form label.correctAnswer {
    font-size: 1.2em;
    background: #82dfb4;
    color: #111;
    box-shadow:
        2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
        6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
        12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
        22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
        41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
        100px 100px 80px rgba(0, 0, 0, 0.07);
}

form p {
    margin-left: 1em;
}
</style>
