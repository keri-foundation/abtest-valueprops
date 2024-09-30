<template>
    <div class="container-fluid opening-screen" v-if="isVisible" :class="{ 'fade-out': startFadeOut }">
        <div class="container-inside">
            <h1 class="mb-5 text-center">Autonomous Identity Test</h1>
            <button @click="start" class="btn btn-outline-secondary d-block mx-auto btn-lg">START</button>

            <div class="container my-5">
                <div class="row">
                    <!-- Column 1 -->
                    <div class="col-md-4">
                        <img src="@/assets/img/ssi-1.jpg" class="img-fluid" alt="Self Sovereign Identity Image 1">
                        <h3>Self-Sovereign Identity</h3>
                        <p>In today’s digital world, Self-Sovereign Identity (SSI) and autonomous identity offer new ways to manage identity securely and efficiently. For senior managers and CEOs, understanding these technologies is key to enhancing security, reducing fraud, and improving customer trust.</p>
                    </div>

                    <!-- Column 2 -->
                    <div class="col-md-4">
                        <img src="@/assets/img/ssi-3.jpg" class="img-fluid" alt="Self Sovereign Identity Image 3">
                        <h3>Autonomous Identity</h3>
                        <p>Stay ahead with these game-changing innovations.</p>
                    </div>

                    <!-- Column 3 -->
                    <div class="col-md-4">
                        <img src="@/assets/img/ssi-2.jpg" class="img-fluid" alt="Self Sovereign Identity Image 2">
                        <h3>Decentralized Identity</h3>
                        <p>This brief test will evaluate your knowledge of SSI and its potential to streamline operations and future-proof your organization’s identity management strategies.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useMainStore } from '../stores/mainStore.js'
import { ref } from 'vue';

import { useSounds } from '@/composables/useSounds';
const { clickSound } = useSounds();

const store = useMainStore();
const isVisible = ref(true);
const startFadeOut = ref(false);

function start() {
    setTimeout(() => {
        setTimeout(() => {
            startFadeOut.value = true;
            setTimeout(() => {
                isVisible.value = false;
            }, 1000);
        }, 300);
        store.setShouldNewStatementShow(true);
    }, 1);
}
</script>

<style scoped>
.opening-screen {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: var(--background-color);
    transition: opacity 1s ease;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;   
}
.container-inside {
    max-width: var(--container-max-width) !important;
    margin: 0 auto;
    padding: 5em;
    text-align: left;
    background-color: var(--container-background-color);
    overflow: scroll;
    position: relative;
}

.fade-out {
    opacity: 0;
}
</style>