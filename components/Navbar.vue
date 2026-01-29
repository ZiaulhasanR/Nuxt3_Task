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
          <NuxtLink to="/scrolldesign" class="hover:text-gray-900 transition-all">
            Design
          </NuxtLink>
        </li>
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

      <!-- Authentication Section -->
      <div class="hidden md:flex items-center gap-4 ml-6">
        <!-- Not Registered - Show Sign Up -->
        <button
            v-if="authState === 'guest'"
            @click="navigateTo('Auth/signup')"
            class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all"
        >
          Sign Up
        </button>

        <!-- Registered but Not Logged In - Show Login -->
        <button
            v-if="authState === 'registered'"
            @click="navigateTo('/login')"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
        >
          Login
        </button>

        <!-- Logged In - Show Avatar -->
        <div v-if="authState === 'authenticated'" class="relative">
          <button
              @click="navigateTo('/profile')"
              class="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold hover:bg-green-600 transition-all ring-2 ring-green-200 hover:ring-green-300"
              :title="user?.name || 'Profile'"
          >
            <img
                v-if="user?.avatar"
                :src="user.avatar"
                :alt="user.name"
                class="w-full h-full rounded-full object-cover"
            />
            <span v-else class="text-sm">
              {{ getInitials(user?.name) }}
            </span>
          </button>
        </div>
      </div>


      <button
          @click="toggleMobileMenu"
          class="md:hidden focus:outline-none"
          aria-label="Toggle mobile menu"
      >
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

    <!-- Mobile Menu (optional enhancement) -->
    <div
        v-if="showMobileMenu"
        class="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t"
    >
      <ul class="flex flex-col gap-4 p-6 text-lg font-medium capitalize text-gray-600">
        <li>
          <NuxtLink to="/scrolldesign" class="hover:text-gray-900 transition-all">
            Design
          </NuxtLink>
        </li>
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
        <li class="border-t pt-4">
          <button
              v-if="authState === 'guest'"
              @click="navigateTo('/signup')"
              class="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all"
          >
            Sign Up
          </button>
          <button
              v-if="authState === 'registered'"
              @click="navigateTo('/login')"
              class="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
          >
            Login
          </button>
          <button
              v-if="authState === 'authenticated'"
              @click="navigateTo('/profile')"
              class="w-full px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-all"
          >
            Profile
          </button>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Types
interface User {
  name: string
  email: string
  avatar?: string
}

// State management
const showMobileMenu = ref(false)

// Authentication state
// Options: 'guest' | 'registered' | 'authenticated'
const authState = ref<'guest' | 'registered' | 'authenticated'>('guest')

// User data (when authenticated)
const user = ref<User | null>(null)

// Example: Set user as authenticated (you'll replace this with actual auth logic)
// Uncomment one of these to test different states:

// authState.value = 'guest' // Not registered
// authState.value = 'registered' // Registered but not logged in
// authState.value = 'authenticated' // Logged in
// user.value = {
//   name: 'John Doe',
//   email: 'john@example.com',
//   avatar: 'https://i.pravatar.cc/150?img=12' // Optional avatar URL
// }

// Functions
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const getInitials = (name?: string): string => {
  if (!name) return 'U'
  const parts = name.split(' ')
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}

// You would typically check authentication status on component mount
// Example with composable:
// const { user, isAuthenticated } = useAuth()
</script>