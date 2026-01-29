<template>
  <div class="min-h-screen flex  p-4">
    <!-- Main Container -->
    <div class="w-full max-w-7xl mx-auto bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 rounded-3xl shadow-2xl overflow-hidden flex">

      <!-- Left Side - Form -->
      <div class="w-full lg:w-1/2 p-12 flex flex-col justify-center relative">
        <!-- Close Button -->
<!--        <button class="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/50 hover:bg-white/80 flex items-center justify-center transition-all">-->
<!--          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
<!--            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />-->
<!--          </svg>-->
<!--        </button>-->

        <!-- Logo -->
        <div class="mb-12">
          <div class="inline-block px-6 py-2 bg-white rounded-full border-2 border-gray-300 shadow-sm">
            <span class="text-gray-800 font-medium text-lg">EStore</span>
          </div>
        </div>

        <!-- Heading -->
        <div class="mb-8">
          <h1 class="text-4xl font-light text-gray-800 mb-2">Create an account</h1>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Full Name -->
          <div>
            <label class="block text-sm text-gray-600 mb-2">Full name</label>
            <input
                v-model="formData.name"
                type="text"
                placeholder="Enter Your Full Name"
                class="w-full px-6 py-4 bg-white/60 backdrop-blur-sm rounded-2xl border-0 focus:ring-2 focus:ring-yellow-400 outline-none transition-all text-gray-800 placeholder-gray-400"
            />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm text-gray-600 mb-2">Email</label>
            <input
                v-model="formData.email"
                type="email"
                placeholder="Enter Your Email Address"
                class="w-full px-6 py-4 bg-white/60 backdrop-blur-sm rounded-2xl border-0 focus:ring-2 focus:ring-yellow-400 outline-none transition-all text-gray-800 placeholder-gray-400"
            />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm text-gray-600 mb-2">Password</label>
            <div class="relative">
              <input
                  v-model="formData.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Enter Your Password"
                  class="w-full px-6 py-4 bg-white/60 backdrop-blur-sm rounded-2xl border-0 focus:ring-2 focus:ring-yellow-400 outline-none transition-all text-gray-800 placeholder-gray-400"
              />
              <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Submit Button -->
          <button
              type="submit"
              class="w-full py-4 bg-gradient-to-r from-yellow-300 to-yellow-400 text-gray-800 font-medium rounded-2xl hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Submit
          </button>

          <!-- Social Login -->
          <div class="flex gap-4">
            <button
                type="button"
                class="flex-1 py-3 bg-white/60 backdrop-blur-sm rounded-2xl hover:bg-white/80 transition-all flex items-center justify-center gap-2 text-gray-700 font-medium"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" fill="currentColor"/>
              </svg>
              Apple
            </button>
            <button
                type="button"
                class="flex-1 py-3 bg-white/60 backdrop-blur-sm rounded-2xl hover:bg-white/80 transition-all flex items-center justify-center gap-2 text-gray-700 font-medium"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
          </div>
        </form>

        <!-- Footer -->
        <div class="mt-8 flex justify-between text-sm">
          <p class="text-gray-600">
            Have any account? <a href="#" class="text-gray-800 underline hover:text-gray-900">Sing in</a>
          </p>
          <a href="#" class="text-gray-600 underline hover:text-gray-800">Terms & Conditions</a>
        </div>
      </div>

      <!-- Right Side - Image -->
      <div class="hidden lg:block lg:w-1/2 relative">
        <div class="absolute inset-0 bg-gradient-to-br from-amber-100/50 to-transparent"></div>
        <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
            alt="Team collaboration"
            class="w-full h-full object-cover"
        />

        <!-- Floating Cards -->
        <div class="absolute top-8 right-8 bg-yellow-300 rounded-2xl p-4 shadow-xl animate-float">
          <p class="text-sm font-medium text-gray-800">Task Review With Team</p>
          <p class="text-xs text-gray-600">09:30am-10:00am</p>
          <div class="flex gap-1 mt-2">
            <div class="w-2 h-2 bg-gray-800 rounded-full"></div>
            <div class="w-2 h-2 bg-gray-800 rounded-full"></div>
          </div>
        </div>

        <div class="absolute bottom-32 left-8 bg-white rounded-2xl p-4 shadow-xl animate-float-delayed">
          <p class="text-sm font-medium text-gray-800">Daily Meeting</p>
          <p class="text-xs text-gray-600">12:00pm-01:00pm</p>
          <div class="flex -space-x-2 mt-2">
            <img src="https://i.pravatar.cc/150?img=1" class="w-8 h-8 rounded-full border-2 border-white" alt="User 1" />
            <img src="https://i.pravatar.cc/150?img=2" class="w-8 h-8 rounded-full border-2 border-white" alt="User 2" />
            <img src="https://i.pravatar.cc/150?img=3" class="w-8 h-8 rounded-full border-2 border-white" alt="User 3" />
            <img src="https://i.pravatar.cc/150?img=4" class="w-8 h-8 rounded-full border-2 border-white" alt="User 4" />
          </div>
          <div class="w-2 h-2 bg-yellow-400 rounded-full absolute top-4 right-4"></div>
        </div>

        <!-- Avatar Group -->
        <div class="absolute top-1/2 right-12 flex flex-col gap-2 animate-float">
          <img src="https://i.pravatar.cc/150?img=5" class="w-16 h-16 rounded-full border-4 border-white shadow-lg" alt="User 5" />
          <img src="https://i.pravatar.cc/150?img=6" class="w-16 h-16 rounded-full border-4 border-white shadow-lg" alt="User 6" />
          <img src="https://i.pravatar.cc/150?img=7" class="w-16 h-16 rounded-full border-4 border-white shadow-lg" alt="User 7" />
        </div>

        <!-- Mini Calendar -->
        <div class="absolute bottom-64 right-32 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
          <div class="flex gap-2 text-xs">
            <div class="text-center">
              <p class="text-gray-500">Sun</p>
              <p class="font-semibold">22</p>
            </div>
            <div class="text-center">
              <p class="text-gray-500">Mon</p>
              <p class="font-semibold">23</p>
            </div>
            <div class="text-center">
              <p class="text-gray-500">Tue</p>
              <p class="font-semibold">24</p>
            </div>
            <div class="text-center">
              <p class="text-gray-500">Wed</p>
              <p class="font-semibold">25</p>
            </div>
            <div class="text-center">
              <p class="text-gray-500">Thu</p>
              <p class="font-semibold">26</p>
            </div>
            <div class="text-center">
              <p class="text-gray-500">Fri</p>
              <p class="font-semibold">27</p>
            </div>
            <div class="text-center">
              <p class="text-gray-500">Sat</p>
              <p class="font-semibold">28</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { postData } from '~/composables/useRequest'

definePageMeta({
  layout: 'none-layout'
})

const formData = ref({
  name: '',
  email: '',
  password: ''
})

const showPassword = ref(false)

const handleSubmit = async () => {
  console.log('Submitting form with data:', formData.value)
  
  try {
    const { data, status, error } = await postData("/auth/register", formData.value)
    
    console.log('Response status:', status)
    console.log('Response data:', data)
    console.log('Response error:', error)
    
    if (error) {
      console.error('Registration error:', error)
    } else {
      console.log('Registration successful:', data)
      // Store the token if registration is successful
      if (data?.token) {
        localStorage.setItem('token', data.token)
        console.log('Token stored successfully')
      }
    }
  } catch (err) {
    console.error('Caught error during registration:', err)
  }
}
</script>

<style scoped>
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes float-delayed {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 4s ease-in-out infinite;
  animation-delay: 1s;
}
</style>