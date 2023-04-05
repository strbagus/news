<script setup>
import { ref, watchEffect, onMounted } from 'vue'
import axios from 'axios'
const route = useRoute()


const queryParam = ref('')
const config = useRuntimeConfig()
const errors = ref(null)
const news = ref(null)
const fullUrl = ref('')
const getNews = async () => {
  news.value = await axios.get(config.url+'everything', {
    params: {
      q: queryParam.value,
      excludeDomains: "google.com,gizmodo.com,openmymind.net,kovidgoyal.net",
      language: "en",
      pageSize: 10,
      apiKey: config.key,
    }
  })
  .then((response) => response.data.articles)
  .catch(function (error) {
    errors.value = error.response.data.code
  })
}
watchEffect(() => {
  queryParam.value = route.query.q
  getNews()
})
onMounted(() => {
  getNews()
  fullUrl.value = `${window.location.origin}${route.fullPath}`
})
const formatDate = (isoDateString) => {
  const date = new Date(isoDateString)
  const options = {year: 'numeric', month: 'long', day: 'numeric'}
  const formattedDateString = date.toLocaleDateString('en-EN', options)
  return formattedDateString
}
const limitChar = (text, limit) => {
  if (text.length > limit) {
    return text.substring(0, limit) + '...'
  } else {
    return text
  }
}
useHead({
  title: `Latest ${queryParam.value} News - StarbNews`,
  meta: [
    { name: 'description', content: `Read the latest ${queryParam.value} news from around the world on News Portal. Get up-to-date news, analysis, and expert opinions.` },
    { name: 'og:description', content: `Read the latest ${queryParam.value} news from around the world on News Portal. Get up-to-date news, analysis, and expert opinions.` },
    { name: 'og:title', content: `Latest ${queryParam.value} News - StarbNews`},
    { name: 'og:link', content: `${fullUrl.value}` },
    { name: 'og:image', content: '/image.jpg' },
    { name: 'twitter:description', content: `Read the latest ${queryParam.value} news from around the world on News Portal. Get up-to-date news, analysis, and expert opinions.` },
    { name: 'twitter:title', content: `Latest ${queryParam.value} News - StarbNews`},
    { name: 'twitter:link', content: `${fullUrl._value}` },
    { name: 'twitter:image', content: '/image.jpg' },

  ]
})
</script>
<template>
  <div class="pt-20 md:pt-28 max-w-[1000px] mx-auto pb-10 min-h-screen">
    <h1 class="text-4xl font-medium capitalize px-2">{{ queryParam }}</h1>
    <div v-if="news">
      <NewsCardThree v-for="n in news" :url="n.url" :title="n.title" :img="n.urlToImage" :source="n.source.name" :dateAt="formatDate(n.publishedAt)" :author="n.author" :desc="limitChar(n.description, 150)" />
    </div>
    <NewsCardThree v-else url="#" title="Unavailable" img="" source="unavailable" dateAt="unavailable" author="unavailable" desc="unavailable" />

  </div>
</template>