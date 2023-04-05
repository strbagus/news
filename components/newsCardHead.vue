<script setup>
  const props = defineProps(['url', 'img', 'source', 'title']);
</script>
<template>
  <div class="w-1/2 md:w-full p-1">
    <a :href="props.url" target="blank">
      <div class="w-full relative bg-gray-300" style="aspect-ratio: 16/9">
        <img :src="props.img" :alt="props.title" draggable="false" loading="lazy" class="w-full h-full absolute top-0 left-0 object-cover">
        <div class="absolute w-full bottom-0 h-2/3 bg-gradient-to-t from-blue-900 to-transparent flex justify-end">
          <div class="relative md:w-4/5 px-5 pb-2 font-medium text-white flex flex-col justify-end text-end">
            <h3 class="text-[10px] md:text-xs italic">{{ props.source }}</h3>
            <h2 class="text-xs md:text-base leading-5">{{ props.title }}</h2>
          </div>
        </div>
      </div>
    </a>
  </div>
</template>
