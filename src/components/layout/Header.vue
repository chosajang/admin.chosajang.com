<template>
  <div class="flex flex-none w-full h-16 bg-gray-800 sticky top-0 z-10">
    <!--// mobile menu icon -->
    <div v-on:click="sideBarToggle" v-click-outside="btnSideBarOutSide" class="flex flex-none items-center px-4 bg-gray-800 md:hidden cursor-pointer text-gray-200">
    <i class="fas fa-bars text-2xl"></i>
    </div>
    <!--// logo -->
    <div class="flex flex-grow md:w-64 items-center z-10">
    <a href="#" class="flex m-auto md:ml-3 text-lg text-gray-200 items-center font-semibold tracking-widest uppercase focus:outline-none focus:shadow-outline">
      <!-- <img class="w-8 h-8 mr-2" src="${adminRoot}assets/images/research.png"/> -->
      AI채용 솔루션 관리자
    </a>
    </div>
    <!--// personal menu -->
    <div class="flex flex-none items-center px-4 z-11">
    <div v-on:click="isPersonalMenu = !isPersonalMenu, isPerosnalMenuException = true" v-click-outside="btnPersonalMenuOutSide" class="mr-4 text-gray-200 cursor-pointer"><i class="fas fa-user text-2xl"></i></div>
    <div v-show="isPersonalMenu" v-click-outside="personalMenuClose" class="fixed top-14 right-2 w-40 rounded-sm bg-white z-20 border border-top-none border-solid border-gray-300">
      <ul class="w-full text-sm select-none">
        <li class="pl-2 py-2 cursor-pointer hover:bg-blue-400 hover:text-white"><i class="fas fa-user-circle"></i> Profile</li>
        <a href="#"><li class="pl-2 py-2 cursor-pointer hover:bg-blue-400 hover:text-white"><i class="fas fa-sign-out-alt"></i> Logout</li></a>
      </ul>
      <ul class="w-full text-sm select-none border-t-2">
        <a href="/"><li class="pl-2 py-2 cursor-pointer hover:bg-blue-400 hover:text-white"><i class="fas fa-door-open"></i> Publish Main</li></a>
      </ul>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      isPersonalMenu: false,
      isPerosnalMenuException: false,
    }
  },
  methods: {
    personalMenuClose(event) {
      if( this.isPerosnalMenuException == false ){
        this.isPersonalMenu = false
      }
    },
    btnPersonalMenuOutSide() {
      this.isPerosnalMenuException = false
    },
    sideBarToggle() {
      this.$EventBus.$emit('sideBarToggle')
    },
    btnSideBarOutSide() {
      this.$EventBus.$emit('btnSideBarOutSide')
    }
  }
};
</script>