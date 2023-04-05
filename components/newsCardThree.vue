<script setup>
  const props = defineProps(['url', 'img', 'source', 'title', 'dateAt', 'author', 'desc']);
</script>
<template>
  <a :href="props.url" target="blank">
    <div class="border-b-2 border-blue-800  flex items-center hover:border-rose-800 flex-wrap py-5">
      <div class="w-1/3 px-2">
        <div class="w-full relative" style="aspect-ratio: 3/2">
          <img :src="props.img" loading="lazy" draggable="false" :alt="props.title" class='w-full h-full absolute top-0 left-0 object-cover bg-gray-200'>
        </div>
      </div>
      <div class="w-2/3 px-2">
        <div class="border-l-4 border-rose-800 pl-2 text-sm md:text-base">{{ props.source }}</div>
        <div class="text-xl md:text-2xl leading-6 my-3 font-medium">{{ props.title }}</div>
        <div class="hidden md:block">
          <div class="pb-1 text-base">{{ props.desc }}</div>
          <div class="text-sm">
            <span class="font-medium">{{ props.author }}</span> - {{ props.dateAt }}
          </div>
        </div>
      </div>
      <div class="w-full px-2 block md:hidden">
        <div class="py-1 text-sm">{{ props.desc }}</div>
        <div class="text-xs">
          <span class="font-medium">{{ props.author ? props.author+' - ' : ''}}</span>{{ props.dateAt }}
        </div>
      </div>
    </div>
  </a>
</template>
