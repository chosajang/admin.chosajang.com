<template>
  <main class="md:ml-52">
    <div class="container max-w-screen-2xl m-auto p-4 md:p-6">

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
              <!-- <div class="flex flex-row grid grid-cols-6 m-4 items-baseline">
                <div class="col-span-6 text-lg font-bold">
                  글쓰기 폼
                </div>
              </div> -->
              <!--// Form Title : ED -->

              <!--// Form Body : ST -->
              <div class="grid grid-cols-4 gap-4 items-center justify-center m-4">
                <div class="col-span-4">
                  <label class="block text-sm" for="title">글 제목</label>
                  <input class="w-full px-5 py-1 text-gray-700 bg-gray-100 rounded" id="title" name="title" type="text" required="true" placeholder="글 제목">
                </div>
                <div class="col-span-4">
                  <label class="block text-sm">게시여부</label>
                  <toggle-button v-model="post_yn"
                      :labels="toggleBtn.labels"
                      :height="toggleBtn.height"
                      :width="toggleBtn.width"
                      :font-size="toggleBtn.fontSize"
                      :color="toggleBtn.color" />
                </div>
              </div>

              <div class="grid grid-cols-1 items-center justify-center m-4">
                <div class="col-span-1">
                  <label class="block text-sm" for="cus_name">내용</label>
                  <ckeditor 
                    :editor="editor"
                    v-model="editorData"
                    :config="editorConfig" 
                    @drop.prevent
                    @dragover.prevent
                    class="w-full text-gray-700 bg-gray-100 rounded border border-gray-100" id="recruit-content" name="recruit-content" required="true" placeholder="채용 내용" aria-label="Name" >
                  </ckeditor>
                </div>
              </div>

              <div class="grid grid-cols-1 items-center justify-items-end m-4">
                <div class="md:col-start-2">
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
// import { apiEditorImageUpload } from '@/api'
import BalloonEditor from '@ckeditor/ckeditor5-build-balloon'

export default {
  name: 'userUpdate',
  data() {
    return {
      user_seq: this.$route.params.user_seq,
      userInfo: [],
      editor: BalloonEditor,
      editorData: '',
      articleContent: '',
      post_yn: false,
      toggleBtn : {
        height: 28,
        width: 60,
        fontSize: 12,
        color: '#00A488',
        labels : {
          checked: 'on', 
          unchecked: 'off'
        }
      },

      editorConfig: { 
        filebrowserUploadUrl : 'https://api-laravel.chosajang.com/api/articles/editorUpload',
        filebrowserImageUploadUrl : 'https://api-laravel.chosajang.com/api/articles/editorUpload?type=Images',
        filebrowserUploadMethod : 'post',
        height : 700
      }

    }
  },
  methods: {
    createCancel () {

    },

    createApply () {
      
    }
  },
  mounted() {
    // const ui = this.$refs.toastuiEditor.invoke('getUI')
  }
}
</script>
