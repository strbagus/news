<script setup>
  const year = new Date().getFullYear();
</script>
<template>
  <footer>
    <div class="bg-stone-800 border-gray-500 border-t-2">
      <div class="max-w-[1000px] mx-auto py-4 flex justify-center">
        <span class="text-white text-sm">Copyright &copy; {{ year }}. All Right Reserved</span>
      </div>
    </div>
  </footer>
</template>
