<template>
    <label v-if="!isCaptchaCorrect" class="form-group">
        What is {{ num1 }} + {{ num2 }}?
        <input type="number" v-model.number="userAnswer" class="w-25 d-inline form-control" placeholder="Your Answer"
            required @focus="clearPlaceholder" />
        <button @click="checkCaptcha" class="btn btn-outline-secondary">Submit Answer</button>
    </label>
    <!-- <p v-else>Captcha correct! Form can now be submitted.</p> -->
</template>

<script setup>
import { ref, defineEmits } from 'vue';

// Define emit for parent communication
const emit = defineEmits(['captcha-validated']);

// Random numbers for CAPTCHA
const num1 = ref(Math.floor(Math.random() * 10));
const num2 = ref(Math.floor(Math.random() * 10));

// User's answer and validation state
const userAnswer = ref(null);
const isCaptchaCorrect = ref(false);

const clearPlaceholder = (event) => {
    event.target.placeholder = '';
}

// Function to validate the CAPTCHA
const checkCaptcha = () => {
  const correctAnswer = num1.value + num2.value;
  if (userAnswer.value === correctAnswer) {
    isCaptchaCorrect.value = true;
    emit('captcha-validated', true); // Emit event to notify parent
    // alert("Captcha is correct!");
  } else {
    alert("Incorrect answer. Please try again.");
  }
};
</script>

<style scoped>
label, p {
  font-size: 16px;
  margin-bottom: 10px;
}
input {
  margin-left: 10px;
  width: 50px;
}
button {
  margin-left: 10px;
}
</style>
