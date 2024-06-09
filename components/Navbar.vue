<template>
  <nav class="bg-gray-100 p-4 border-b-2 border-gray-200">
    <div class="flex items-center justify-between">
      <!-- Logo or brand, if needed -->
      <router-link to="/" class="text-xl font-bold text-gray-800">Book Reviews</router-link>

      <!-- Search input in the middle -->
      <div class="flex items-center space-x-4">
        <input 
          type="text" 
          v-model="searchQuery" 
          @input="searchBooks" 
          placeholder="Search books..." 
          class="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <!-- Hamburger menu for mobile -->
        <button @click="toggleMenu" class="md:hidden">
          <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      <!-- Home and Authors links on the right -->
      <div class="hidden md:flex space-x-4">
        <router-link to="/" class="text-gray-800 hover:text-gray-600 transition-colors">Home</router-link>
        <router-link to="/authors" class="text-gray-800 hover:text-gray-600 transition-colors">Authors</router-link>
      </div>
    </div>
    <!-- Mobile Menu -->
    <div class="md:hidden" v-if="isMenuOpen">
      <ul class="bg-white rounded-md border shadow-md">
        <li>
          <router-link to="/" class="block px-4 py-2 text-gray-800 hover:bg-gray-200">Home</router-link>
        </li>
        <li>
          <router-link to="/authors" class="block px-4 py-2 text-gray-800 hover:bg-gray-200">Authors</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const emits = defineEmits(['search']);
const searchQuery = ref('');
const route = useRoute();
const router = useRouter();
const isMenuOpen = ref(false);

const searchBooks = () => {
  if (route.path !== '/') {
    router.push('/');
  }
  emits('search', searchQuery.value);
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped>

</style>
