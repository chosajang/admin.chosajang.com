<template>
  <main class="md:ml-52">
    <div class="container max-w-screen-lg m-auto p-4 md:p-6">

      <!-- Breadcrumb : ST -->
      <div class="mb-4">
        <nav aria-label="breadcrumb"> 
          <ol class="breadcrumb flex text-sm">
            <li class="breadcrumb-item text-gray-600"><router-link to="/admin" class="text-gray-600 hover:text-blue-700 mx-2">관리자 관리</router-link></li>
            <li><i class="fas fa-chevron-right text-gray-300"></i></li>
            <li class="breadcrumb-item active text-blue-700 hover:text-blue-700 mx-2" aria-current="page">관리자 목록</li> 
          </ol>
        </nav>
      </div><!-- Breadcrumb : ED -->

      <!--// Board 2 Style : ST -->
      <div class="my-4">
        <div class="grid grid-cols-12 gap-4"><!--// Card Col : ST -->

          <!--// Table : ST -->
          <div class="col-span-12">
            <div class="flex flex-col rounded min-w-full p-4 bg-white shadow-sm">

              <!--// Table Title : ST -->
              <div class="flex flex-row grid grid-cols-6 items-baseline">
                <div class="col-span-3 text-lg font-bold">
                  관리자 목록
                </div>
                <div class="grid col-span-3 text-sm justify-items-end leading-6">
                  <router-link to="/admin/create" class="rounded flex shadow bg-blue-500 px-6 py-1 text-white hover:bg-blue-600">관리자 등록</router-link>
                </div>
              </div>
              <div class="flex flex-row grid grid-cols-6 my-2 items-baseline">
                <input type="text" class="placeholder-gray-400 rounded w-full py-1 px-4 text-base font-light border border-gray-400" v-model="searchStx" name="search_word" placeholder="관리자명 검색"/>
                <!-- <input type="button" class="rounded bg-blue-500 py-1 px-6 cursor-pointer text-white w-20 ml-2 hover:bg-blue-600" value="검색"/> -->
              </div><!--// Table Title : ED -->
              <table class="">
                <thead>
                  <tr class="text-sm text-gray-600 bg-gray-200 rounded">
                    <th class="p-2 rounded-tl rounded-bl"></th>
                    <th class="p-2">기업명</th>
                    <th class="p-2">기업 관리자</th>
                    <th class="p-2">내부 담당자</th>
                    <th class="p-2">상태</th>
                    <th class="p-2 rounded-tr rounded-br">등록일시</th>
                  </tr>
                </thead>
                <tbody class="text-sm font-bold text-gray-600 text-center">

                  <tr class="border-b hover:bg-gray-100 h-14" v-for="(company, idx) in paginate" :key="idx">
                    <td class="p-2">{{((paging.page-1) * paging.perPage) + idx + 1 }}</td>
                    <td class="p-2"><router-link :to="'/company/'+company.company_seq" class="text-blue-500 hover:underline">{{company.name}}</router-link></td>
                    <td class="p-2">
                      <div class="flex items-center justify-center">
                        <div class="mr-2">
                          <img :src="imgUrl+company.profile_file_path" class="w-10 rounded-full" onerror="this.src='/assets/images/user.png'" />
                        </div>
                        {{company.damdang_admin_name}}
                      </div>
                    </td>
                    <td class="p-2">
                      <div class="flex items-center justify-center">
                        <img v-for="(admin, adminIdx) in company.sd_company_admin_links" :key="adminIdx" :src="imgUrl+admin.profile_file_path" onerror="this.src='/assets/images/user.png'" class="w-8 h-8 rounded-full border-gray-200 border transform hover:scale-125"/>
                      </div>
                    </td>
                    <td class="p-2">
                      <span :class="company.company_status_class1">
                        <span :class="company.company_status_class2" aria-hidden=""></span>
                        <span class="relative text-xs">{{company.status_name}}</span>
                      </span>
                    </td>
                    <td class="p-2">{{company.company_mod_date}}</td>
                  </tr>
                  
                </tbody>
              </table>

              <!--// Pagination : ST -->
              <div class="flex items-center justify-center py-4">
                <ul class="flex text-sm">
                  <li class="mx-1 px-3 py-2" :class="(paging.itemsPages != 0) ? 'text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded' : 'text-gray-200 rounded-lg'" @click="setPages('prev')">
                      <a class="flex items-center font-bold" href="#">
                          <span class="mx-1">previous</span>
                      </a>
                  </li>
                  <li class="mx-1 px-3 py-2 hover:bg-gray-700 hover:text-gray-200 rounded" v-for="pageNumber in totalPages" :key="pageNumber" @click="setPage(pageNumber)"
                  :class="{'bg-gray-700 text-gray-200 ':(pageNumber == paging.page)}">
                      <a class="font-bold" href="#">{{pageNumber}}</a>
                  </li>
                  <li class="mx-1 px-3 py-2" 
                  :class="(paging.itemsPages + paging.itemsPerPage < Math.ceil(paging.resultCount / paging.perPage)) ? 'text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded' : 'text-gray-200 rounded-lg'" @click="setPages('next')">
                      <a class="flex items-center font-bold" href="#">
                          <span class="mx-1">Next</span>
                      </a>
                  </li>
                </ul>
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
  name: 'companyList',
  data() {
    return {
      companyList: [],
      paging:{
        page:1,             //현재 페이지
        perPage:5,          //보여줄 페이지
        itemsPerPage:5,     //페이지 넘버 길이
        itemsPages:0,       //현재 페이지 넘버
        resultCount:0       //총 페이지
      },
      searchStx:"",
      imgUrl: process.env.STATIC_URL
    }
  },
  methods: {
        setPage: function(pageNumber) {
          this.paging.page = pageNumber
        },
        setPages:function(setting){
          if(setting == "prev"){
            if(this.paging.itemsPages == 0)return;
            this.paging.itemsPages -=  this.paging.itemsPerPage;
          }else if(setting == "next"){
            let total = Math.ceil(this.paging.resultCount / this.paging.perPage);
            if(this.paging.itemsPages + this.paging.itemsPerPage >= total)return;
            this.paging.itemsPages +=  this.paging.itemsPerPage;
          }
        },
        searching(company){
          if (this.searchStx.length === 0 || this.searchStx.length === 0) {
            return true;
          } 
          return  (company.name.toLowerCase().indexOf(this.searchStx.toLowerCase()) > -1);
        },
        setTotal(list){
          if(this.paging.resultCount != list.length){
            this.paging.resultCount = list.length;
            this.paging.page = 1;
          }
        }

  },
  computed : {
    totalPages: function() {
      let total = Math.ceil(this.paging.resultCount / this.paging.perPage);
      let curPages = [];
      for(let i=0; i<this.paging.itemsPerPage; i++){
        if(total > this.paging.itemsPages + i){
          curPages.push(this.paging.itemsPages+i+1);
        }
      }
      return curPages;
    },
    paginate: function() {
        if (!this.companyList || this.companyList.length != this.companyList.length) {
            return;
        }
        let list = this.companyList.filter(this.searching);
        this.setTotal(list);
        
        let index = this.paging.page * this.paging.perPage - this.paging.perPage
        return list.slice(index, index + this.paging.perPage);
    }
  },
  created() {
    apiUserList(this.$axios)
    .then(res => {
      const apiData = res.data
      if( apiData.result ){
        this.companyList = apiData.data
        this.paging.resultCount = this.companyList.length

        for(let i = 0 ; i < this.companyList.length ; i ++){
          var company    =  this.companyList[i];
          var company_status_class1       = 'relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight'; 
          var company_status_class2       = 'absolute inset-0 bg-green-200 opacity-50 rounded-lg';
          switch(company.company_status_seq){
            case 1 :
              company_status_class1         = 'relative inline-block px-3 py-1 font-semibold text-blue-900 leading-tight';
              company_status_class2         = 'absolute inset-0 bg-blue-200 opacity-50 rounded-lg';
              break;
            case 2 :
              company_status_class1         = 'relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight';
              company_status_class2         = 'absolute inset-0 bg-red-200 opacity-50 rounded-lg';
               break;
            case 3 :
              company_status_class1         = 'relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight';
              company_status_class2         = 'absolute inset-0 bg-green-200 opacity-50 rounded-lg';
               break;
            case 4 :
              company_status_class1         = 'relative inline-block px-3 py-1 font-semibold text-red-600 leading-tight';
              company_status_class2         = 'absolute inset-0 opacity-50 rounded-lg';
              break;
          }
      
          this.companyList[i].company_status_class1      = company_status_class1;
          this.companyList[i].company_status_class2      = company_status_class2;
         // console.log(company.company_status_seq);
        }
      }
    })
  
  }
  
}
</script>
