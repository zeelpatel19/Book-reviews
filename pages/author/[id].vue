<template>
  <div>
    <Navbar />
    <div class="flex flex-col items-center justify-center py-8">
      <div v-if="loading" class="text-center py-20">Loading...</div>
      <div v-else-if="error" class="text-center py-20 text-red-500">Error loading author: {{ error.message }}</div>
      <div v-else class="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden shadow-xl p-8">
        <div class="flex flex-wrap items-center mb-8">
          <!-- Author Image -->
          <div class="w-full sm:w-auto mb-4 sm:mb-0 sm:mr-8">
            <img :src="author.attributes.imageauthor?.data?.attributes?.url" alt="Author Image" class="w-64 h-64 rounded-full mb-4 object-cover">
          </div>
          
          <!-- Books Section -->
          <div class="w-full sm:w-auto">
            <h1 class="text-3xl font-bold mb-4">{{ author.attributes.firstName }} {{ author.attributes.lastName }}</h1>
            <h2 class="text-2xl font-bold mt-2 mb-4">Books by {{ author.attributes.firstName }} {{ author.attributes.lastName }}</h2>
            <div v-if="booksLoading" class="text-center py-4">Loading books...</div>
            <div v-else-if="booksError" class="text-center py-4 text-red-500">Error loading books: {{ booksError.message }}</div>
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              <div v-for="book in books" :key="book.id" class="bg-white bg-opacity-80 p-6 rounded-lg shadow-md">
                <nuxt-link :to="`/books/${book.id}`" class="flex flex-col items-center no-underline text-gray-800">
                  <img :src="book.attributes.image.data.attributes.url" alt="Book Image" class="w-32 h-32 rounded-full mb-4 object-cover">
                  <h3 class="text-xl font-semibold">{{ book.attributes.title }}</h3>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Display Biography -->
        <div>
          <h2 class="text-2xl font-bold mt-8 mb-4">Biography</h2>
          <p class="text-lg mb-8">{{ author.attributes.bio }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const authorId = route.params.id;
const author = ref(null);
const loading = ref(true);
const error = ref(null);
const books = ref([]);
const booksLoading = ref(true);
const booksError = ref(null);

const fetchAuthor = async () => {
  try {
    const response = await fetch(`https://strapi-headless.onrender.com/api/authors/${authorId}?populate=imageauthor`);
    const result = await response.json();
    author.value = result.data;
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
};

const fetchBooks = async () => {
  try {
    const response = await fetch(`https://strapi-headless.onrender.com/api/books?filters[authors][id][$eq]=${authorId}&populate=image`);
    const result = await response.json();
    books.value = result.data;
  } catch (err) {
    booksError.value = err;
  } finally {
    booksLoading.value = false;
  }
};

onMounted(() => {
  fetchAuthor();
  fetchBooks();
});
</script>

<style scoped>

</style>
