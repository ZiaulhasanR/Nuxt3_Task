<template>
    <header class="px-8 py-4 border-b fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
    <nav class="container flex items-center justify-between mx-auto">
      
      <NuxtLink to="/" class="flex items-center gap-2">
        <img
          width="56"
          src="https://estore-oni.netlify.app/_nuxt/icon-green.UlAXWnCp.png"
          alt="EStore Logo"
        />
        <span class="text-3xl font-bold text-gray-800 capitalize">EStore</span>
      </NuxtLink>

      
      <ul class="hidden md:flex gap-6 ml-auto text-lg font-medium capitalize text-gray-600">
        <li>
          <NuxtLink to="/chat" class="hover:text-gray-900 transition-all">
            Chat
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/" class="hover:text-gray-900 transition-all">
            Home
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/favoriteproducts" class="hover:text-gray-900 transition-all">
            Favorite Products
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/cart" class="hover:text-gray-900 transition-all">
            Cart
          </NuxtLink>
        </li>
      </ul>

      
      <button class="md:hidden focus:outline-none" aria-label="Toggle mobile menu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-8 h-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
    </nav>
  </header>
  
</template>
<script setup lang="ts">
</script>