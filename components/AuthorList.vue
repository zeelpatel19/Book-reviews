<template>
  <div class="flex flex-col items-center justify-center text-center py-8">
    <h1 class="text-3xl font-bold mb-8">My Authors Selection</h1>
    <!-- Search Input -->
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search authors..."
      class="px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
    />
    <div class="w-full max-w-6xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <div v-for="(author, index) in filteredAuthors" :key="author.id" :class="generateColorClass(index)">
        <nuxt-link :to="`/author/${author.id}`" class="flex flex-col items-center bg-white bg-opacity-80 p-6 rounded-lg shadow-md h-full no-underline text-gray-800">
          <img :src="author.attributes.imageauthor.data.attributes.url" alt="Author Image" class="w-32 h-32 rounded-full mb-4 object-cover">
          <h2 class="text-2xl font-semibold">{{ author.attributes.firstName }} {{ author.attributes.lastName }}</h2>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, computed } from 'vue';

const props = defineProps({
  authors: Object
});

const searchQuery = ref('');

const generateColorClass = (index) => {
  const colors = [
    'bg-red-100',
    'bg-green-100',
    'bg-blue-100',
    'bg-yellow-100',
    'bg-purple-100',
    'bg-pink-100',
    'bg-indigo-100',
    'bg-teal-100',
    'bg-gray-100',
    'bg-orange-100'
  ];
  return colors[index % colors.length];
};


const filteredAuthors = computed(() => {
  if (!searchQuery.value.trim()) {
    
    return props.authors.data;
  } else {
    
    const query = searchQuery.value.trim().toLowerCase();
    return props.authors.data.filter(author =>
      author.attributes.firstName.toLowerCase().includes(query) ||
      author.attributes.lastName.toLowerCase().includes(query)
    );
  }
});
</script>
