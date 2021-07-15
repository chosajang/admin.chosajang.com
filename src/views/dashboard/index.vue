<template>
  <main class="md:ml-52">
    <div class="container m-auto p-4 md:p-6">

      <!--// Title -->
      <div class="border-b mb-4"><p class="text-base font-bold">대시보드</p></div>

      <!--// Card 4 Style : ST -->
      <div class="my-4">
        <div class="grid grid-cols-12 gap-4"><!--// Card Col : ST -->

          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <div class="flex flex-row bg-white shadow-sm rounded p-4">
              <div class="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-md bg-blue-100 text-blue-500">
                <!-- <img class="w-6 h-6" src="/assets/images/users.png"/> -->
                <i class="fas fa-users text-lg"></i>
              </div>
              <div class="flex flex-col flex-grow ml-4">
                <div class="text-sm text-gray-500">회원 수</div>
                <div class="font-bold text-lg">{{ user_count }}</div>
              </div>
            </div>
          </div>

          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <div class="flex flex-row bg-white shadow-sm rounded p-4">
              <div class="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-md bg-blue-100 text-blue-500">
                <!-- <img class="w-6 h-6" src="/assets/images/building.png"/> -->
                <i class="fas fa-feather-alt text-lg"></i>
              </div>
              <div class="flex flex-col flex-grow ml-4">
                <div class="text-sm text-gray-500">내가 쓴 글</div>
                <div class="font-bold text-lg">{{ article_count }}</div>
              </div>
            </div>
          </div>

          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <div class="flex flex-row bg-white shadow-sm rounded p-4">
              <div class="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-md bg-blue-100 text-blue-500">
                <!-- <img class="w-6 h-6" src="/assets/images/tickets.png"/> -->
                <i class="fas fa-clock text-lg"></i>
              </div>
              <div class="flex flex-col flex-grow ml-4">
                <div class="text-sm text-gray-500">최근 작업일</div>
                <div class="font-bold text-lg">{{ this.latest_working_date }}</div>
              </div>
            </div>
          </div>

          <!-- <div class="col-span-12 md:col-span-6 lg:col-span-3">
            <div class="flex flex-row bg-white shadow-sm rounded p-4">
              <div class="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-md bg-blue-100 text-blue-500">
                <img class="w-6 h-6" src="/assets/images/use_ticket.png"/>
              </div>
              <div class="flex flex-col flex-grow ml-4">
                <div class="text-sm text-gray-500">사용된 티켓 수</div>
                <div class="font-bold text-lg">860</div>
              </div>
            </div>
          </div> -->

        </div>
      </div><!--// Card 4 Style : ED -->

      <!--// Board 2 Style : ST -->
      <div class="my-4">
        <div class="grid grid-cols-12 gap-4"><!--// Card Col : ST -->

          <!--// Table : ST -->
          <div class="col-span-12 lg:col-span-6">
            <div class="flex flex-col bg-white shadow-sm rounded p-4 min-w-full">
              <div class="flex flex-row grid grid-cols-6 mb-4">
                <div class="col-span-5 text-sm font-bold">
                  게시중인 글
                </div>
                <div class="col-span-1 text-sm text-right leading-6">
                  <!-- <button type="button" class="w-full bg-gray-200 text-gray-700 rounded px-4 py-1 transition duration-200 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline" >
                    more<i class="fas fa-angle-right pl-2"></i>
                  </button> -->
                  <!-- <a href="#">more<i class="fas fa-angle-right pl-1 text-xs"></i></a> -->
                </div>
              </div>
              <table class="">
                <thead>
                  <tr class="text-sm text-gray-600 bg-gray-100 rounded">
                    <th class="p-2 rounded-tl rounded-bl">글 제목</th>
                    <th class="p-2">작성자</th>
                    <th class="p-2 rounded-tr rounded-br">등록일</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item) in postingArticleList" v-bind:key="item.SEQ" class="text-sm text-gray-600 text-center hover:bg-gray-100">
                    <td class="p-2">
                      <router-link :to="'/articles/'+item.article_seq" class="text-blue-500 hover:underline"><p class="truncate max-w-xs">{{ item.title }}</p></router-link>
                    </td>
                    <td class="p-2">
                      <div class="flex items-center justify-center">
                        <div class="flex items-center">
                          <div class="flex-shrink-0 w-6 h-6">
                            <img class="w-full h-full rounded-full" :src="item.user_image_url" alt="" onerror="this.src='/assets/images/user.png'" />
                          </div>
                          <div class="ml-2">
                            <p class="whitespace-no-wrap">{{item.user_name}}</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="p-2 text-xs">{{ item.created_at }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!--// Table : ED -->

          <!--// Table : ST -->
          <div class="col-span-12 lg:col-span-6">
            <div class="flex flex-col bg-white shadow-sm rounded p-4 min-w-full">
              <div class="flex flex-row grid grid-cols-6 mb-4">
                <div class="col-span-5 text-sm font-bold">
                  최근 작성 중인 글
                </div>
                <div class="col-span-1 text-sm text-right leading-6">
                  <!-- <button type="button" class="w-full bg-gray-200 text-gray-700 rounded px-4 py-1 transition duration-200 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline" >
                    more<i class="fas fa-angle-right pl-2"></i>
                  </button> -->
                  <!-- <a href="#">more<i class="fas fa-angle-right pl-1 text-xs"></i></a> -->
                </div>
              </div>
              <table class="">
                <thead>
                  <tr class="text-sm text-gray-600 bg-gray-100 rounded">
                    <th class="p-2 rounded-tl rounded-bl">제목</th>
                    <th class="p-2">글쓴이</th>
                    <th class="p-2 rounded-tr rounded-br">등록일</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item) in workingArticleList" v-bind:key="item.SEQ" class="text-sm text-gray-600 text-center hover:bg-gray-100">
                    <td class="p-2">
                      <router-link :to="'/articles/'+item.article_seq" class="text-blue-500 hover:underline"><p class="truncate max-w-xs">{{ item.title }}</p></router-link>
                    </td>
                    <td class="p-2">
                      <div class="flex items-center justify-center">
                        <div class="flex items-center">
                          <div class="flex-shrink-0 w-6 h-6">
                            <img class="w-full h-full rounded-full" :src="item.user_image_url" alt="" onerror="this.src='/assets/images/user.png'" />
                          </div>
                          <div class="ml-2">
                            <p class="whitespace-no-wrap">{{item.user_name}}</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="p-2 text-xs">{{ item.created_at }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!--// Table : ED -->

        </div><!--// Card Col : ST -->
      </div><!--// Board 2 Style : ED -->

    </div>
  </main>
</template>

<script>
import { apiDashboard } from '@/api'

export default {
  name: 'dashboard',
  data () {
    return {
      user_count: 0,
      article_count: 0,
      latest_working_date: '',
      postingArticleList: [],
      workingArticleList: [],
    }
  },

  created() {
    apiDashboard()
    .then(res => {
      const apiData = res.data
      this.user_count = apiData.data.userCount
      this.article_count = apiData.data.articleCount
      this.latest_working_date = apiData.data.latestWorkingDate
      this.postingArticleList = apiData.data.latestPostingArticleList
      this.workingArticleList = apiData.data.latestWorkingArticleList
    })
  }
}
</script>
