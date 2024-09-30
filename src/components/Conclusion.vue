<template>
    <div>
        <div class="modal fade" ref="conclusionModal" tabindex="-1" aria-labelledby="conclusionModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-fullscreen" role="document">
                <div class="modal-content conclusionmodal">
                    <div class="modal-header">
                        <h5 class="modal-title" id="conclusionModalLabel">Your profile</h5>
                    </div>
                    <div class="modal-body">
                        <p v-html="finalText()"></p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="hideModal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Modal } from 'bootstrap';
import { useMainStore } from '../stores/mainStore.js';
import { ref, watch } from 'vue';
import { useEvaluation } from '@/composables/useEvaluation';


let modal;
export default {
    name: 'Conclusion',
    setup() {
        const store = useMainStore();
        const conclusionModal = ref(null);

        const hideModal = () => {
            modal.hide();
        };

        const { evaluation, error } = useEvaluation();

        const finalText = () => {
            if (!evaluation.value || evaluation.value.length < 5) {
                return "Calculating...";
            }

            const totalAvailablePoints = store.nrOfStatementsChosen * 100;
            let typeOfPerson;
            const percentage = (store.score / totalAvailablePoints) * 100;

            if (percentage >= 80) {
                typeOfPerson = evaluation.value[5];
            } else if (percentage >= 60) {
                typeOfPerson = evaluation.value[4];
            } else if (percentage >= 40) {
                typeOfPerson = evaluation.value[3];
            } else if (percentage >= 20) {
                typeOfPerson = evaluation.value[2];
            } else {
                typeOfPerson = evaluation.value[1];
            }

            return typeOfPerson;
        };

        watch(() => store.allMultipleChoiceAnswered, (newValue) => {
            if (newValue) {
                modal = new Modal(conclusionModal.value);
                setTimeout(() => {
                    modal.show();
                }, 1000);
            }
        });

        return {
            conclusionModal,
            hideModal,
            finalText
        };
    }
};
</script>

<style scoped>
.modal-fullscreen {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
}

.modal-content.conclusionmodal {
    background-color: var(--financial-color);
}
</style>
