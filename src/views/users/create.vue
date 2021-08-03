<template>
  <main class="md:ml-52">
    <div class="container max-w-screen-lg m-auto p-4 md:p-6">

      <!-- Breadcrumb : ST -->
      <!-- <div class="mb-4">
        <nav aria-label="breadcrumb"> 
          <ol class="breadcrumb flex text-sm">
            <li class="breadcrumb-item text-gray-600"><router-link to="/admin" class="text-gray-600 hover:text-blue-700 mx-2">관리자 관리</router-link></li>
            <li><i class="fas fa-chevron-right text-gray-300"></i></li>
            <li class="breadcrumb-item active text-blue-700 hover:text-blue-700 mx-2" aria-current="page">관리자 등록</li> 
          </ol>
        </nav>
      </div> -->
      <!-- Breadcrumb : ED -->

      <!-- Page Title -->
      <div class="border-b mb-4"><p class="text-2xl font-bold">관리자 등록</p></div>
      
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
                <!-- <div class="grid col-span-3 text-sm justify-items-end leading-6">
                  <button class="rounded flex shadow bg-blue-500 px-6 py-1 text-white hover:bg-blue-600" onclick="location.href='./create.html'" >관리자 등록</button>
                </div> -->
              </div>
              <!--// Form Title : ED -->

              <!--// Form Body : ST -->
              <div class="grid grid-cols-1 md:grid-cols-4 items-center justify-center m-4">
                <div class="md:col-start-2 md:col-span-2">
                  <img id="profile_image" class="w-32 h-32 rounded-full mx-auto cursor-pointer hover:opacity-60" src="https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp" alt="John Doe">
                </div>
              </div>
              <!--// Form Body : ED -->

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
                  <label class="block text-sm text-gray-00" for="cus_name">아이디</label>
                  <input class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" type="text" required="true" placeholder="아이디" aria-label="Name">
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-4 items-center justify-center m-4">
                <div class="md:col-start-2 md:col-span-2">
                  <label class="block text-sm text-gray-00" for="cus_name">이름</label>
                  <input class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded " type="text" required="true" placeholder="이름" aria-label="Name">
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-4 items-center justify-center m-4">
                <div class="md:col-start-2 md:col-span-2">
                  <label class="block text-sm text-gray-00" for="cus_name">비밀번호</label>
                  <input class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" type="password" required="true" placeholder="비밀번호" aria-label="Name">
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-4 items-center justify-center m-4">
                <div class="md:col-start-2 md:col-span-2">
                  <label class="block text-sm text-gray-00" for="cus_name">비밀번호 확인</label>
                  <input class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" type="password" required="true" placeholder="비밀번호 확인" aria-label="Name">
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-4 items-center justify-center m-4">
                <div class="md:col-start-2 md:col-span-2">
                  <label class="block text-sm text-gray-00" for="cus_name">이메일</label>
                  <input class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" type="text" required="true" placeholder="이메일" aria-label="Name">
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-4 items-center justify-center m-4">
                <div class="md:col-start-2 md:col-span-2">
                  <label class="block text-sm text-gray-00" for="cus_name">연락처</label>
                  <input class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" type="text" required="true" placeholder="연락처(000-0000-0000)" aria-label="Name">
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-4 items-center justify-items-end m-4">
                <div class="md:col-start-2 md:col-span-2">
                  <input type="button" v-on:click="createCancel" class="rounded bg-gray-500 py-1 px-6 cursor-pointer text-white w-20 ml-2 hover:bg-gray-600" value="취소"/>
                  <input type="button" v-on:click="createAdmin" class="rounded bg-blue-500 py-1 px-6 cursor-pointer text-white w-26 ml-2 hover:bg-blue-600" value="계정등록"/>
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
export default {
  name: 'companyCreate',
  methods: {

    createCancel() {
      this.$swal({
        title: '등록 취소',
        text: '등록 중인 관리자 정보를 폐기하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: `네, 폐기합니다`,
        confirmButtonColor: '#FF0000',
        cancelButtonText: `아니오`,
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.push({ path: '/admin' });
        }
        
      })
    },

    createAdmin() {
      this.$swal({
        title: '기업 등록',
        text: '기업 및 기업 관리자 계정을 등록하시겠습니까?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: `네, 등록합니다`,
        cancelButtonText: `아니오`,
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          /**
           * todo : 등록 API 호출
           */
          this.$swal('등록되었습니다', '', 'success').then(() => {
            this.$router.push('/admin')
          })
        }
      })
    }

  }
}
</script>
