<template>
    <div>
        <h1>두 번째 페이지</h1>
        <button @click="toFeatureList">이전 페이지로 이동</button>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const toFeatureList = () => {
    router.replace('/');
};
</script>
