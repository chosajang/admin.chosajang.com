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
import { apiTokenRefresh } from '@/api'
import bus from '@/utils/bus.js'

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
       * 오차시간 감안하여, 190초 남았을때 토큰 갱신 알림 및 인터벌 종료
       * - 사용자 안내 시간 : 180초
       */
      if( remainingTime <= 190 ) {
        clearInterval(this.jwtExpChecker)
        /**
         * 토큰유효시간이 만료된 경우, vuex와 localStorage의 회원정보를 삭제한다
         */
        if( remainingTime < 0 ) {
          this.$store.commit('SET_USERINFO', '')
          localStorage.removeItem('userInfo')
        }
        /**
         * 토큰유효시간 종료 안내 알림 창
         */
        this.tokenRefresh()
      }
      // console.log('남은 시간 : ', remainingTime , '초' )
    },

    /**
     * 토큰갱신 안내
     */
    tokenRefresh() {
      let timerInterval
      this.$swal.fire({
        title: '토큰유효시간 종료안내',
        html: '토큰유효시간을 연장하시겠습니까?<br/>미연장시 유효시간 만료 후 자동 로그아웃됩니다.<br/>(<b class="text-red-500"></b>초 남음)',
        timer: 180000,
        timerProgressBar: true,
        showCancelButton: true,
        confirmButtonText: `네, 연장합니다`,
        cancelButtonText: `아니오`,
        reverseButtons: true,
        didOpen: () => {
          timerInterval = setInterval(() => {
            const content = this.$swal.getHtmlContainer()
            if (content) {
              const b = content.querySelector('b')
              if (b) {
                b.textContent = parseInt(this.$swal.getTimerLeft() / 1000)
              }
            }
          }, 100)
        },
        willClose: () => {
          console.log('willClose')
          clearInterval(timerInterval)
        }
      }).then((result) => {
        if (result.isConfirmed) {
          /**
           * 토큰갱신 API 호출
           */
          apiTokenRefresh()
          .then(res => {
            // 토큰갱신 완료 시, 정보 갱신
            const apiData = res.data
            this.$store.commit('SET_USERINFO', apiData)
            // jwt.PayLoad 갱신
            this.jwtPayLoad = this.$jwtDec.decode(apiData.access_token)
            this.jwtExpChecker = setInterval( this.jwtTimeChecker, 60000 )
            // 완료 안내
            this.$swal({
              title: '갱신완료',
              text: '토큰 유효시간 갱신이 완료 되었습니다',
              icon: 'success'
            })
          })
        } else {
          if( result.dismiss == 'timer' ) {
            bus.$emit('forceAlert', process.env.VUE_APP_AUTH_FAILURE)
          }
        }
      })
    }// EOF   tokenRefresh()

  },

  created() {
    this.userInfo = this.$store.getters.getUserInfo.userInfo
  },

  mounted() {
    document.body.classList.add('bg-gray-50', 'font-sans')

    const access_token = this.$store.getters.getUserInfo.access_token
    this.jwtPayLoad = this.$jwtDec.decode(access_token)
    // 1분마다 동작
    this.jwtExpChecker = setInterval( this.jwtTimeChecker, 60000 )
  },

  updated() {
    this.$refs.sidebar.menuFocus()
  },

  destroyed() {
    document.body.classList.remove('bg-gray-50', 'font-sans')
  }

};
</script>