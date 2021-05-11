<template>
  <layout id="app">
    <router-view></router-view>
  </layout>
</template>

<script>
import Layout from '@/layouts/Layout.vue';

export default {
  name: 'App',
  components: { Layout }
};
</script>