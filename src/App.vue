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
    }
  },
  created() {
    bus.$on('start:spinner', this.startSpinner)
    bus.$on('end:spinner', this.stopSpinner)
  },
  beforeDestroy() {
    bus.$off('start:spinner', this.startSpinner)
    bus.$off('end:spinner', this.stopSpinner)
  }
};
</script>