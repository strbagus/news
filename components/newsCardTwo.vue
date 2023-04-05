<script setup>
  const props = defineProps(['url', 'img', 'source', 'title', 'dateAt', 'author']);
</script>
<template>
  <a :href="props.url" target="blank">
    <div class="border-b-2 border-blue-800  flex items-center hover:border-rose-800 py-3">
      <div class="w-1/3 px-2">
        <div class="w-full relative" style="aspect-ratio: 3/2">
          <img :src="props.img" loading="lazy" draggable="false" :alt="props.title" class='w-full h-full absolute top-0 left-0 object-cover bg-gray-200'>
        </div>
      </div>
      <div class="w-2/3 px-2">
        <div class="border-l-4 text-sm md:text-base border-rose-800 pl-2">{{ props.source }}</div>
        <div class="text-base md:text-xl leading-6 my-1 md:my-3 font-medium">{{ props.title }}</div>
        <div class="text-sm">
          <span class="font-medium">{{ props.author }}</span> - {{ props.dateAt }}
        </div>
      </div>
    </div>
  </a>   
</template>
