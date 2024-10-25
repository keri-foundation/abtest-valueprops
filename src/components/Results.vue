<template>
    <transition name="bounce">
        <div v-if="store.allMultipleChoiceAnswered">
            <div class="fs-5 alert alert-info" role="alert">
                <strong>These are your answers. Please review your comments and then send them to us.</strong>
            </div>

            <div class="card mb-4" v-for="(item, index) in store.ledger" :key="index">
                <div class="card-body">
                    <h2>Set {{ item.id }}</h2>
                    <h3>Chosen statement</h3>
                    <p>{{ item.statement }}</p>
                    <h3>Multiple choice question</h3>
                    <p>{{item.multipleChoiceQuestion}}</p>
                    <h3>Chosen multiple choice answer</h3>
                    <p>{{ item.chosenMultipleChoiceAnswer }}</p>
                    <h3>Comment</h3>
                    <textarea :disabled="!isEditing[item.id]" class="form-control"
                        v-model="comments[item.id]"></textarea>
                    <button :disabled="!isEditing[item.id]" class="btn btn-outline-primary btn-sm mt-2"
                        @click="saveComments(item.id)">Save</button>
                    <button :disabled="isEditing[item.id]" class="btn btn-outline-primary btn-sm mt-2 ms-2"
                        @click="enableEdit(item.id)">Edit</button>
                </div>
            </div>
        </div>
    </transition>
</template>
<script setup>
import { ref, reactive, watch } from 'vue';
import { useMainStore } from '../stores/mainStore.js';

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

// const showResults = () => {
//     modal = new Modal(resultsFromLocalStorageModal.value);
//     setTimeout(() => {
//         modal.show();
//     }, 1);
// };

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
    // showResults
});
</script>

<style scoped>
.modal-content.resultsmodal {
    background-color: var(--financial-color);
}

</style>

<style>

.card {
    background-color: var(--background-color) !important;
}

.bounce-enter-active {
    animation: bounceIn 0.5s ease;
}

.bounce-leave-active {
    animation: bounceOut 0.5s ease;
}

@keyframes bounceIn {
    0% {
        transform: scale(0.3);
    }

    50% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
    }
}

@keyframes bounceOut {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(0.3);
    }
}
</style>