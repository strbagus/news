<script setup>
  const props = defineProps(['url', 'img', 'source', 'title', 'dateAt']);
</script>
<template>
  <div class="w-1/2 md:w-1/4 px-1 my-1">
    <a :href="props.url" target="blank">
      <div class="bg-gray-50 shadow rounded shadow-gray-500 h-full overflow-hidden hover:shadow-gray-800">
        <div class="w-full relative border-b border-gray-500" style="aspect-ratio: 16/9">
          <img :src="props.img" :alt="props.title" class="w-full h-full top-0 left-0 absolute object-cover bg-gray-200" loading="lazy" draggable="false">
        </div>
        <div class=" px-5 py-3">
          <h2 class="border-l-4 border-rose-800 px-2 text-sm font-medium">{{ props.source }}</h2>
          <h3 class="mt-1">{{ props.title }}</h3>
          <div class="flex justify-between">
            <div class="text-sm font-light">
              {{ props.dateAt }}
            </div>
          </div>
        </div>
      </div>
    </a>
  </div>
</template>
