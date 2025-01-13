<template>
    <div class="container mx-auto py-8">
        <h1 class="text-2xl font-bold mb-4">Favorite Products</h1>
        <div v-if="favorites.length === 0" class="text-gray-600">
            You have no favorite products.
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="item in favorites" :key="item.id" class="border rounded-lg shadow-lg bg-white p-4">
                <img :src="item.image" :alt="item.title" class="h-24 w-24 object-contain mx-auto" />
                <h2 class="text-lg font-semibold text-center mt-2">{{ item.title }}</h2>
                <p class="text-center text-gray-600">${{ item.price }}</p>
                <button @click="removeFromCart(index)"
                    class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
                    Remove
                </button>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const favorites = ref([]);

const loadFavorites = () => {
    const storedFavorites = localStorage.getItem("favorites");
    favorites.value = storedFavorites ? JSON.parse(storedFavorites) : [];
};

onMounted(() => {
    loadFavorites();
});
</script>
