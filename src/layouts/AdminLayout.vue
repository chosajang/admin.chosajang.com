<template>
  <div>
    <admin-header></admin-header>
    <main class="w-full">
      <sidebar ref="sidebar"></sidebar>
      <slot></slot>
    </main>
  </div>
</template>

<script>
import AdminHeader from '../components/layout/Header.vue'
import Sidebar from '../components/layout/Sidebar.vue'

export default {
  name: 'AdminLayout',
  data() {
    return {
      userInfo: ''
    }
  },
  components: {
    AdminHeader,
    Sidebar
  },
  created() {
    this.userInfo = this.$store.getters.getUserInfo.userInfo
  },
  mounted() {
    document.body.classList.add('bg-gray-50', 'font-sans')
  },
  updated() {
    this.$refs.sidebar.menuFocus()
  },
  destroyed() {
    document.body.classList.remove('bg-gray-50', 'font-sans')
  }
};
</script>