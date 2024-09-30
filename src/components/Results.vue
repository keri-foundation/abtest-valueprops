<template>
    <div class="modal fade" ref="resultsFromLocalStorageModal" tabindex="-1" aria-labelledby="resultsModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content resultsmodal">
                <div class="modal-header">
                    <h5 class="modal-title" id="resultsModalLabel">Results</h5>
                </div>
                <div class="modal-body" v-html="resultsFromLocalStorage"></div>
                <!-- <textarea class="modal-body">
                </textarea> -->
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

let modal;
const resultsFromLocalStorageModal = ref(null);
const hideModal = () => {
    modal.hide();
};

const store = useMainStore();
const resultsFromLocalStorage = ref('');

const loadResults = () => {
    const results = store.loadResults();
    resultsFromLocalStorage.value = results === null ? 'No results yet' : results;
    modal = new Modal(resultsFromLocalStorageModal.value);
    setTimeout(() => {
        modal.show();
    }, 1);
};
defineExpose({
    loadResults
});
</script>

<style scoped>
.modal-content.resultsmodal {
    background-color: var(--financial-color);
}

</style>