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
        <!-- Not Authenticated - Show Sign Up -->
        <button
            v-if="!isAuthenticated"
            @click="navigateTo('/Auth/signup')"
            class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all"
        >
          Sign Up
        </button>

        <!-- Authenticated - Show Avatar with Dropdown -->
        <div v-else class="relative" ref="dropdownRef">
          <button
              @click="toggleDropdown"
              class="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-semibold hover:from-green-500 hover:to-green-700 transition-all ring-2 ring-green-200 hover:ring-green-300 shadow-md"
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

          <!-- Dropdown Menu -->
          <Transition name="dropdown">
            <div
                v-if="showDropdown"
                class="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden"
            >
              <!-- User Info -->
              <div class="px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-semibold">
                    <img
                        v-if="user?.avatar"
                        :src="user.avatar"
                        :alt="user.name"
                        class="w-full h-full rounded-full object-cover"
                    />
                    <span v-else class="text-base">
                      {{ getInitials(user?.name) }}
                    </span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-semibold text-gray-900 truncate">{{ user?.name || 'User' }}</p>
                    <p class="text-xs text-gray-600 truncate">{{ user?.email || '' }}</p>
                  </div>
                </div>
              </div>

              <!-- Menu Items -->
              <div class="py-2">
                <NuxtLink
                    to="/profile"
                    class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    @click="showDropdown = false"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  View Profile
                </NuxtLink>
                
                <NuxtLink
                    to="/settings"
                    class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    @click="showDropdown = false"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Settings
                </NuxtLink>

                <div class="border-t border-gray-200 my-2"></div>

                <button
                    @click="handleLogout"
                    class="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </Transition>
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

    <!-- Mobile Menu -->
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
              v-if="!isAuthenticated"
              @click="navigateTo('/Auth/signup')"
              class="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all"
          >
            Sign Up
          </button>
          <div v-else class="space-y-2">
            <div class="px-4 py-2 bg-gray-50 rounded-md">
              <p class="text-sm font-semibold text-gray-900">{{ user?.name || 'User' }}</p>
              <p class="text-xs text-gray-600">{{ user?.email || '' }}</p>
            </div>
            <button
                @click="handleLogout"
                class="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
            >
              Logout
            </button>
          </div>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuth } from '~/composables/useAuth'

// State management
const showMobileMenu = ref(false)
const showDropdown = ref(false)
const dropdownRef = ref(null)

// Use auth composable
const { user, isAuthenticated, fetchUser, logout, getInitials } = useAuth()

// Fetch user on component mount
onMounted(async () => {
  await fetchUser()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Functions
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    showDropdown.value = false
  }
}

const handleLogout = async () => {
  showDropdown.value = false
  showMobileMenu.value = false
  await logout()
}
</script>

<style scoped>
/* Dropdown transition */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>