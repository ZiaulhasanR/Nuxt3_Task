<template>
  <div class="card">
    <div v-if="!product" class="text-center text-gray-500">
      <p>Loading product details...</p>
    </div>
    <div v-else class="grid grid-cols-2 gap-10">
      <div class="p-7">
        <img :src="product.image" alt="Product Image" class="mx-auto my-7" />
      </div>
      <div class="p-7">
        <h2 class="text-4xl my-7">{{ product.title }}</h2>
        <p class="text-xl my-7">Price - ${{ product.price }}</p>
        <h3 class="font-bold border-b-2 mb-4 pb-2">Product description:</h3>
        <p class="mb-7">{{ product.description }}</p>
        <button @click="addToCart(product)" class="btn flex bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          <i class="material-icons mr-2">add_shopping_cart</i>
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const product = ref(null);
const route = useRoute();

const fetchProduct = async (id) => {
  const { data, error } = await useFetch(`https://fakestoreapi.com/products/${id}`);
  if (error && error.value) {
    console.log(error);
  } else {
    product.value = data.value;
  }
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

onMounted(() => {
  const productId = route.params.id;
  if (productId) {
    fetchProduct(productId);
  }
});
</script>

<style scoped>
img {
  max-width: 400px;
}
</style>
