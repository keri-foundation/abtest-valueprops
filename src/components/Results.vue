<template>
    <div class="modal fade" ref="resultsFromLocalStorageModal" tabindex="-1" aria-labelledby="resultsModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content resultsmodal">
                <div class="modal-header">
                    <h5 class="modal-title" id="resultsModalLabel">Results</h5>
                </div>
                <div class="modal-body">
                    <div v-for="(item, index) in store.ledger" :key="index">
                        <h2>Set {{ item.id }}</h2>
                        <h3>Chosen statement</h3>
                        <p>{{ item.statement}}</p>
                        <h3>Chosen multiple choice answer</h3>
                        <p>{{ item.chosenMultipleChoiceAnswer }}</p>
                        <h3>Comment</h3>
                        <textarea :disabled="!isEditing[item.id]" class="form-control"
                            v-model="comments[item.id]"></textarea>
                        <button :disabled="!isEditing[item.id]" class="btn btn-outline-primary btn-sm mt-2"
                            @click="saveComments(item.id)">Save</button>
                        <button :disabled="isEditing[item.id]" class="btn btn-outline-primary btn-sm mt-2 ms-2" @click="enableEdit(item.id)">Edit</button>
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
import { ref, reactive, watch } from 'vue';
import { Modal } from 'bootstrap';
import { useMainStore } from '../stores/mainStore.js';

let modal;
const resultsFromLocalStorageModal = ref(null);
const hideModal = () => {
    modal.hide();
};

const store = useMainStore();

// Create a reactive object to store comments for each item
const comments = reactive({});
const isEditing = reactive({});

// Initialize comments and edit state with existing values from the store
store.ledger.forEach(item => {
    comments[item.id] = item.comments;
    isEditing[item.id] = false; // Initially, all textareas are not in edit mode
});

// Watch the getter `ledgerArray` for changes
watch(() => store.ledgerArray, (newValue, oldValue) => {
    newValue.forEach(item => {
        comments[item.id] = item.comments;
    });
}, { deep: true });

const showResults = () => {
    modal = new Modal(resultsFromLocalStorageModal.value);
    setTimeout(() => {
        modal.show();
    }, 1);
};

const saveComments = (id) => {
    store.updateLedger({ id, comments: comments[id] });
    disableEdit(id);
};

const enableEdit = (id) => {
    isEditing[id] = true;
};

const disableEdit = (id) => {
    isEditing[id] = false;
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