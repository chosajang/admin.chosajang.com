<template>
  <main class="md:ml-52">
    <div class="container max-w-screen-lg m-auto p-4 md:p-6">

      <!-- Breadcrumb : ST -->
      <div class="mb-4">
        <nav aria-label="breadcrumb"> 
          <ol class="breadcrumb flex text-sm">
            <li class="breadcrumb-item text-gray-600"><router-link to="/company" class="text-gray-600 hover:text-blue-700 mx-2">기업 관리</router-link></li>
            <li><i class="fas fa-chevron-right text-gray-300"></i></li>
            <li class="breadcrumb-item active text-blue-700 hover:text-blue-700 mx-2" aria-current="page">기업 정보 조회</li> 
          </ol>
        </nav>
      </div><!-- Breadcrumb : ED -->

      <!-- Page Title -->
      <div class="border-b mb-4"><p class="text-2xl font-bold">기업 정보 조회</p></div>
      
      <!--// Card : ST -->
      <div class="my-4">
        <div class="grid grid-cols-12 gap-4"><!--// Card Col : ST -->

          <!--// Form : ST -->
          <div class="col-span-12">
            <div class="flex flex-col rounded min-w-full bg-white shadow-sm">
              
              <div class="flex flex-row grid grid-cols-6 m-4 items-baseline">
                <div class="col-span-6 text-lg font-bold">
                  기업 정보
                </div>
                <!-- <div class="grid col-span-3 text-sm justify-items-end leading-6">
                  <button class="rounded flex shadow bg-blue-500 px-6 py-1 text-white hover:bg-blue-600" onclick="location.href='./create.html'" >관리자 등록</button>
                </div> -->
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-4 items-center justify-center m-4">
                <div class="md:col-start-2 md:col-span-2">
                  <label class="block text-sm text-gray-00" for="cus_name">기업명</label>
                  <input class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" id="cus_name" name="cus_name" type="text" required="true" value="구글" aria-label="Name" readonly>
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-4 items-center justify-center m-4">
                <div class="md:col-start-2 md:col-span-2">
                  <label class="block text-sm text-gray-00" for="cus_name">기업 아이디</label>
                  <input class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded " id="cus_name" name="cus_name" type="text" required="true" value="google" aria-label="Name" readonly>
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-4 items-center justify-center m-4">
                <div class="md:col-start-2 md:col-span-2">
                  <label class="block text-sm text-gray-00" for="cus_name">사업자 번호</label>
                  <input class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" id="cus_name" name="cus_name" type="text" required="true" value="00-0000-0000" aria-label="Name" readonly>
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-4 items-center justify-center m-4">
                <div class="md:col-start-2 md:col-span-2">
                  <label class="block text-sm text-gray-00" for="cus_name">기업 상태</label>
                  <div class="grid grid-cols-6">
                    <div class="col-span-4">
                      <select class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded h-8" id="company-status" name="cus_name" aria-label="Name">
                        <option>승인대기</option>
                        <option>승인보류</option>
                        <option>승인</option>
                        <option>운영중지</option>
                      </select>
                    </div>
                    <div class="col-span-2 grid items-center justify-items-end">
                      <input type="button" id="btn-apply" class="rounded bg-green-500 py-1 px-6 cursor-pointer text-white w-26 ml-2 hover:bg-green-600" value="적용"/>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex flex-row grid grid-cols-6 m-4 items-baseline">
                <div class="col-span-6 text-lg font-bold">
                  기업 관리자 계정 정보
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-4 items-center justify-center m-4">
                <div class="md:col-start-2 md:col-span-2">
                  <label class="block text-sm text-gray-00" for="cus_name">아이디</label>
                  <input class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" id="cus_name" name="cus_name" type="text" required="true" value="google-ceo" aria-label="Name" readonly>
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-4 items-center justify-center m-4">
                <div class="md:col-start-2 md:col-span-2">
                  <label class="block text-sm text-gray-00" for="cus_name">이름</label>
                  <input class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded " id="cus_name" name="cus_name" type="text" required="true" value="선다 피차이" aria-label="Name" readonly>
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-4 items-center justify-center m-4">
                <div class="md:col-start-2 md:col-span-2">
                  <label class="block text-sm text-gray-00" for="cus_name">이메일</label>
                  <input class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" id="cus_name" name="cus_name" type="text" required="true" value="ceo@google.com" aria-label="Name" readonly>
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-4 items-center justify-center m-4">
                <div class="md:col-start-2 md:col-span-2">
                  <label class="block text-sm text-gray-00" for="cus_name">연락처</label>
                  <input class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" id="cus_name" name="cus_name" type="text" required="true" value="000-0000-0000" aria-label="Name" readonly>
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-4 items-center justify-items-end m-4">
                <div class="md:col-start-2 md:col-span-2">
                  <input type="button" v-on:click="companyList" class="rounded bg-gray-500 py-1 px-6 cursor-pointer text-white w-20 ml-2 hover:bg-gray-600" value="목록"/>
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
    
    companyList() {
      this.$router.back()
    }

  }
}
</script>
