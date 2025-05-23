<template>
    <div class="container mx-auto py-8">
        <h1 class="text-2xl font-bold mb-4">Shopping Cart</h1>
        <div v-if="cart.length === 0" class="text-gray-600">
            Your cart is empty.
        </div>
        <div v-else>
            <div class="flex flex-col lg:flex-row gap-8">
                <div class="grid grid-rows-1 gap-6 md:grid-rows-2 lg:grid-rows-3 w-1/2">
                    <div v-for="(item, index) in cart" :key="item.id" class="border rounded-lg shadow-lg bg-white p-4">
                        <div class="flex items-center gap-4">
                            <img :src="item.image" :alt="item.title" class="h-24 w-24 object-contain" />
                            <div class="flex-1">
                                <h2 class="text-lg font-semibold">{{ item.title }}</h2>
                                <p class="text-sm text-gray-600">
                                    ${{ item.price }} x {{ item.quantity }}
                                </p>
                                <p class="text-sm text-gray-700 font-bold">
                                    Total: ${{ (item.price * item.quantity).toFixed(2) }}
                                </p>
                            </div>
                        </div>
                        <div class="mt-4 flex justify-between items-center">
                            <div class="flex gap-2">
                                <button @click="decrementQuantity(index)"
                                    class="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 transition">
                                    -
                                </button>
                                <span class="px-4 py-1 border rounded">{{ item.quantity }}</span>
                                <button @click="incrementQuantity(index)"
                                    class="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 transition">
                                    +
                                </button>
                            </div>
                            <button @click="addToFavorites(index)"
                                class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
                                Add to Favorites
                            </button>
                            <button @click="removeFromCart(index)"
                                class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
                <div class="w-1/2 h-[500px] border rounded-lg shadow-lg bg-white p-6">
                    <p class="text-xl font-semibold mb-4">Order Summary</p>
                    <div class="text-lg text-gray-700 mb-4">
                        <p class="flex justify-between">
                            <span>Original Price</span>
                            <span>${{ subtotal.toFixed(2) }}</span>
                        </p>
                        <p class="flex justify-between">
                            <span class="text-green-500">Savings</span>
                            <span>${{ saving.toFixed(2) }}</span>
                        </p>
                        <p class="flex justify-between">
                            <span>Store Pickup</span>
                            <span>${{ 99 }}</span>
                        </p>
                        <p class="flex justify-between">
                            <span>Tax</span>
                            <span>${{ tax.toFixed(2) }}</span>
                        </p>
                        <p class="flex justify-between font-bold text-gray-900">
                            <span class="text-xl font-bold">Total</span>
                            <span>${{ total.toFixed(2) }}</span>
                        </p>
                    </div>
                    <button class="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const cart = ref([]);
const favorites = ref([]); 

const loadCart = () => {
    const storedCart = localStorage.getItem("cart");
    cart.value = storedCart ? JSON.parse(storedCart) : [];
};

const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart.value));
};

const loadFavorites = () => {
    const storedFavorites = localStorage.getItem("favorites");
    favorites.value = storedFavorites ? JSON.parse(storedFavorites) : [];
};
//loadFavorites(favorites);

//const {loadFavorites} = useUtils(); 
const saveFavorites = () => {
    localStorage.setItem("favorites", JSON.stringify(favorites.value));
};

const incrementQuantity = (index) => {
    cart.value[index].quantity += 1;
    saveCart();
};

const decrementQuantity = (index) => {
    if (cart.value[index].quantity > 1) {
        cart.value[index].quantity -= 1;
        saveCart();
    }
};

const removeFromCart = (index) => {
    cart.value.splice(index, 1);
    saveCart();
};

const addToFavorites = (index) => {
    const item = cart.value[index];
    const alreadyFavorite = favorites.value.some((fav) => fav.id === item.id);
    if (!alreadyFavorite) {
        favorites.value.push(item);
        saveFavorites();
    }
};

const subtotal = computed(() =>
    cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
);
const tax = computed(() => subtotal.value * 0.1); 
const saving = computed(() => subtotal.value * 0.02); 
const total = computed(() => subtotal.value + tax.value);

onMounted(() => {
    loadCart();
    loadFavorites();
});
</script>
