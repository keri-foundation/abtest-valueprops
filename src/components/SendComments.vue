<template>
    <div class="modal fade" ref="commentsModal" tabindex="-1" aria-labelledby="commentsModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content commentsModal">
                <div class="modal-header">
                    <h5 class="modal-title" id="commentsModalLabel">If you have comments about these statements and question, please post them here.</h5>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <textarea class="form-control" v-model="comments" placeholder="Enter your comments here"
                            maxlength="1000"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline-primary btn-sm mt-2" @click="skipComment">Skip</button>
                    <button class="btn btn-outline-primary btn-sm mt-2" @click="submitComment">Submit</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { Modal } from 'bootstrap';
import { useMainStore } from '@/stores/mainStore';
const commentsModal = ref(null);
let modalComments;
const store = useMainStore();
const contentOfChosenMultipleChoiceAnswer = computed(() => store.contentOfChosenMultipleChoiceAnswer);
const comments = ref('');
import { useSounds } from '@/composables/useSounds';
const { electricSound } = useSounds();

// Hacky solution to remove existing backdrops
const removeExistingBackdrops = () => {
    const backdrops = document.querySelectorAll('.modal-backdrop');
    backdrops.forEach(backdrop => backdrop.remove());
};

const submitComment = () => {
    handleComment(comments.value);
}

const skipComment = () => {
    handleComment('No comment');
}

const handleComment = (comm) => {
    store.updateLedger({ id: store.nrOfStatementsChosen, comments: comm });
    comments.value = ''; // Clear the textarea after submission
    modalComments.hide();
    store.setShouldNewStatementShow(true);
}

watch(
    () => contentOfChosenMultipleChoiceAnswer.value,
    (newVal, oldVal) => {
        modalComments = new Modal(commentsModal.value, {
            backdrop: 'static',
            keyboard: false
        });
        setTimeout(() => {
            removeExistingBackdrops();
            modalComments.show();
            setTimeout(() => {
                electricSound.play();
            }, 100);
        }, 30);
    }
);
</script>
<style scoped>
/*.modal-content.commentsModal {
    border-radius: 0.5rem;
    padding: 1rem;
}
*/
.modal-content.commentsModal {
    background-color: var(--financial-color);
}
</style>