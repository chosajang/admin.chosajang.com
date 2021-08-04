<template>
  <component v-bind:is="layout">
    <transition name="page" mode="out-in">
      <slot></slot>
    </transition>
  </component>
</template>

<script>
import { computed } from '@vue/composition-api'
import BlankLayout from './BlankLayout.vue'
import AdminLayout from './AdminLayout.vue'

export default {
  name: 'Layout',
  components: {
    AdminLayout,
    BlankLayout
  },
  setup (props, {root}) {
    const layout = computed(() => root.$route.meta.layout || 'BlankLayout');
    return {
      layout
    };
  },
  metaInfo: {
    title: '블로그 관리자',
    titleTemplate: '%s',
    // meta: [
    //   {
    //     'http-equiv': 'Content-Security-Policy',
    //     content: 'upgrade-insecure-requests'
    //   }
    // ]
  },
};
</script>
