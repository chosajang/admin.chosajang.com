<template>
  <div>
    <admin-header v-bind:isSidebar="isSidebar"></admin-header>
    <main class="w-full">
      <sidebar v-bind:isSidebar="isSidebar"></sidebar>
      <slot></slot>
    </main>
  </div>
</template>

<script>
import AdminHeader from '../components/layout/Header.vue';
import Sidebar from '../components/layout/Sidebar.vue';

export default {
  name: 'AdminLayout',
  data () {
    return {
      isSidebar: true,
      width: 0
    }
  },
  components: {
    AdminHeader,
    Sidebar
  },
  created() {
    document.body.classList.add('bg-gray-50', 'font-sans')
  },
  destroyed() {
    document.body.classList.remove('bg-gray-50', 'font-sans')
  }
};
</script>