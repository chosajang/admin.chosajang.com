<template>
  <main class="md:ml-52">
    <div class="container max-w-screen-lg m-auto">

      <!-- Breadcrumb : ST -->
      <!-- <div class="mb-4">
        <nav aria-label="breadcrumb"> 
          <ol class="breadcrumb flex text-sm">
            <li class="breadcrumb-item text-gray-600"><router-link to="/users" class="font-medium text-blue-500 hover:underline mx-2">계정 관리</router-link></li>
            <li><i class="fas fa-chevron-right text-gray-300"></i></li>
            <li class="breadcrumb-item active font-medium text-gray-600">
              <router-link to="/users" class="font-medium text-blue-500 hover:underline mx-2">목록</router-link>
            </li> 
            <li><i class="fas fa-chevron-right text-gray-300"></i></li>
            <li class="breadcrumb-item active font-medium text-gray-600 mx-2" aria-current="page">조회</li> 
          </ol>
        </nav>
      </div> -->
      <!-- Breadcrumb : ED -->

      <!-- Page Title -->
        <div class="border-b my-4 pl-2"><p class="text-2xl font-bold">계정 정보 조회</p></div>
        
        <!--// Card : ST -->
        <div class="my-4">
          <div class="flex flex-col rounded bg-white shadow-sm">

            <div class="flex flex-row grid grid-cols-6 m-4 items-baseline">
              <div class="col-span-6 text-lg font-bold">{{userInfo.name}} 정보</div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 items-center justify-center m-4">
              <div class="md:col-start-2 md:col-span-2">
                <img id="profile_image" class="w-32 h-32 rounded-full mx-auto" :src="userInfo.profile_image_url" onerror="this.src='/assets/images/user.png'" alt="profile image url">
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 items-center justify-center m-4">
              <div class="md:col-start-2 md:col-span-2">
                <label class="block text-sm text-gray-00" for="cus_name">아이디</label>
                <p class="px-2 py-1 text-lg">{{userInfo.id}}</p>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-4 items-center justify-center m-4">
              <div class="md:col-start-2 md:col-span-2">
                <label class="block text-sm text-gray-00" for="cus_name">이름</label>
                <p class="px-2 py-1 text-lg">{{userInfo.name}}</p>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-4 items-center justify-center m-4">
              <div class="md:col-start-2 md:col-span-2">
                <label class="block text-sm text-gray-00" for="cus_name">이메일</label>
                <p class="px-2 py-1 text-lg">{{userInfo.email}}</p>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-4 items-center justify-center m-4">
              <div class="md:col-start-2 md:col-span-2">
                <label class="block text-sm text-gray-00" for="cus_name">연락처</label>
                <p class="px-2 py-1 text-lg">{{userInfo.tel}}</p>
              </div>
            </div>

            <div class="grid grid-cols-8 m-4">
              <div class="col-span-1 md:col-start-3 md:col-span-1">
                <!-- <input type="button" v-on:click="removeRole" class="rounded bg-red-500 py-1 px-6 cursor-pointer text-white w-26 hover:bg-red-600" value="연결해제"/> -->
              </div>
              <div class="col-span-7 md:col-span-3 grid items-center justify-items-end">
                <div>
                  <input type="button" v-on:click="userList" class="rounded bg-gray-500 py-1 px-6 cursor-pointer text-white w-20 hover:bg-gray-600" value="목록"/>
                </div>
              </div>
            </div>
            
          </div>
        </div><!--// Card : ED -->
      
    </div>
  </main>
</template>

<script>
import { apiUserInfo } from '@/api'

export default {
  name: 'userRead',
  data(){
    return {
      user_seq: this.$route.params.user_seq,
      userInfo: [],
      selectCompanyStatus: 1,
      btnStatusApply:{
        style: {
          'opacity-50': true,
          'hover:bg-green-600': false,
          'cursor-pointer': false
        },
        disabled: true,
        name: '적용완료'
      }
    }
  },
  methods: {
    
    userList() {
      this.$router.push({ path: '/users' })
    },

  },
  created() {

    // 본인이 조회하는 경우, 수정화면으로 바로 이동
    if( this.$store.getters.getUserInfo.userInfo.user_seq == parseInt(this.user_seq) ) {
      this.$router.push({ path: `/users/update/${this.user_seq}`})
    }

    apiUserInfo(this.user_seq)
    .then(res => {
      if( res.status == 200 ) {
        const apiData = res.data
        this.userInfo = apiData.data
      } else {
        this.$swal({
          title: '정보 없음',
          html: '요청한 회원정보가 존재하지 않습니다<br/>목록으로 돌아갑니다',
          icon: 'error'
        }).then(() => {
          this.$router.push({ path: '/users' })
        })
      }
    })
  }
}
</script>
