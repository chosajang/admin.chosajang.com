<template>
  <div>
    <admin-header></admin-header>
    <main class="w-full">
      <sidebar></sidebar>
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
    this.userInfo = this.$store.getters.getUserInfo
    let jwtPayLoad = this.$jwtDec.decode( this.userInfo.access_token )
    console.log('decodeValue => ', jwtPayLoad)
  },
  mounted() {
    document.body.classList.add('bg-gray-50', 'font-sans')
  },
  destroyed() {
    document.body.classList.remove('bg-gray-50', 'font-sans')
  }
};
</script>