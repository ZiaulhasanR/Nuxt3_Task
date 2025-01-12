<template>
  <div id="__nuxt" data-v-app>
    <div class="font-Montserrat px-6">
      <main>
        <section class="bg-[#f1f1f1] pt-6">
          <div class="container flex flex-col lg:flex-row item-center py-20 gap-10">
            <div class="flex-1 order-2 lg:order-1 text-center lg:text-left">
              <div class="text-4xl lg:text-6xl font-extrabold text-gray-900 mb-6 lg:mb-8 text-balance">
                <h1 class="text-green-600 mb-4">Estore</h1>
                <p>Discover Your Next Favorite Find!</p>
              </div>
              <p class="text-xl lg:text-2xl text-gray-700 mb lg:mb-12 text-balance">Explore a world of unique products,
                handpicked just for you.</p>
            </div>
            <div class="flex-1 order-1 lg:order-2">
              <img src="https://estore-oni.netlify.app/_nuxt/hero1.BaNRNev3.jpg" alt="Hero">
            </div>
          </div>
        </section>

        <section class="container mx-auto py-8">
          <div v-if="isLoading">
            <p>Loading....</p>
          </div>
          <div v-else>
            <div v-if="products && products?.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

              <div v-for="(item, i) in products" :key="item?.id" class="border rounded-lg shadow-lg bg-white">
                <div class="relative">
                  <img :src="item?.image" :alt="item?.title" class="h-60 w-full object-contain p-4">
                  <div class="flex items-center justify-between my-4">
                    <p class="px-4 py-2 bg-blue-200 rounded-md text-xs text-blue-700 font-semibold">Up to 35% off</p>
                    <div class="flex gap-6 mr-8 text-slate-500 mt-auto">
                      <span class="iconify i-mdi:eye-outline" aria-hidden="true" style="color: rgb(30, 144, 255);">
                      </span>
                      <button disabled class="disabled:cursor-not-allowed">
                        <span class="iconify i-material-symbol:favorite-outline" aria-hidden="true"
                          style="color: rgb(30, 144, 255);">
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="p-4">
                  <NuxtLink :to="`/products/${item.id}`">
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ item?.title }}</h3>
                  </NuxtLink>

                  <p class="text-sm text-gray-600 mb-4">{{ item?.description.slice(0, 80) }}...</p>
                  <div class="flex items-center justify-between">
                    <span class="text-green-600 font-bold text-lg">${{ item?.price }}</span>
                    <button @click="addToCart(item)"
                      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all text-sm">
                      Add to Cart
                    </button>
                  </div>
                </div>
                <div class="p-4 border-t flex justify-between items-center text-sm text-gray-500">
                  <span class="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2l4-4M7 12l-2-2l4-4" />
                    </svg>
                    Fast Delivery
                  </span>
                  <span class="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                    </svg>
                    Best Price
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const products = ref([]);
const isLoading = ref(false);

const init = async () => {
  isLoading.value = true;

  const { data, error } = await useFetch("https://fakestoreapi.com/products");
  if (error && error.value) {
    console.log(error);
  } else {
    window.localStorage.setItem("data", JSON.stringify(data.value));
    products.value = data.value;
  }

  isLoading.value = false;
};


const addToCart = (product) => {

  let cart = JSON.parse(window.localStorage.getItem("cart")) || [];

  const existingProduct = cart.find((item) => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += 1; 
  } else {
    cart.push({ ...product, quantity: 1 }); 
  }

 
  window.localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.title} added to the cart!`);
};

init();
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
  font-size: 36px;
}

p {
  margin: 20px 0;
}
</style>
