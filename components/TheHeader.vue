<script setup>
import { ref, onMounted, } from 'vue'
onMounted(() => {
  const menu = document.querySelector('#navMenu')
  const blocker = document.querySelector('#navBlocker')
  
  document.querySelector('#navToggle').addEventListener('click', () => { activateMenu() })
  document.querySelector('#navBlocker').addEventListener('click', () => { activateMenu() })
  
  function activateMenu(){
    menu.classList.toggle('active')
    blocker.classList.toggle('active')
  }
  const btnMobile = document.querySelector('#SearchButtonMobile')
  
  btnMobile.addEventListener('click', function() {
    activateMenu()
  })
})
const search = ref('')
const router = useRouter()
const searchTo = () => {
  router.push(`/search?q=${search.value}`)
}
</script>
<template>
  <nav class="bg-gray-50 fixed w-full top-0 z-50">
    <div class="max-w-[1000px] mx-auto py-3 flex items-center justify-between px-3">
      <a href="/">
        <h1 class="text-3xl font-extrabold text-rose-700 tracking-tighter">STARB<span class="text-blue-800 font-normal">NEWS</span></h1>
      </a>
      <form @submit.prevent="searchTo">
        <div class="hidden md:flex">
          <input type="text" aria-label="searchbar" v-model="search" class="text-gray-700 px-5 py-1 rounded-full rounded-r border border-gray-400 shadow" placeholder="Search news.." @keyup.enter="searchTo">
          <button v-if="search!==''" type="submit" class="bg-blue-800 flex items-center px-3 rounded-full rounded-l shadow text-white cursor-pointer hover:bg-blue-900 duration-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m18.9 20.3l-5.6-5.6q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.612 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.625 5.625q.275.275.275.675t-.3.7q-.275.275-.7.275t-.7-.275ZM9.5 14q1.875 0 3.188-1.313T14 9.5q0-1.875-1.313-3.188T9.5 5Q7.625 5 6.312 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14Z"/></svg>
          </button>
          <div v-else class="flex items-center px-3 rounded-full rounded-l shadow text-white bg-blue-900">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m18.9 20.3l-5.6-5.6q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.612 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.625 5.625q.275.275.275.675t-.3.7q-.275.275-.7.275t-.7-.275ZM9.5 14q1.875 0 3.188-1.313T14 9.5q0-1.875-1.313-3.188T9.5 5Q7.625 5 6.312 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14Z"/></svg>
          </div>
        </div>
      </form>
      <div class="text-black block md:hidden cursor-pointer" id="navToggle">
        <svg width="28" height="28" viewBox="0 0 16 16"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.75 12.25h10.5m-10.5-4h10.5m-10.5-4h10.5"/></svg>
      </div>
    </div>
    <div class="w-full bg-rose-700 pb-1 shadow-b shadow-lg">
      <div class="bg-gray-200 py-1 hidden md:block" id="navMenu">
        <ul class="flex max-w-[1000px] mx-auto text-sm font-medium md:flex-row flex-col items-center" id="links">
          <li class="block md:hidden px-5 my-5">
            <form @submit.prevent="searchTo">
              <div class="flex">
                <input type="text" v-model="search" aria-label="mobile search input" class="text-gray-700 px-5 py-1 rounded-full rounded-r border border-gray-400 shadow" placeholder="Search news.." @keyup.enter="searchTo">
                <button type="submit" id="SearchButtonMobile" class="bg-blue-800 flex items-center px-3 rounded-full rounded-l shadow text-white cursor-pointer hover:bg-blue-900 duration-100" aria-label="searchButton">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m18.9 20.3l-5.6-5.6q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.612 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.625 5.625q.275.275.275.675t-.3.7q-.275.275-.7.275t-.7-.275ZM9.5 14q1.875 0 3.188-1.313T14 9.5q0-1.875-1.313-3.188T9.5 5Q7.625 5 6.312 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14Z"/></svg>
                </button>
              </div>
            </form>
          </li>
          <li class="mx-3 hover:text-rose-800 mt-4 mb-2 md:mt-0 md:mb-0"><NuxtLink to="/">HOME</NuxtLink></li>
          <li class="mx-3 hover:text-rose-800 my-2 md:my-0"><NuxtLink href="/search?q=politics">POLITIC</NuxtLink></li>
          <li class="mx-3 hover:text-rose-800 my-2 md:my-0"><NuxtLink href="/search?q=sports">SPORT</NuxtLink></li>
          <li class="mx-3 hover:text-rose-800 my-2 md:my-0"><NuxtLink href="/search?q=natures">NATURE</NuxtLink></li>
          <li class="mx-3 hover:text-rose-800 my-2 md:my-0"><NuxtLink href="/search?q=travels">TRAVEL</NuxtLink></li>
          <li class="mx-3 hover:text-rose-800 my-2 md:my-0"><NuxtLink href="/search?q=technologies">TECHNOLOGY</NuxtLink></li>
          <li class="mx-3 hover:text-rose-800 mt-2 mb-4 md:mt-0 md:mb-0"><NuxtLink href="/search?q=fashions">FASHION</NuxtLink></li>
        </ul>
      </div>

    </div>
  </nav>
  <div class="z-40 fixed w-full h-screen bg-black opacity-70 hidden" id="navBlocker"></div>
</template>
<style>
  #navMenu.active {
    display:flex;
  }
  #navBlocker.active {
    display: block;
  } 
</style>
