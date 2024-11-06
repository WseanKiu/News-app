<template>
  <nav class="bg-white shadow p-4 rounded mb-4">
    <ul class="flex space-x-4 justify-center">
      <li
        v-for="category in categories"
        :key="category"
        :class="{
          'text-blue-600 font-semibold': selectedCategory === category,
        }"
        @click="onCategorySelect(category)"
        class="cursor-pointer capitalize hover:text-blue-400 transition"
      >
        {{ category }}
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

// Define props
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  categories: string[]
  selectedCategory: string
}>()

// Emit event to notify parent of category change
const emit = defineEmits<{
  (e: 'categorySelected', category: string): void
}>()

// Method to emit selected category to parent component
const onCategorySelect = (category: string) => {
  emit('categorySelected', category)
}
</script>

<style scoped></style>
