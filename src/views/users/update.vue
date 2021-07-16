<template>
  <main class="md:ml-52">
    <div class="container max-w-screen-lg m-auto p-4 md:p-6">

      <!-- Breadcrumb : ST -->
      <div class="mb-4">
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
      </div><!-- Breadcrumb : ED -->

      <!-- Page Title -->
      <div class="border-b mb-4"><p class="text-2xl font-bold">계정 정보 수정</p></div>
      
      <!--// Card : ST -->
      <div class="my-4">
        <div class="grid grid-cols-12 gap-4"><!--// Card Col : ST -->

          <!--// Form : ST -->
          <div class="col-span-12">
            <div class="flex flex-col rounded min-w-full bg-white shadow-sm">
              <!--// Form Title : ST -->
              <div class="flex flex-row grid grid-cols-6 m-4 items-baseline">
                <div class="col-span-6 text-lg font-bold">
                  프로필 이미지
                </div>
              </div>
              <!--// Form Title : ED -->

              <!--// Form Body : ST -->
              <div class="grid grid-cols-1 md:grid-cols-4 items-center justify-center m-4 pb-4">
                <div class="md:col-start-2 md:col-span-2">
                  <div class="mx-auto w-32 h-32 cursor-pointer relative">
                    <img ref="profile_img" class="absolute inset-0 z-0 rounded-full w-32 h-32 object-none object-center object-scale-down" :src="userInfo.profile_image_url" onerror="this.src='/assets/images/user.png'" alt="profile image url">
                    <div @click="fileClick" class="opacity-0 hover:opacity-90 bg-gray-400 duration-200 absolute inset-0 z-10 flex justify-center items-center text-2xl text-white rounded-full">
                      <i class="fas fa-camera"></i>
                    </div>
                    <input @change="fileUpload" type="file" accept="image/gif, image/jpeg, image/png" class="hidden" ref="fileInput">
                  </div>
                  <div class="mx-auto w-60 mt-4">
                    <p class="text-xs text-gray-400 text-center">정사각형 비율의 이미지를 올려주세요</p></div>
                </div>
              </div>
              <!--// Form Body : ED -->
            </div>

            <div class="flex flex-col rounded min-w-full bg-white shadow-sm mt-4">
              <!--// Form Title : ST -->
              <div class="flex flex-row grid grid-cols-6 m-4 items-baseline">
                <div class="col-span-6 text-lg font-bold">
                  계정 정보
                </div>
              </div>
              <!--// Form Title : ED -->

              <!--// Form Body : ST -->
              <div class="grid grid-cols-1 md:grid-cols-4 items-center justify-center m-4">
                <div class="md:col-start-2 md:col-span-2">
                  <label class="block text-sm text-gray-800" for="cus_name">아이디</label>
                  <input v-model="userInfo.id" class="w-full px-5 py-1 mt-1 text-lg text-gray-700 rounded outline-none cursor-not-allowed" type="text" required="true" placeholder="아이디" aria-label="Name" readonly>
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-4 items-center justify-center m-4">
                <div class="md:col-start-2 md:col-span-2">
                  <label class="block text-sm text-gray-800" for="cus_name">이름</label>
                  <input v-model="userInfo.name" class="w-full px-5 py-1 mt-1 text-lg text-gray-700 rounded outline-none border-transparent border-2 hover:bg-gray-200 focus:border-blue-400 focus:bg-white duration-200" type="text" required="true" placeholder="이름" aria-label="Name">
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-4 items-center justify-center m-4">
                <div class="md:col-start-2 md:col-span-2">
                  <label class="block text-sm text-gray-800" for="cus_name">닉네임</label>
                  <input v-model="userInfo.nickname" class="w-full px-5 py-1 mt-1 text-lg text-gray-700 rounded outline-none border-transparent border-2 hover:bg-gray-200 focus:border-blue-400 focus:bg-white duration-200" type="text" required="true" placeholder="닉네임" aria-label="NickName">
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-4 items-center justify-center m-4">
                <div class="md:col-start-2 md:col-span-2">
                  <label class="block text-sm text-gray-800" for="cus_name">이메일</label>
                  <input v-model="userInfo.email" class="w-full px-5 py-1 mt-1 text-lg text-gray-700 rounded outline-none border-transparent border-2 hover:bg-gray-200 focus:border-blue-400 focus:bg-white duration-200" type="text" required="true" placeholder="이메일" aria-label="Email">
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-4 items-center justify-center m-4">
                <div class="md:col-start-2 md:col-span-2">
                  <label class="block text-sm text-gray-800" for="cus_name">연락처</label>
                  <input v-model="userInfo.tel" class="w-full px-5 py-1 mt-1 text-lg text-gray-700 rounded outline-none border-transparent border-2 hover:bg-gray-200 focus:border-blue-400 focus:bg-white duration-200" type="text" required="true" placeholder="연락처(000-0000-0000)" aria-label="tel">
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-4 m-4">
                <div class="col-span-4 md:col-start-2 md:col-span-2 grid grid-cols-2">
                  <div>
                    <input type="button" v-on:click="updateApply" class="rounded bg-blue-500 py-1 px-6 cursor-pointer text-white w-26 ml-2 hover:bg-blue-600" value="수정하기"/>
                  </div>
                  <div class="grid items-center justify-items-end">
                    <input type="button" v-on:click="userList" class="rounded bg-gray-500 py-1 px-6 cursor-pointer text-white w-20 hover:bg-gray-600" value="목록"/>
                  </div>
                </div>
              </div>
              <!--// Form Body : ED -->
            </div>

            <div class="flex flex-col rounded min-w-full bg-white shadow-sm mt-4">
              <!--// Form Title : ST -->
              <div class="flex flex-row grid grid-cols-6 m-4 items-baseline">
                <div class="col-span-6 text-lg font-bold">
                  비밀번호 변경
                </div>
              </div>
              <!--// Form Title : ED -->

              <!--// Form Body : ST -->
              <div class="grid grid-cols-1 md:grid-cols-4 items-center justify-center m-4">
                <div class="md:col-start-2 md:col-span-2">
                  <label class="block text-sm text-gray-800" for="cus_name">기존 비밀번호</label>
                  <input v-model="userInfo.password" class="w-full px-5 py-1 mt-1 text-lg text-gray-700 rounded outline-none border-transparent border-2 hover:bg-gray-200 focus:border-blue-400 focus:bg-white duration-200" type="password" required="true" placeholder="기존 비밀번호" aria-label="Password">
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-4 items-center justify-center m-4">
                <div class="md:col-start-2 md:col-span-2">
                  <label class="block text-sm text-gray-800" for="cus_name">새로운 비밀번호</label>
                  <input v-model="userInfo.new_password" class="w-full px-5 py-1 mt-1 text-lg text-gray-700 rounded outline-none border-transparent border-2 hover:bg-gray-200 focus:border-blue-400 focus:bg-white duration-200" type="password" required="true" placeholder="새로운 비밀번호" aria-label="Password">
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-4 items-center justify-center m-4">
                <div class="md:col-start-2 md:col-span-2">
                  <label class="block text-sm text-gray-800" for="cus_name">새로운 비밀번호 확인</label>
                  <input v-model="userInfo.new_password_confirmation" class="w-full px-5 py-1 mt-1 text-lg text-gray-700 rounded outline-none border-transparent border-2 hover:bg-gray-200 focus:border-blue-400 focus:bg-white duration-200" type="password" required="true" placeholder="새로운 비밀번호 확인" aria-label="Password Confirmed">
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-4 m-4">
                <div class="col-span-4 md:col-start-2 md:col-span-2 grid grid-cols-2">
                  <div>
                    <input type="button" v-on:click="updatePasswordApply" class="rounded bg-blue-500 py-1 px-6 cursor-pointer text-white w-26 hover:bg-blue-600" value="비밀번호 수정"/>
                  </div>
                  <div class="grid items-center justify-items-end">
                    <!-- <input type="button" v-on:click="userList" class="rounded bg-gray-500 py-1 px-6 cursor-pointer text-white w-20 hover:bg-gray-600" value="목록"/> -->
                  </div>
                </div>
              </div>
              <!--// Form Body : ED -->
            </div>
          
          </div><!--// Form : ED -->

        </div><!--// Card Col : ED -->
      </div><!--// Card : ED -->

    </div>
  </main>
