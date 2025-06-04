<template>
    <div class="custom-toggle">
        <img :src="modelValue ? toggleOn : toggleOff" class="toggle-icon" />
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import toggleOn from '@/assets/toggle-on.svg';
import toggleOff from '@/assets/toggle-off.svg';

defineProps<{
    modelValue: boolean;
}>();
</script>

<style scoped>
.custom-toggle {
    cursor: pointer;
}

.toggle-icon {
    width: 24px;
    height: 24px;
}
</style>
