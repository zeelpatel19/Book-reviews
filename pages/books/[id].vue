<template>
<div>
    <Navbar />
    <div class="bg-blue-200 py-12">
    <div class="container mx-auto">
        <div class="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden shadow-xl">
        <div class="grid grid-cols-1 md:grid-cols-2">
            <!-- Image Section -->
            <div class="relative overflow-hidden md:order-last">
            <img
                class="w-full h-full object-cover transform hover:scale-105 transition duration-300 ease-in-out rounded-lg"
                :src="data.data.attributes.image.data.attributes.url"
                :alt="data.data.attributes.title"
            />
            <div class="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
            <div class="absolute inset-0 flex justify-center items-center">
                <a
                :href="data.data.attributes.read.data[0].attributes.url"
                target="_blank"
                class="text-white text-lg px-6 py-2 rounded-lg shadow-md bg-gray-800 hover:bg-gray-700 transition duration-300 ease-in-out"
                >
                Read Now
                </a>
            </div>
            </div>
            <!-- Details Section -->
            <div class="p-8 md:p-12 flex flex-col justify-center">
            <h2 class="text-4xl font-semibold text-gray-800 mb-4">
                {{ data.data.attributes.title }}
            </h2>
            <p class=" text-blue-500 mb-6">
                By:
                <router-link :to="`/author/${data.data.attributes.authors.data[0].id}`">
                    {{ data.data.attributes.authors.data[0].attributes.firstName }} {{ data.data.attributes.authors.data[0].attributes.lastName }}
                </router-link>
            </p>
            <p class="text-gray-700 mb-6">{{ data.data.attributes.content }}</p>
            <div class="flex items-center mb-6">
                <div class="flex items-center mr-4">
                <template v-for="star in parseInt(data.data.attributes.rating)">
                    <i class="fas fa-star text-yellow-500 mr-1"></i>
                </template>
                </div>
                <span class="text-gray-700">{{ data.data.attributes.rating }} / 5</span>
                <span class="text-gray-700 ml-auto">{{ data.data.attributes.reviewCount }} review{{ data.data.attributes.reviewCount !== 1 ? 's' : '' }}</span>
            </div>
            <div>
                <h3 class="text-2xl font-semibold text-gray-800 mb-2">Reviews</h3>
                <div>
                <p
                    v-for="(review, index) in [data.data.attributes.review1, data.data.attributes.review2, data.data.attributes.review3]"
                    :key="index"
                    class="italic mb-2 text-gray-700"
                >
                    {{ review }}
                </p>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>
</div>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const bookid = route.params.id;
const bookapi = `https://strapi-headless.onrender.com/api/books/${bookid}?populate[image][fields][0]=url&populate[authors][fields][0]=firstName&populate[authors][fields][1]=lastName&populate[read][fields][0]=url`;
const { data } = await useFetch(bookapi);
</script>

<style scoped>
.bg-blue-200 {
background-color: #BFDBFE;
}
</style>
