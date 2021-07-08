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
            <li class="breadcrumb-item active font-medium text-gray-600 mx-2" aria-current="page">글쓰기</li> 
          </ol>
        </nav>
      </div><!-- Breadcrumb : ED -->

      <!-- Page Title -->
      <div class="border-b mb-4"><p class="text-2xl font-bold">글쓰기</p></div>
      
      <!--// Card : ST -->
      <div class="my-4">
        <div class="grid grid-cols-12 gap-4"><!--// Card Col : ST -->

          <!--// Form : ST -->
          <div class="col-span-12">
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
                  <label class="block text-sm text-gray-00" for="cus_name">아이디</label>
                  <input class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" type="text" required="true" placeholder="아이디" aria-label="Name">
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-4 items-center justify-items-end m-4">
                <div class="md:col-start-2 md:col-span-2">
                  <input type="button" v-on:click="createCancel" class="rounded bg-gray-500 py-1 px-6 cursor-pointer text-white w-20 ml-2 hover:bg-gray-600" value="취소"/>
                  <input type="button" v-on:click="createApply" class="rounded bg-blue-500 py-1 px-6 cursor-pointer text-white w-26 ml-2 hover:bg-blue-600" value="수정"/>
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
  name: 'userUpdate',
  data() {
    return {
      user_seq: this.$route.params.user_seq,
      userInfo: [],
    }
  },
  methods: {
    createCancel () {

    },

    createApply () {
      
    }
  },
  created() {
    
  }
}
</script>
