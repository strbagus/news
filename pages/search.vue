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
    { name: 'og:link', content: fullUrl.value },
    { name: 'og:image', content: '/image.jpg' },
    { name: 'twitter:description', content: `Read the latest ${queryParam.value} news from around the world on News Portal. Get up-to-date news, analysis, and expert opinions.` },
    { name: 'twitter:title', content: `Latest ${queryParam.value} News - StarbNews`},
    { name: 'twitter:link', content: fullUrl.value },
    { name: 'twitter:image', content: '/image.jpg' },

  ]
})
</script>
<template>
  <div class="pt-20 md:pt-28 max-w-[1000px] mx-auto pb-10 min-h-screen">
    <div v-if="errors" class="max-w-[1000px] mb-3 mx-auto text-white flex justify-center">
      <div class="bg-red-500 py-3 px-5 rounded-xl">
        <span>Sorry Error: <b>{{ errors }}</b>. Try Again Later!</span>
      </div>
    </div>
    <div v-if="news">
      <NewsCardThree v-for="n in news" :url="n.url" :title="n.title" :img="n.urlToImage" :source="n.source.name" :dateAt="formatDate(n.publishedAt)" :author="n.author" :desc="limitChar(n.description, 150)" />
      <div v-if="news.length==0" class="text-center italic">No related article found.</div>
    </div>

    <div v-else class="border-b-2 border-blue-800  flex items-center hover:border-rose-800 flex-wrap py-5">
      <div class="w-1/3 px-2">
        <div class="loader-img w-full relative bg-gray-500" style="aspect-ratio: 3/2"></div>
      </div>
      <div class="w-2/3 px-2 text-xl md:text-2xl flex items-end">
        <div v-if="errors" class="font-medium">Load Failed!</div>
        <template v-else>
          <div class="font-medium">Loading</div>
          <div class="loader-dots">...</div>
        </template>
      </div>
    </div>

  </div>
</template>
<style>
.loader-img {
  animation: loader 3s linear infinite;
}
@keyframes loader {
  0% { background-color: #eee; }
  50% { background-color: #bbb; }
  100% { background-color: #eee; }
}
.loader-dots {
  display: inline-block;
  width: 0;
  overflow: hidden;
  animation: dots 2s steps(4, end) infinite;
}
@keyframes dots {
  to{
  width: 1em;
  }
}
</style>
