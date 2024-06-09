<template>
  <div class="p-4 space-y-8 bg-gradient-to-br ">
    <div>
      <h2 class="text-2xl font-bold mb-4">Top Rated(5 Stars)</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="book in topReviews" :key="book.id" class="relative rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105">
          <router-link :to="baseurl + book.id" class="block">
            <div class="relative h-80">
              <img class="absolute inset-0 w-full h-full object-cover" :src="book.attributes.image.data.attributes.url" :alt="book.attributes.title">
              <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70 transition-opacity duration-300 hover:opacity-90"></div>
              <div class="absolute inset-0 flex items-end p-4">
                <h2 class="text-white text-lg font-semibold">{{ book.attributes.title }}</h2>
              </div>
            </div>
            <div class="p-4 bg-white">
              <div class="flex items-center mb-2">
                <div class="flex space-x-1">
                  <i v-for="star in parseInt(book.attributes.rating)" :key="star" class="star text-yellow-500"></i>
                </div>
                <span class="ml-2 text-gray-600 float-right">{{ book.attributes.feel }}</span>
              </div>
              <p class="text-gray-800">{{ book.attributes.description }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <div>
      <h2 class="text-2xl font-bold mb-4">Recommended</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="book in midReviews" :key="book.id" class="relative rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105">
          <router-link :to="baseurl + book.id" class="block">
            <div class="relative h-80">
              <img class="absolute inset-0 w-full h-full object-cover" :src="book.attributes.image.data.attributes.url" :alt="book.attributes.title">
              <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70 transition-opacity duration-300 hover:opacity-90"></div>
              <div class="absolute inset-0 flex items-end p-4">
                <h2 class="text-white text-lg font-semibold">{{ book.attributes.title }}</h2>
              </div>
            </div>
            <div class="p-4 bg-white">
              <div class="flex items-center mb-2">
                <div class="flex space-x-1">
                  <i v-for="star in parseInt(book.attributes.rating)" :key="star" class="star text-yellow-500"></i>
                </div>
                <span class="ml-2 text-gray-600">{{ book.attributes.feel }}</span>
              </div>
              <p class="text-gray-800">{{ book.attributes.description }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <div>
      <h2 class="text-2xl font-bold mb-4">Try Something New (Mixed Reviews)</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="book in lowReviews" :key="book.id" class="relative rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105">
          <router-link :to="baseurl + book.id" class="block">
            <div class="relative h-80">
              <img class="absolute inset-0 w-full h-full object-cover" :src="book.attributes.image.data.attributes.url" :alt="book.attributes.title">
              <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70 transition-opacity duration-300 hover:opacity-90"></div>
              <div class="absolute inset-0 flex items-end p-4">
                <h2 class="text-white text-lg font-semibold">{{ book.attributes.title }}</h2>
              </div>
            </div>
            <div class="p-4 bg-white">
              <div class="flex items-center mb-2">
                <div class="flex space-x-1">
                  <i v-for="star in parseInt(book.attributes.rating)" :key="star" class="star text-yellow-500"></i>
                </div>
                <span class="ml-2 text-gray-600">{{ book.attributes.feel }}</span>
              </div>
              <p class="text-gray-800">{{ book.attributes.description }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';

const baseurl = '/books/';

const props = defineProps({
  books: Object
});

const topReviews = computed(() => props.books.data.filter(book => parseInt(book.attributes.rating) === 5));
const midReviews = computed(() => props.books.data.filter(book => parseInt(book.attributes.rating) === 3 || parseInt(book.attributes.rating) === 4));
const lowReviews = computed(() => props.books.data.filter(book => parseInt(book.attributes.rating) === 1 || parseInt(book.attributes.rating) === 2));
</script>

<style>
.star {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2l2.4 7.4H22l-6 4.6 2.4 7.4L12 16.6 5.6 21l2.4-7.4-6-4.6h7.6L12 2z" fill="currentColor"/></svg>');
  background-size: cover;
}
</style>