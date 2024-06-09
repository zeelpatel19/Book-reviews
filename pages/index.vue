<template>
<div>
    <Navbar @search="handleSearch" />
    <div v-if="loading" class="text-center py-20">Loading...</div>
    <div v-else-if="error" class="text-center py-20 text-red-500">Error loading books: {{ error.message }}</div>
    <div v-else>
    <BookList :books="filteredBooks" />
    </div>
</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Navbar from '~/components/Navbar.vue';
import BookList from '~/components/BookList.vue';

const searchQuery = ref('');
const data = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchBooks = async () => {
try {
    const response = await fetch('https://strapi-headless.onrender.com/api/books?populate[image][fields][0]=url&populate[authors][fields][0]=firstName&populate[authors][fields][1]=lastName&populate[read][fields][0]=url');
    const result = await response.json();
    data.value = result;
} catch (err) {
    error.value = err;
} finally {
    loading.value = false;
}
};

onMounted(fetchBooks);

const handleSearch = (query) => {
searchQuery.value = query;
};

const filteredBooks = computed(() => {
if (!data.value) return { data: [] };
if (!searchQuery.value) return data.value;
return {
    ...data.value,
    data: data.value.data.filter(book =>
    book.attributes.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
};
});
</script>

<style scoped>

</style>
