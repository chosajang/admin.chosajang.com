<template>
  <main class="md:ml-52">
    <div class="container max-w-screen-lg m-auto">

      <!-- Breadcrumb : ST -->
      <!-- <div class="mb-4">
        <nav aria-label="breadcrumb"> 
          <ol class="breadcrumb flex text-sm">
            <li class="breadcrumb-item text-gray-600"><router-link to="/users" class="font-medium text-blue-500 hover:underline mx-2">계정 관리</router-link></li>
            <li><i class="fas fa-chevron-right text-gray-300"></i></li>
            <li class="breadcrumb-item active font-medium text-gray-600 mx-2" aria-current="page">목록</li> 
          </ol>
        </nav>
      </div> -->
      <!-- Breadcrumb : ED -->

      <!--// Board 2 Style : ST -->
      <div class="md:my-4">
        <div class="grid grid-cols-12 gap-4"><!--// Card Col : ST -->

          <!--// Table : ST -->
          <div class="col-span-12">
            <div class="flex flex-col rounded min-w-full p-4 bg-white shadow-sm">

              <!--// Table Title : ST -->
              <div class="flex flex-row grid grid-cols-6 items-baseline">
                <div class="col-span-3 text-lg font-bold">
                  계정 목록
                </div>
                <div class="grid col-span-3 text-sm justify-items-end leading-6">
                  <!-- <router-link to="/admin/create" class="rounded flex shadow bg-blue-500 px-6 py-1 text-white hover:bg-blue-600">계정 등록</router-link> -->
                </div>
              </div>
              <div class="flex flex-row grid grid-cols-1 md:grid-cols-3 my-2 items-baseline">
                <input type="text" v-model="search" class="placeholder-gray-400 rounded w-full py-1 px-4 text-base font-light border-transparent border-2 duration-200 border-gray-200 rounded-lg outline-none focus:border-blue-400 hover:border-blue-400" placeholder="이름, 아이디 검색"/>
                <!-- <input type="button" class="rounded bg-blue-500 py-1 px-6 cursor-pointer text-white w-20 ml-2 hover:bg-blue-600" value="검색"/> -->
              </div><!--// Table Title : ED -->
              <table class="">
                <thead>
                  <tr class="text-sm text-gray-600 bg-gray-200 rounded">
                    <th class="p-2 rounded-tl rounded-bl"></th>
                    <th class="p-2">회원 정보</th>
                    <th class="p-2 hidden md:table-cell">이메일</th>
                    <th class="p-2 rounded-tr rounded-br hidden md:table-cell">가입일시</th>
                  </tr>
                </thead>
                <tbody class="text-sm font-bold text-gray-600 text-center">

                  <tr v-for="(item, index) in listItemSlice" v-bind:key="item.SEQ" class="hover:bg-gray-100">
                    <th class="p-2 rounded-l-md">{{ (pageNum * pageSize) + index + 1 }}</th>
                    <td class="p-2">
                      <div class="flex items-center justify-center">
                        <div class="mr-2">
                          <img :src="item.profile_image_url" class="w-10 h-10 rounded-full transform hover:scale-110" onerror="this.src='/assets/images/user.png'" />
                        </div>
                        <router-link :to="'/users/'+item.user_seq" class="text-blue-500 hover:underline">{{item.name}}({{item.id}})</router-link>
                      </div>
                    </td>
                    <td class="p-2 hidden md:table-cell">{{ item.email }}</td>
                    <td class="p-2 hidden md:table-cell rounded-r-md">{{ item.created_at }}</td>
                  </tr>

                </tbody>
              </table>

              <!--// Pagination : ST -->
              <div class="flex items-center justify-center py-4">
                <paginate
                  :pageCount="pageCount"
                  :clickHandler="pageMove"
                  :containerClass="'flex text-sm text-gray-600'"
                  :prev-class="'mr-3 py-2'"
                  :prev-link-class="'py-2 px-3 rounded-lg hover:bg-gray-200'"
                  :page-class="'mx-1 py-2'"
                  :page-link-class="'py-2 px-3 font-bold rounded-lg hover:bg-blue-500 hover:text-gray-100'"
                  :next-class="'ml-3 py-2'"
                  :next-link-class="'py-2 px-3 rounded-lg hover:bg-gray-200'"
                  :active-class="'font-bold text-gray-100 bg-blue-500 rounded-lg'" >
                </paginate>
              </div><!--// Pagination : ED -->
            </div>
          </div><!--// Table : ED -->

          </div><!--// Card Col : ED -->
        </div><!--// Board 2 Style : ED -->

    </div>
  </main>
</template>

<script>
import { apiUserList } from '@/api'

export default {
  name: 'userList',
  data() {
    return {
      userList: [],
      pageSize: 10,
      pageNum: 0,
      search:"",
    }
  },
  methods: {
    pageMove (pageNum) {
      this.pageNum = pageNum - 1;
    },
  },
  created() {
    apiUserList()
    .then(res => {
      const apiData = res.data
      if( apiData.result ){
        this.userList = apiData.data
      }
    })
  },
  computed: {
    /**
     * 페이지 랜더링 및 페이지네이트용 배열 자르기
     */
    listItemSlice () {
      const start = this.pageNum * this.pageSize
      const end = start + this.pageSize
      return this.listFiltered.slice(start, end)
    },
    /**
     * 회원 ID,이름 검색 시 필터 처리
     */
    listFiltered () {
      const search = (this.search).replace(/ /gi, '')
      // List Filter
      let idItems = this.userList
      let nameItems = this.userList
      idItems = idItems.filter(item => {
        return item.id.toLowerCase().includes(search.toLowerCase())
      });
      nameItems = nameItems.filter(item => {
        return item.name.toLowerCase().includes(search.toLowerCase())
      });
      // Remove Duplicate
      const itemList = new Set(idItems.concat(nameItems))
      return [...itemList]
    },
    pageCount () {
      const listLength = this.listFiltered.length
      const pageSize = this.pageSize
      let page = Math.ceil(listLength / pageSize)
      return page
    },
  }
}
</script>
