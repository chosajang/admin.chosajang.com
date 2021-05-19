<template>
  <main class="md:ml-52">
    <div class="container max-w-screen-lg m-auto p-4 md:p-6">

      <!-- Breadcrumb : ST -->
      <div class="mb-4">
        <nav aria-label="breadcrumb"> 
          <ol class="breadcrumb flex text-sm">
            <li class="breadcrumb-item text-gray-600"><router-link to="/company" class="text-gray-600 hover:text-blue-700 mx-2">기업 관리</router-link></li>
            <li><i class="fas fa-chevron-right text-gray-300"></i></li>
            <li class="breadcrumb-item active text-blue-700 hover:text-blue-700 mx-2" aria-current="page">관리자 정보 조회</li> 
          </ol>
        </nav>
      </div><!-- Breadcrumb : ED -->

      <!-- Page Title -->
        <div class="border-b mb-4"><p class="text-2xl font-bold">관리자 정보 조회</p></div>
        
        <!--// Card : ST -->
        <div class="my-4">
          <div class="flex flex-col rounded bg-white shadow-sm">

            <div class="flex flex-row grid grid-cols-6 m-4 items-baseline">
              <div class="col-span-6 text-lg font-bold">{관리자 이름} 정보</div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 items-center justify-center m-4">
              <div class="md:col-start-2 md:col-span-2">
                <img id="profile_image" class="w-32 h-32 rounded-full mx-auto" src="https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp" alt="John Doe">
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 items-center justify-center m-4">
              <div class="md:col-start-2 md:col-span-2">
                <label class="block text-sm text-gray-00" for="cus_name">아이디</label>
                <p class="px-2 py-1 text-lg">Drizzt Do'Urden</p>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-4 items-center justify-center m-4">
              <div class="md:col-start-2 md:col-span-2">
                <label class="block text-sm text-gray-00" for="cus_name">이름</label>
                <p class="px-2 py-1 text-lg">드리즈트 두어덴</p>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-4 items-center justify-center m-4">
              <div class="md:col-start-2 md:col-span-2">
                <label class="block text-sm text-gray-00" for="cus_name">이메일</label>
                <p class="px-2 py-1 text-lg">test@test.com</p>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-4 items-center justify-center m-4">
              <div class="md:col-start-2 md:col-span-2">
                <label class="block text-sm text-gray-00" for="cus_name">연락처</label>
                <p class="px-2 py-1 text-lg">010-0000-0000</p>
              </div>
            </div>

            <div class="grid grid-cols-8 m-4">
              <div class="col-span-1 md:col-start-3 md:col-span-1">
                <input type="button" v-on:click="removeRole" class="rounded bg-red-500 py-1 px-6 cursor-pointer text-white w-26 hover:bg-red-600" value="연결해제"/>
              </div>
              <div class="col-span-7 md:col-span-3 grid items-center justify-items-end">
                <div>
                  <input type="button" v-on:click="adminList" class="rounded bg-gray-500 py-1 px-6 cursor-pointer text-white w-20 hover:bg-gray-600" value="목록"/>
                  <input type="button" v-on:click="adminModify" class="rounded bg-blue-500 py-1 px-6 cursor-pointer text-white w-26 ml-2 hover:bg-blue-600" value="수정하기"/>
                </div>
              </div>
            </div>
            
          </div>
        </div><!--// Card : ED -->
      
    </div>
  </main>
</template>

<script>
export default {
  name: 'companyCreate',
  data(){
    return {
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
    
    adminList() {
      this.$router.push({ path: '/admin' })
    },

    removeRole() {
      this.$swal({
        title: '관리자 역할 연결해제',
        html: '솔루션 관리자 역할을 해제 하시겠습니까?<p class="text-base text-red-500">*해제되면 관리자 목록에서도 사라집니다</p>',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: `네, 해제합니다`,
        confirmButtonColor: '#FF0000',
        cancelButtonText: `아니오`,
        reverseButtons: true
      }).then((result) => {
        if( result.isConfirmed ) {
          /**
           * todo : 기업 수정 API 호출
           */
          this.$swal('해제되었습니다','','success')
          this.$router.push({ path: '/admin' });
        }
      })
    },

    adminModify() {
      this.$router.push({ path: '/admin/modify/1' })
    }

  }
}
</script>
