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
      userInfo: '',
      jwtPayLoad: '',
      jwtExpChecker: ''
    }
  },
  components: {
    AdminHeader,
    Sidebar
  },

  methods: {

    /**
     * todo : jwt exp를 확인하여, 로그아웃 전에 JWT 토큰 갱신 API를 실행한다
     * - 남은 시간 표시
     */
    jwtTimeChecker() {
      const currentTime = new Date()
      const endTime = new Date(this.jwtPayLoad.exp * 1000)
      const remainingTime = parseInt( (endTime - currentTime) / 1000 )
      /**
       * 오차시간 감안하여, 2분정도 남았을때 토큰 갱신 알림 및 인터별 중지
       */
      if( remainingTime <= 120 ) {
        clearInterval(this.jwtExpChecker)
      }
      console.log('남은 시간 : ', remainingTime , '초' )
    },

  },

  created() {
    this.userInfo = this.$store.getters.getUserInfo.userInfo
    const access_token = this.$store.getters.getUserInfo.access_token
    this.jwtPayLoad = this.$jwtDec.decode(access_token)
  },
  mounted() {
    document.body.classList.add('bg-gray-50', 'font-sans')
    this.jwtExpChecker = setInterval( this.jwtTimeChecker, 5000 ) // 1분에 한번씩
  },
  updated() {
    this.$refs.sidebar.menuFocus()
  },
  destroyed() {
    document.body.classList.remove('bg-gray-50', 'font-sans')
  }
};
</script>