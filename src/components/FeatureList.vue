<template>
     <div class="flex flex-col items-center justify-center h-screen bg-blue-100">
        <h1>메인 페이지</h1>
        <button @click="toChatFilter">다음 페이지로 이동</button>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const toChatFilter = () => {
    router.replace('/feature/chat-filter');
};
</script>
