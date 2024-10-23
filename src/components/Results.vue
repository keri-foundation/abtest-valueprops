<template>
    <div class="modal fade" ref="resultsFromLocalStorageModal" tabindex="-1" aria-labelledby="resultsModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content resultsmodal">
                <div class="modal-header">
                    <h5 class="modal-title" id="resultsModalLabel">Results</h5>
                </div>
                <!-- Loop through store.ledger -->
                <div class="modal-body
                ">
                    <div v-for="(item, index) in store.ledger" :key="index">
                        <h2>Set {{ item.id }}</h2>
                        <h3>Chosen statement</h3>
                        <p>{{ item.statement}}</p>
                        <h3>Chosen multiple choice answer</h3>
                        <p>{{ item.chosenMultipleChoiceAnswer }}</p>
                        <h3>Comment</h3>
                        <p>{{ item.comments }}</p>
                        <hr>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="hideModal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Modal } from 'bootstrap';
import { useMainStore } from '../stores/mainStore.js';
import { useResults } from '../composables/useResults';

let modal;
const resultsFromLocalStorageModal = ref(null);
const hideModal = () => {
    modal.hide();
};

const store = useMainStore();
// const { resultsFromLocalStorage, loadResults } = useResults();



const showResults = () => {
    modal = new Modal(resultsFromLocalStorageModal.value);
    setTimeout(() => {
        modal.show();
    }, 1);

};

defineExpose({
    showResults
});
</script>

<style scoped>
.modal-content.resultsmodal {
    background-color: var(--financial-color);
}

</style>