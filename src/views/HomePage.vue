<template>
  <div>
    <!-- Navigation Header -->
    <NavHeader
      :categories="categories"
      :selectedCategory="selectedCategory"
      @categorySelected="setCategory"
    />

    <h1 class="text-2xl font-bold text-center mb-6">
      {{
        selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)
      }}
      News
    </h1>

    <!-- News Content -->
    <div v-if="loading" class="text-center text-gray-500">Loading...</div>
    <div v-if="error" class="text-center text-red-500">{{ error }}</div>
    <div v-else class="space-y-6">
      <NewsArticle
        v-for="article in articles"
        :key="article.url"
        :article="article"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import NewsArticle from '@/components/NewsArticle.vue'
import NavHeader from '@/components/NavHeader.vue' // Import NavHeader

// Define available categories
const categories = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology',
]
const selectedCategory = ref('general') // Default category

// Data for articles, loading state, and error message
const articles = ref<
  | [
      {
        source: { id: string | null; name: string }
        author: string
        title: string
        description: string
        url: string
        urlToImage: string
        publishedAt: string
        content: string
      },
    ]
  | []
>([])
const loading = ref(true)
const error = ref<string | null>(null)

// Fetch news function with category as a parameter
const fetchNews = async (category: string) => {
  loading.value = true
  error.value = null

  try {
    const apiKey = 'b7df00a01b2f4be3bc8a000f7c77c113'
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`,
    )
    // `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${apiKey}`,
    // )

    if (!response.ok) throw new Error('Failed to fetch news data')

    const data = await response.json()
    articles.value = data.articles
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    error.value = err.message
    console.error(err)
  } finally {
    loading.value = false
  }
}

// Function to change category and fetch news
const setCategory = (category: string) => {
  selectedCategory.value = category
}

// Watch for changes to the selected category
watch(selectedCategory, newCategory => {
  fetchNews(newCategory)
})

// Initial fetch for the default category
onMounted(() => {
  fetchNews(selectedCategory.value)
})
</script>

<style scoped></style>

<!-- <template>
  <div>
    <h1>Latest News</h1>
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
    <div v-else>
      <div v-for="article in articles" :key="article.url" class="news-article">
        <h2>{{ article.title }}</h2>
        <p>{{ article.description }}</p>
        <a :href="article.url" target="_blank">Read more</a>
      </div>
    </div>
  </div>
</template> -->
<!--
<script lang="ts">
import { ref, onMounted } from 'vue'

export default {
  name: 'HomePage',
  setup() {
    const articles = ref([])
    const loading = ref(true)
    const error = ref(null)

    const fetchNews = async () => {
      try {
        // `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey${apiKey}`,
        const apiKey = 'b7df00a01b2f4be3bc8a000f7c77c113'
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${apiKey}`,
          // `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`,
        )

        if (!response.ok) {
          throw new Error('Failed to fetch news data')
        }

        const data = await response.json()
        articles.value = data.articles
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        error.value = err.message
        console.error(err)
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      fetchNews()
    })

    return {
      articles,
      loading,
      error,
    }
  },
}
</script>

<style scoped>
.news-article {
  margin-bottom: 1.5em;
}
</style> -->
