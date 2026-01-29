<template>
  <div class="container">
    <div class="row">
      <nav class="col-sm-3 position-fixed">
        <ul class="nav flex-column mt-3">
          <li><a :class="linkClass('section1')" href="#section1">Section 1</a></li>
          <li><a :class="linkClass('section2')" href="#section2">Section 2</a></li>
          <li><a :class="linkClass('section3')" href="#section3">Section 3</a></li>
          <li><a :class="linkClass('section41')" href="#section41">Section 4-1</a></li>
          <li><a :class="linkClass('section42')" href="#section42">Section 4-2</a></li>
        </ul>
      </nav>

      <div class="col-sm-9 offset-sm-3">
        <div id="section1" class="section bg-primary text-dark">Section 1</div>
        <div id="section2" class="section bg-secondary text-dark">Section 2</div>
        <div id="section3" class="section bg-warning text-dark">Section 3</div>
        <div id="section41" class="section bg-info text-dark">Section 4-1</div>
        <div id="section42" class="section bg-success text-dark">Section 4-2</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const activeSection = ref('section1')

// List of section IDs to observe
const sectionIds = ['section1', 'section2', 'section3', 'section41', 'section42']

// Utility to return class for each link
const linkClass = (id) => {
  return ['nav-link', activeSection.value === id ? 'fw-bold text-danger' : 'text-dark']
}

onMounted(() => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.6 // Trigger when 60% of section is visible
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id
      }
    })
  }, options)

  sectionIds.forEach(id => {
    const section = document.getElementById(id)
    if (section) {
      observer.observe(section)
    }
  })
})
</script>

<style scoped>
.section {
  height: 100vh;
  padding: 2rem;
  font-size: 2rem;
  scroll-margin-top: 60px;
}

nav a {
  display: block;
  padding: 0.5rem 1rem;
  text-decoration: none;
}

nav a.fw-bold {
  background-color: #f8f9fa;
  border-left: 4px solid red;
}
</style>