</template>

<script>
import { apiUserInfo, apiUserProfileImage, apiUserUpdate, apiUserPasswordChange } from '@/api'

export default {
  name: 'userUpdate',
  data() {
    return {
      user_seq: this.$route.params.user_seq,
      userInfo: [],
    }
  },
  methods: {

    updateApply() {
      this.$swal({
        title: '정보 수정',
        text: '회원 정보를 수정하시겠습니까?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: `네, 수정합니다`,
        cancelButtonText: `아니오`,
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {

          const FORMDATA = new FormData()
          FORMDATA.append('name', this.userInfo.name)
          FORMDATA.append('nickname', this.userInfo.nickname)
          FORMDATA.append('email', this.userInfo.email)
          FORMDATA.append('tel', this.userInfo.tel)
          
          apiUserUpdate(FORMDATA)
          .then(() => {
            this.$swal('수정되었습니다', '', 'success')
            .then(() => {
              this.$router.push({ path: `/users/${this.user_seq}` })
            })
          })
          .catch((error) => {
            const errorResponse = error.response
            if( errorResponse.status == 400 ) {
              const errorData = error.response.data.messages

              let validation_message = ''
              if( typeof errorData == "object" ) {
                for ( let item in errorData ) {
                  validation_message += '- ' + item + ' : ' + errorData[item] + '<br/>'
                }
              } else {
                validation_message = errorData
              }
              
              this.$swal({
                title: '유효성 검사 실패', 
                html: validation_message, 
                icon: 'error'
              })
            }
          })
        }
      })
    },

    updatePasswordApply() {
      this.$swal({
        title: '비밀번호 수정',
        text: '회원 비밀번호를 수정하시겠습니까?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: `네, 수정합니다`,
        cancelButtonText: `아니오`,
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {

          const FORMDATA = new FormData()
          FORMDATA.append('origin_password', this.userInfo.password)
          FORMDATA.append('password', this.userInfo.new_password)
          FORMDATA.append('password_confirmation', this.userInfo.new_password_confirmation)

          apiUserPasswordChange(FORMDATA)
          .then(() => {
            this.$swal('수정되었습니다', '', 'success')
            .then(() => {
              this.$router.push({ path: `/users/${this.user_seq}` })
            })
          })
          .catch((error) => {
            const errorResponse = error.response
            if( errorResponse.status == 400 ) {
              const errorData = error.response.data.messages
              
              let validation_message = ''
              if( typeof errorData == "object" ) {
                for ( let item in errorData ) {
                  validation_message += '- ' + item + ' : ' + errorData[item] + '<br/>'
                }
              } else {
                validation_message = errorData
              }
              
              this.$swal({
                title: '유효성 검사 실패', 
                html: validation_message, 
                icon: 'error'
              })
            }
          })

        }
      })
    },

    userList() {
      this.$router.push({ path: '/users' })
    },

    fileClick(){
      const fileInput = this.$refs.fileInput;
      fileInput.click();
    },

    fileUpload(event){
      let file = event.currentTarget.files[0];
      let input = event.currentTarget;
      let reader = new FileReader()
      let self = this
      reader.onload = function (e) {
        self.$refs.profile_img.src = e.target.result
      }
      reader.readAsDataURL(input.files[0])

      apiUserProfileImage(this.user_seq, file)
      .then(res => {
        const apiData = res.data
        // 프로필 이미지 갱신
        this.$store.getters.getUserInfo.userInfo.profile_image_url = apiData.data.file_url
      })
    },

  },
  created() {

    // 본인이 조회하는 경우, 수정화면으로 바로 이동
    if( this.$store.getters.getUserInfo.userInfo.user_seq != parseInt(this.user_seq) ) {
      this.$router.push({ path: `/users/${this.user_seq}`})
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
