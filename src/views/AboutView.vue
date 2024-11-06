<script setup lang="ts">
import { ref } from 'vue'
import { useArticles } from '@/services/newsService'

const articles = ref()
articles.value = await useArticles().fetchLatestArticles()
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Suspense>
      <template #default>
        <p>
          {{ articles }}
        </p>
      </template>
      <template #fallback>
        <div><h1>Loading...</h1></div>
      </template>
    </Suspense>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
