<template>
    <p>If you have comments, please post them here.</p>
    <div class="form-group">
        <textarea class="form-control" v-model="comments" placeholder="Enter your comments here"
            maxlength="1000"></textarea>
    </div>
    <button class="btn btn-outline-primary btn-sm mt-2" @click="submitComment">Submit</button>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useMainStore } from '@/stores/mainStore';

const store = useMainStore();
const comments = ref('');
const allMultipleChoiceAnswered = computed(() => store.allMultipleChoiceAnswered);

const submitComment = () => {
    console.log('Comment submitted');
    store.addToResultsInLocalStorage("Comments: " + comments.value);
    comments.value = ''; // Clear the textarea after submission
}
</script>