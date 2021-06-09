<template>
  <header class="flex flex-none w-full h-16 bg-gray-800 sticky top-0 z-10">
    <!--// mobile menu icon -->
    <div v-on:click="sideBarToggle" v-click-outside="btnSideBarOutSide" class="flex flex-none items-center px-4 bg-gray-800 md:hidden cursor-pointer text-gray-200">
    <i class="fas fa-bars text-2xl"></i>
    </div>
    <!--// logo -->
    <div class="flex flex-grow md:w-64 items-center z-10">
    <router-link to="/dashboard" class="flex m-auto md:ml-3 text-lg text-gray-200 items-center font-semibold tracking-widest uppercase focus:outline-none focus:shadow-outline">
      <img class="w-8 h-8 mr-2" src="/assets/images/elephant.png"/>
      CSJ Admin
    </router-link>
    </div>
    <!--// personal menu -->
    <div class="flex flex-none items-center px-4 z-11">
      <div v-on:click="isPersonalMenu = !isPersonalMenu, isPersonalMenuException = true" v-click-outside="btnPersonalMenuOutSide" class="text-gray-200 cursor-pointer">
        <!-- <i class="fas fa-user text-2xl"></i> -->
        <div class="flex-none w-8 h-8"><img src="/assets/images/user.png" onerror='this.src="/assets/images/user.png"' alt="profile" /></div>
      </div>
      <div v-show="isPersonalMenu" v-click-outside="personalMenuClose" class="fixed top-14 right-2 w-40 rounded-sm bg-white z-20 border border-top-none border-solid border-gray-300">
        <ul class="w-full text-sm select-none">
          <li class="pl-2 py-2 cursor-pointer hover:bg-blue-400 hover:text-white"><i class="fas fa-user-circle"></i> Profile</li>
          <li v-on:click="logout" class="pl-2 py-2 cursor-pointer hover:bg-blue-400 hover:text-white"><i class="fas fa-sign-out-alt"></i> Logout</li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      isPersonalMenu: false,
      isPersonalMenuException: false,
      userInfo: this.$parent.userInfo
    }
  },
  methods: {
    personalMenuClose() {
      if( this.isPersonalMenuException == false ){
        this.isPersonalMenu = false
      }
    },
    btnPersonalMenuOutSide() {
      this.isPersonalMenuException = false
    },
    sideBarToggle() {
      this.$EventBus.$emit('sideBarToggle')
    },
    btnSideBarOutSide() {
      this.$EventBus.$emit('btnSideBarOutSide')
    },
    logout() {
      this.$swal({
        title: '로그아웃',
        text: '로그아웃 하시겠습니까?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: `네, 로그아웃합니다`,
        cancelButtonText: `아니오`,
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.commit('SET_USERINFO', '')
          localStorage.removeItem('userInfo')
          this.$swal('로그아웃되었습니다', '로그인 페이지로 이동합니다', 'success').then(() => {
            this.$router.push({ path: '/login' })
          })
        }
      })
    }
  }
};
</script>