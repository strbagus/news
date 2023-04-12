<script setup>
import { ref, onMounted, reactive } from 'vue'
import axios from 'axios'
const route = useRoute()
const fullUrl = ref('')
const config = useRuntimeConfig()
const errors = reactive({
  news: null,
  tops: null,
})
const news = ref(null)
const tops = ref(null)
const excludeDomains = "openmymind.net,google.com,gizmodo.com,kovidgoyal.net"

const formatDate = (isoDateString) => {
  const date = new Date(isoDateString)
  
  const options = {year: 'numeric', month: 'long', day: 'numeric'}
  const formattedDateString = date.toLocaleDateString('en-EN', options)
  return formattedDateString
}
onMounted(async() => {
  fullUrl.value = `${window.location.origin}${route.fullPath}`
  news.value = await axios.get(config.url+"everything", {
    params: {
      q: "international",
      excludeDomains: excludeDomains,
      language: "en",
      pageSize: 12,
      apiKey: config.key,
    }
  })
  .then((response) => response.data.articles)
  .catch(function (error) {
    errors.news = error.response.data.code;
  })
  tops.value = await axios.get(config.url+"top-headlines", {
    params: {
      excludeDomains: excludeDomains,
      language: "en",
      pageSize: 5,
      apiKey: config.key,
    }
  })
  .then((response) => response.data.articles)
  .catch(function (error) {
    errors.tops = error.response.data.code
  })
})
useHead({
  title: 'StarbNews - Latest news from around the World',
  meta: [
    { name: 'description', content: 'Get the latest news from around the world on News Portal. Stay informed with breaking news, top stories, and in-depth coverage of politics, fashion, technology, sports, and more' },
    { name: 'og:title', content: 'StarbNews - Latest news from around the World' },
    { name: 'og:description', content: 'Get the latest news from around the world on News Portal. Stay informed with breaking news, top stories, and in-depth coverage of politics, fashion, technology, sports, and more' },
    { name: 'og:image', content: '/image.jpg' },
    { name: 'og:link', content: fullUrl.value },
    { name: 'twitter:title', content: 'StarbNews - Latest news from around the World' },
    { name: 'twitter:description', content: 'Get the latest news from around the world on News Portal. Stay informed with breaking news, top stories, and in-depth coverage of politics, fashion, technology, sports, and more' },
    { name: 'twitter:image', content: '/image.jpg' },
    { name: 'twitter:link', content: fullUrl.value },
  ]
})
</script>
<template>
  <div class="max-w-[1000px] mx-auto pt-20 md:pt-28 pb-5 md:pb-10">
    <div v-if="errors.news!==null || errors.tops!==null" class="max-w-[1000px] mb-3 mx-auto text-white flex justify-center">
      <div class="bg-red-500 py-3 px-5 rounded-xl">
        <span>
          Sorry Error:
          <b>{{ errors.news && errors.tops ? 'N-'+errors.news+', T-'+errors.tops : errors.news ? 'N-'+errors.news : 'T-'+errors.tops }}</b>. 
          Try Again Later!
        </span>
      </div>
    </div>
    <header>
      <div class="flex flex-wrap items-center">
        <div class="w-full md:w-2/3 px-1">
          <a v-if="news" :href="news[6].url" target="blank">
            <div class="w-full relative" style="aspect-ratio: 16/9">
              <img :src="news[6].urlToImage" :alt="news[6].title" class="w-full h-full absolute top-0 left-0 object-cover bg-gray-200" draggable="false">
              <div class="absolute w-full bottom-0 h-2/5 bg-gradient-to-t from-blue-900 to-transparent">
                <div class="relative w-3/5 pl-5 md:pl-10 font-medium text-white h-full flex items-center">
                  <h2 class="text-xl md:text-2xl">{{ news[6].title }}</h2>
                </div>
                <div class="absolute bottom-3 right-5 text-white font-medium italic">
                  <h3 class="text-xs md:text-sm">{{ news[6].source.name }}</h3>
                </div>
              </div>
            </div>
          </a>
          <div v-else class="w-full relative loader-img" style="aspect-ratio: 16/9">
            <div class="absolute w-full bottom-0 h-2/5 bg-gradient-to-t from-blue-900 to-transparent">
              <div class="relative w-3/5 pl-5 md:pl-10 font-medium text-white h-full flex items-center">
                <h2 class="text-xl md:text-2xl">
                  <span v-if="errors.news">Load Failed!</span>
                  <div v-else class="flex items-end">
                    <span>Loading</span><span class="dots">...</span>
                  </div>
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 flex flex-wrap justify-center">
          <template v-if="news">
            <NewsCardHead :url="news[5].url" :img="news[5].urlToImage" :source="news[5].source.name" :title="news[5].title"  />
            <NewsCardHead :url="news[4].url" :img="news[4].urlToImage" :source="news[4].source.name" :title="news[4].title"  />
          </template>
          <template v-else>
            <div v-for="index in 2" class="w-1/2 md:w-full p-1" :key="index">
                <div class="w-full relative loader-img" style="aspect-ratio: 16/9">
                  <div class="absolute w-full bottom-0 h-2/3 bg-gradient-to-t from-blue-900 to-transparent flex">
                    <div class="relative md:w-4/5 px-5 pb-2 font-medium text-white flex flex-col justify-end text-end">
                      <div class="text-xs md:text-base leading-5">
                        <span v-if="errors.news" class="flex">Load Failed!</span>
                        <div v-else class="flex items-end">
                          <span>Loading</span><span class="dots">...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </template>
        </div>
      </div>
    </header>
    <div class="mt-3">
      <div v-if="news" class="flex flex-wrap items-stretch">
        <NewsCardOne v-for="n in news.slice(0,4)" :url="n.url" :img="n.urlToImage" :source="n.source.name" :title="n.title" :dateAt="formatDate(n.publishedAt)" />
      </div>
      <div v-else class="w-1/2 md:w-1/4 px-1 my-1">
          <div class="bg-gray-50 shadow rounded shadow-gray-500 h-full overflow-hidden hover:shadow-gray-800">
            <div class="w-full relative border-b border-gray-500 loader-img" style="aspect-ratio: 16/9"></div>
            <div class=" px-5 py-3">
              <div class="border-l-4 border-rose-800 px-2 text-sm font-medium">Unavailable</div>
              <div class="flex items-end mt-1">
                <span v-if="errors.news">Load Failed!</span>
                <div v-else class="flex items-end">
                  <span>Loading</span><span class="dots">...</span>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
  <div class="h-32 md:h-72 bg-rose-800">
    <div class="max-w-[1000px] mx-auto h-full">
        <div class="text-white flex items-center h-full px-5 md:px-0">
          <h1 class="text-3xl md:text-5xl font-medium">Read More <br>Know More</h1>
        </div>
    </div>
  </div>
  <div class="max-w-[1000px] mx-auto py-10">
    <div class="flex flex-wrap">
      <div class="w-full md:w-2/3 ">
        <template v-if="news">
          <NewsCardTwo v-for="n in news.slice(7.12)" :url="n.url" :title="n.title" :img="n.urlToImage" :source="n.source.name" :dateAt="formatDate(n.publishedAt)" :author="n.author" />
        </template>
        <div v-else class="border-b-2 border-blue-800  flex items-center hover:border-rose-800 py-3">
          <div class="w-1/3 px-2">
            <div class="w-full relative loader-img" style="aspect-ratio: 3/2"></div>
          </div>
          <div class="w-2/3 px-2">
            <div class="border-l-4 text-sm md:text-base border-rose-800 pl-2">unavailable</div>
            <div class="text-base md:text-xl leading-6 my-1 md:my-3 font-medium">
              <span v-if="errors.news">Load Failed!</span>
              <div v-else class="flex items-end">
                <span>Loading</span><span class="dots">...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/3 px-2">
        <aside class="border shadow shadow-gray-400 rounded bg-gray-50 mt-10 md:mt-0 py-4">
          <h1 class="border-l-4 border-rose-700 text-2xl font-medium px-3">Top News</h1>
          <ul class="px-4 leading-5">
            <template v-if="tops">
              <li v-for="(top, index) in tops" class="my-5 flex items-center" :key="index">
                <div class="text-xl font-bold text-blue-700 pr-3">{{ index+1 }}</div>
                <a :href="top.url" target="blank">{{ top.title }} - <span class="font-light italic">{{ top.source.name }}</span></a>
              </li>
            </template>
            <li v-else class="my-5 flex items-center">
              <div class="text-xl font-bold text-blue-700 pr-3">N</div>
              <span v-if="errors.tops">Unavailable</span>
              <div v-else class="flex items-end">
                <span>Loading</span><span class="dots">...</span>
              </div>

            </li>
          </ul>
        </aside>
      </div>
    </div>
  </div>
  <div class="h-32 md:h-72 bg-rose-800">
    <div class="max-w-[1000px] mx-auto h-full">
        <div class="text-white flex items-center h-full px-5 md:px-0">
          <h1 class="text-3xl md:text-5xl font-medium">Thank You <br>for Visiting</h1>
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
.dots {
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
