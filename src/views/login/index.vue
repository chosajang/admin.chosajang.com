<template>
  <main class="w-full">
    <!-- Container -->
    <div class="container md:w-4/6 mx-auto">
      <div class="flex justify-center px-6 my-12">
        <!-- Row -->
        <div class="w-full flex">
          <!-- Col -->
          <div class="w-full h-auto bg-gray-400 hidden md:block md:w-1/2 bg-cover rounded-l-lg" style="background-image: url('/assets/images/login03.jpg')"></div>
          <!-- Col -->
          <div class="w-full md:w-1/2 bg-white p-5 rounded-lg md:rounded-l-none">
            <h3 class="pt-4 text-2xl text-gray-700 font-bold text-center">관리자 로그인</h3>
              <form class="px-8 pt-6 pb-8 mb-4 bg-white rounded" action="./index.html" method="get">
              <div class="mb-4">
                <label class="block mb-2 text-sm font-bold text-gray-900" for="id">아이디</label>
                <input v-model="loginForm.id.value" v-bind:class="loginForm.id.style" @keyup="idCheck" class="w-full px-3 py-2 text-xl leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="text" placeholder="id" />
                <p class="text-xs italic text-red-500 mt-2 h-2">{{ loginForm.id.errorMessage }}</p>
              </div>

              <div class="mb-4">
                <label class="block mb-2 text-sm font-bold text-gray-700" for="password">비밀번호</label>
                <input v-model="loginForm.password.value" v-bind:class="loginForm.password.style" @keyup="passwordCheck" @keyup.13="login" class="w-full px-3 py-2 text-xl leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-green-700" type="password" placeholder="password" />
                <p class="text-xs italic text-red-500 mt-2 h-2"> {{ loginForm.password.errorMessage }}</p>
              </div>

              <div class="mb-4">
                <input class="mr-2 leading-tight" type="checkbox" id="checkbox_id" v-model="idChecked" />
                <label class="text-sm" for="checkbox_id">아이디 기억하기</label>
              </div>

              <div class="mb-6 text-center">
                <button type="button" v-on:click="login" v-html="btnLogin.value" v-bind:class="btnLogin.style" :disabled="btnLogin.disabled" class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-lg focus:outline-none focus:shadow-outline">로그인</button>
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
import { apiLogin } from '@/api'
import { btnSpinner } from '@/utils/common.js'

export default {
  data() {
    return {
      loginForm: {
        id: {
          value:'',
          style: {
            'focus:border-green-700': true
          },
          errorMessage: ''
        },
        password: {
          value: '',
          errorMessage: ''
        }
      },
      btnLogin: {
        value: '로그인',
        disabled: false,
        style: {
          'hover:bg-blue-700': true
        }
      },
      idChecked: false
    }
  },
  methods: {

    login() {

      if( this.idCheck() && this.passwordCheck() ){
        const btnLoadingStyle = {
          'opacity-80': true,
          'hover:bg-blue-700': false
        }
        btnSpinner(this.btnLogin,true,'로그인중<i class="fas fa-spinner ml-2 animate-spin"></i>', btnLoadingStyle)
        apiLogin(this.loginForm.id.value , this.loginForm.password.value)
        .then(res => {
          const apiData = res.data
          const btnCommonStyle = {
            'opacity-80': false,
            'hover:bg-blue-700': true
          }
          btnSpinner(this.btnLogin,false,'로그인',btnCommonStyle)
          this.$store.commit('SET_USERINFO', apiData)
          this.$swal({
            title: '로그인',
            text: '로그인 되었습니다',
            icon: 'success'
          }).then(() => {
            if( this.idChecked ){
              localStorage.setItem('rememberId', this.loginForm.id.value) 
              localStorage.setItem('idChecked', this.idChecked)
            } else {
              localStorage.removeItem('rememberId')
              localStorage.removeItem('idChecked')
            }
            this.$router.push({ path: '/dashboard' })
          })

        }).catch(err => {
          btnSpinner(this.btnLogin,false,'로그인')
          this.$swal({
            title: '로그인 실패',
            text: err.response.data.error,
            icon: 'error'
          }).then(() => {
            this.loginForm.password.value = ''
          })
        })
      }
      
    },

    idCheck() {
      const id = this.loginForm.id.value
      const kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
      this.loginForm.id.style = {
        'border-green-700' : false,
        'border-red-700' : true,
      }
      let checkResult = false
      if (id.length === 0) { 
        this.loginForm.id.errorMessage = '아이디(ID)를 입력하세요'
      } else if (id.length < 5) {
        this.loginForm.id.errorMessage = '아이디(ID)는 5자 이상이어야 합니다'
      } else if (kor.test(id) === true) {
        this.loginForm.id.errorMessage = '아이디(ID)는 영문자, 숫자, 특수문자(- 또는 _)로 입력해야합니다'
      } else {
        this.loginForm.id.style = {
          'border-green-700' : true,
          'border-red-700' : false,
        }
        this.loginForm.id.errorMessage = ''
        checkResult = true
      }
      return checkResult
    },

    passwordCheck() {
      const password = this.loginForm.password.value
      const num = /[0-9]/g
      const eng = /[a-z]/ig
      const spe = /[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi
      this.loginForm.password.style = {
        'border-green-700' : false,
        'border-red-700' : true,
      }
      let checkResult = false;
      if (password.length === 0) {
        this.loginForm.password.errorMessage = '비밀번호를 입력하세요'
      } else if (password.length < 8 || password.length > 20) {
        this.loginForm.password.errorMessage = '비밀번호 길이는 8~20자 사이입니다'
      } else if (password.search(/\s/) !== -1) {
        this.loginForm.password.errorMessage = '비밀번호는 공백없이 입력해주세요'
      } else if (password.search(num) < 0 || password.search(eng) < 0 || password.search(spe) < 0) {
        this.loginForm.password.errorMessage = '비밀번호는 영문자, 숫자, 특수문자 조합으로 입력해야합니다'
      } else {
        this.loginForm.password.errorMessage = ''
        this.loginForm.password.style = {
        'border-green-700' : true,
        'border-red-700' : false,
      }
        checkResult = true
      }
      return checkResult
    }

  },
  mounted() {
    this.idChecked = localStorage.getItem('idChecked') == null ? false : localStorage.getItem('idChecked')
    this.loginForm.id.value = localStorage.getItem('rememberId') == null ? '' : localStorage.getItem('rememberId')
    document.getElementById('app').classList.add('h-screen', 'overflow-hidden', 'flex', 'items-center', 'justify-center', 'font-sans', 'bg-gray-900')
  },
  destroyed() {
    document.getElementById('app').classList.remove('h-screen', 'overflow-hidden', 'flex', 'items-center', 'justify-center', 'font-sans', 'bg-gray-900')
  }
}
</script>