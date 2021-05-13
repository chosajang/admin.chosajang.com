<template>
  <main class="w-full">
    <!-- Container -->
    <div class="container md:w-4/6 mx-auto">
      <div class="flex justify-center px-6 my-12">
        <!-- Row -->
        <div class="w-full flex">
          <!-- Col -->
          <div class="w-full h-auto bg-gray-400 hidden md:block md:w-1/2 bg-cover rounded-l-lg" style="background-image: url('/assets/images/solution-login-02.jpg')"></div>
          <!-- Col -->
          <div class="w-full md:w-1/2 bg-white p-5 rounded-lg md:rounded-l-none">
            <h3 class="pt-4 text-2xl text-center">AI채용 솔루션 관리자</h3>
              <form class="px-8 pt-6 pb-8 mb-4 bg-white rounded" action="./index.html" method="get">
              <div class="mb-4">
                <label class="block mb-2 text-sm font-bold text-gray-700" for="id">아이디</label>
                <input class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-green-700" id="id" type="text" placeholder="아이디" />
              </div>

              <div class="mb-4">
                <label class="block mb-2 text-sm font-bold text-gray-700" for="password">비밀번호</label>
                <input class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-green-700" id="password" type="password" placeholder="********" />
                <!-- <p class="text-xs italic text-red-500"></p> -->
              </div>

              <div class="mb-4">
                <input class="mr-2 leading-tight" type="checkbox" id="checkbox_id" />
                <label class="text-sm" for="checkbox_id">아이디 기억하기</label>
              </div>

              <div class="mb-6 text-center">
                <button class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="button" v-on:click="login">로그인</button>
              </div>

              <hr class="mb-6 border-t" />

              <div class="text-center hidden">
                <a class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800" href="#">비밀번호를 잃어버리셨나요?</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div><!-- Container : ED -->
  </main>
</template>

<script>
export default {
  methods: {
    login() {

      this.$swal({
        title: '로그인',
        text: '프로세스 미개발상태로 바로 메인페이지로 이동합니다',
        icon: 'success'
      }).then(() => {
        this.$router.push({ path: '/dashboard' });
      })
      
    }
  },
  mounted() {
    document.getElementById('app').classList.add('h-screen', 'overflow-hidden', 'flex', 'items-center', 'justify-center', 'font-sans', 'bg-gray-900')
  },
  destroyed() {
    document.getElementById('app').classList.remove('h-screen', 'overflow-hidden', 'flex', 'items-center', 'justify-center', 'font-sans', 'bg-gray-900')
  }
}
</script>