<template>
  <div v-show="isSidebarObj" class="shadow-md hidden bg-gray-700 text-gray-200 text-sm items-center md:block left-0 fixed top-16 bottom-0 overflow-y-auto flex-row flex-no-wrap overflow-hidden w-52 z-10">
    <!--// Profile Info -->
    <div class="hidden md:flex flex-row items-center py-2 bg-gray-900">
      <div class="flex-none w-14 h-14 ml-2"><img src="/assets/images/user.png" onerror='this.src="/assets/images/user.png"' alt="profile" /></div>
      <div class="flex-col space-y-1 pl-2 w-full h-14 justify-content items-center">
        <div class="mt-2 whitespace-nowrap text-sm">사용자 이름</div>
        <div class="text-xs whitespace-nowrap">솔루션 관리자</div>
      </div>
    </div>
    <!--// Left Menu : ST -->
    <ul class="select-none" id="menu-ext">
      <li class="pt-4 py-2 pl-4"><p class="text-xs font-bold text-gray-300">기본 메뉴</p></li>
      <a href="#"><li class="py-3 pl-4 cursor-pointer hover:bg-gray-600 border-l-4 border-transparent hover:border-blue-500"><i class="fas fa-columns mr-4"></i>대시보드</li></a>
      <a href="#"><li class="py-3 pl-4 cursor-pointer hover:bg-gray-600 border-l-4 border-transparent hover:border-blue-500"><i class="far fa-building mr-4"></i>기업 관리</li></a>
      <a href="#"><li class="py-3 pl-4 cursor-pointer hover:bg-gray-600 border-l-4 border-transparent hover:border-blue-500"><i class="fas fa-users-cog mr-4"></i>관리자 계정 관리</li></a>
    </ul>
    <!--// Left Menu : ED -->
  </div>
</template>

<script>

export default {
  props: ['isSidebar'],
  data() {
    return {
      isSidebarObj: this.isSidebar,
      isSidebarException: false
    }
  },
  created() {
    // console.log( 'created', this.isSidebarObj );
    window.addEventListener('resize', this.handleResize);
  },
  destroyed() {
    document.body.classList.remove('bg-gray-50', 'font-sans')
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    sideBarToggle() {
      console.log('toggle')
    },
    handleResize(event) { 
      this.width = window.innerWidth
      if( this.width >= 768 ) { 
        this.isSidebarObj = true
      } else {
        this.isSidebarObj = false
      }

      console.log( this.width, this.isSidebarObj )
    }
  }
};
</script>