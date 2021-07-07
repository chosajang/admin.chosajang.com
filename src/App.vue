<template>
  <layout id="app">
    <router-view></router-view>
  </layout>
</template>

<script>
import Layout from '@/layouts/Layout.vue'
import bus from './utils/bus'

export default {
  name: 'App',
  components: { Layout },
  methods: {
    startSpinner() {
      this.$swal({
        text: 'Loading...',
        width: 180,
        allowEscapeKey: false,
        allowOutsideClick: false,
        backdrop: 'rgba(0,0,0,0.1)',
        didOpen: () => {
          this.$swal.showLoading()
        }
      })
    },

    stopSpinner() {
      this.$swal.close()
    },

    forceLogout() {
      this.$swal({
        title: '인증실패',
        html: 'API 인증키가 만료되었거나 유효하지 않습니다.<br/>자동로그아웃 되니 다시 로그인하여 사용해주세요'
      })
      .then(() => {
        this.$store.commit('SET_USERINFO', '')
        this.$router.push({ path: '/login' })
      })
    },
  },
  created() {
    bus.$on('start:spinner', this.startSpinner)
    bus.$on('end:spinner', this.stopSpinner)
    bus.$on('forceLogout', this.forceLogout)
  },
  beforeDestroy() {
    bus.$off('start:spinner', this.startSpinner)
    bus.$off('end:spinner', this.stopSpinner)
    bus.$off('forceLogout', this.forceLogout)
  }
};
</script>