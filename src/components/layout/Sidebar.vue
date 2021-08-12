<template>
  <aside v-show="isSidebar" v-click-outside="sideBarClose" class="shadow-md bg-gray-700 text-gray-200 text-sm items-center md:block left-0 fixed top-12 bottom-0 overflow-y-auto flex-row flex-no-wrap overflow-hidden w-52 z-10">
    <!--// Profile Info -->
    <div class="hidden md:flex flex-row items-center py-2 bg-gray-900">
      <div class="flex-none w-14 h-14 ml-2"><img :src="userInfo.profile_image_url" onerror='this.src="/assets/images/user.png"' alt="profile" /></div>
      <div class="flex-col space-y-1 pl-2 w-full h-14 justify-content items-center">
        <div class="mt-2 whitespace-nowrap text-sm">{{ userInfo.name }}</div>
        <div class="text-xs whitespace-nowrap">{{ userInfo.nickname }}</div>
      </div>
    </div>
    <!--// Left Menu : ST -->
    <ul class="select-none" id="menu-ext">
      <li class="pt-4 py-2 pl-4"><p class="text-xs font-bold text-gray-300">기본 메뉴</p></li>
      <router-link to="/dashboard"><li :class="menu.dashboard.style" class="py-3 pl-4 cursor-pointer hover:bg-gray-600 border-l-4 border-transparent hover:border-blue-500"><i class="fas fa-columns mr-4"></i>대시보드</li></router-link>
      <router-link to="/users"><li :class="menu.users.style" class="py-3 pl-4 cursor-pointer hover:bg-gray-600 border-l-4 border-transparent hover:border-blue-500"><i class="fas fa-users-cog mr-4"></i>계정 관리</li></router-link>
      <router-link to="/articles"><li :class="menu.articles.style" class="py-3 pl-4 cursor-pointer hover:bg-gray-600 border-l-4 border-transparent hover:border-blue-500"><i class="fas fa-feather-alt mr-4"></i>게시물 관리</li></router-link>
    </ul>
    <!--// Left Menu : ED -->
  </aside>
</template>

<script>
export default {
  data() {
    return {
      isSidebar: true,
      isSidebarException: false,
      userInfo: this.$parent.userInfo,
      menu: {
        dashboard: {
          style: {
            'border-blue-500': false,
            'bg-gray-600': false
          }
        },
        users: {
          style: {
            'border-blue-500': false,
            'bg-gray-600': false
          }
        },
        articles: {
          style: {
            'border-blue-500': false,
            'bg-gray-600': false
          }
        }
      }
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)

    this.handleResize()
    
    this.$EventBus.$on('sideBarToggle', () => {
      this.sideBarToggle()
    })

    this.$EventBus.$on('btnSideBarOutSide', () => {
      this.isSidebarException = false
    })
  },
  mounted() {
    this.menuFocus()
  },
  destroyed() {
    document.body.classList.remove('bg-gray-50', 'font-sans')
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    sideBarToggle() {
      this.isSidebar = !this.isSidebar
      this.isSidebarException = true
    },
    sideBarClose() {
      if( this.isSidebarException == false && !this.standardSizeCheck() ) {
        this.isSidebar = false
      }
    },
    standardSizeCheck() {
      let result = true
      if( window.innerWidth < 768 ) {
        result = false
      }
      return result
    },
    handleResize() { 
      if( window.innerWidth >= 768 ) { 
        this.isSidebar = true
      } else {
        this.isSidebar = false
      }
    },

    /**
     * 사이드바 메뉴 포커스 인/아웃
     */
    menuFocus() {
      const to = this.$route
      const uri = to.path.split('/')
      const menuList = Object.keys( this.menu )
      menuList.forEach((item) => {

        let menuObj = new Object( this.menu[`${item}`] )
        if( item == uri[1] ) {
          /**
           * 하위 메뉴 확인
           * - 있는 경우,
           *   > 상위 메뉴 : 열린 스타일 적용
           *   > 하위 메뉴 : 포커스 스타일 적용
           * - 없는 경우,
           *   > 상위 메뉴 : 포커스 스타일 적용
           */
          if( Object.prototype.hasOwnProperty.call(menuObj, 'subMenu') ) {
            menuObj.style = {
              'hidden': false,
            }
            menuObj.parent.style = {
              'rotate-90': true,
            }
            const subMenuList = Object.keys( menuObj.subMenu )
            subMenuList.forEach( (subItem) => {
              if( subItem == uri[2] ){
                menuObj.subMenu[`${subItem}`].style = {
                  'bg-blue-500': true
                }
              } else {
                menuObj.subMenu[`${subItem}`].style = {
                  'bg-blue-500': false
                }
              }
            })
          } else {
            menuObj.style = {
              'border-blue-500' : true,
              'bg-gray-600' : true
            }
          }
        } else {
          if( Object.prototype.hasOwnProperty.call(menuObj, 'subMenu') ) {
            menuObj.style = {
              'hidden': true,
            }
            menuObj.parent.style = {
              'rotate-90': false,
            }
            const subMenuList = Object.keys( menuObj.subMenu )
            subMenuList.forEach( (subItem) => {
              menuObj.subMenu[`${subItem}`].style = {
                'bg-blue-500': false
              }
            })
          } else {
            menuObj.style = {
              'border-blue-500' : false,
              'bg-gray-600' : false
            }
          }
        }
      })

    },

  }
};
</script>