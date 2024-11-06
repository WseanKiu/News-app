<template>
  <div class="news-article">
    <img
      v-if="article.urlToImage"
      :src="article.urlToImage"
      :alt="article.title"
      class="article-image"
    />
    <h2>{{ article.title }}</h2>
    <p>{{ article.description }}</p>
    <a :href="article.url" target="_blank" rel="noopener">Read more</a>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

// Define the expected structure for the article prop
interface Article {
  source: { id: string | null; name: string }
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  content: string
}

// Define props to receive the article data
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{ article: Article }>()
</script>

<style scoped>
.news-article {
  border-bottom: 1px solid #ddd;
  padding: 1em 0;
}

.article-image {
  width: 100%;
  height: auto;
  margin-bottom: 0.5em;
}

h2 {
  font-size: 1.2em;
  margin: 0.5em 0;
}

p {
  color: #555;
}

a {
  color: #1e90ff;
  text-decoration: none;
}
</style>
