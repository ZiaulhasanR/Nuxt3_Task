<template>
  <div>
    <Navbar />
  
    <main class="container mx-auto pt-20 px-4">
      <NuxtPage />
    </main>
  </div>
  <div>
    <Footer />
  </div>
</template>

<style scoped>

.router-link-exact-active {
  color: #12b488;
  font-weight: bold;
}
</style>
