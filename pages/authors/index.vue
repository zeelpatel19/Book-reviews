<template>
    <div>
      <Navbar />
      <AuthorList :authors="data" />
    </div>
  </template>
  
  <script setup>
  import Navbar from '~/components/Navbar.vue';
  
  import { authorsapi } from '~/helpers';
  
  const { data } = await useFetch(authorsapi);
  </script>
  