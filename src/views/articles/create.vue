<template>
  <main class="md:ml-52">
    <div class="container max-w-screen-2xl m-auto p-4 md:p-6">

      <!-- Breadcrumb : ST -->
      <div class="mb-4">
        <nav aria-label="breadcrumb"> 
          <ol class="breadcrumb flex text-sm">
            <li class="breadcrumb-item text-gray-600"><router-link to="/articles" class="font-medium text-blue-500 hover:underline mx-2">게시물 관리</router-link></li>
            <li><i class="fas fa-chevron-right text-gray-300"></i></li>
            <li class="breadcrumb-item active font-medium text-gray-600">
              <router-link to="/articles" class="font-medium text-blue-500 hover:underline mx-2">목록</router-link>
            </li>
            <li><i class="fas fa-chevron-right text-gray-300"></i></li>
            <li class="breadcrumb-item active font-medium text-gray-600 mx-2" aria-current="page">글쓰기</li> 
          </ol>
        </nav>
      </div><!-- Breadcrumb : ED -->
      
      <!--// Card : ST -->
      <div class="my-4">
        <div class="grid grid-cols-12 gap-4"><!--// Card Col : ST -->

          <!--// Form : ST -->
          <div class="col-span-12">
            <div class="flex flex-col rounded min-w-full bg-white shadow-sm">

              <!--// Form Body : ST -->
              <div class="grid grid-cols-4 gap-4 items-center justify-center m-4">
                <div class="col-span-4 md:col-span-3">
                  <label class="block text-sm mb-1" for="title">제목</label>
                  <input v-model="article.title" class="w-full px-5 py-1 text-2xl text-gray-700 outline-none border-transparent border-b-2 border-blue-100 hover:border-blue-400 focus:border-blue-400 focus:bg-white duration-200" id="title" name="title" type="text" required="true" placeholder="글 제목">
                </div>
                <div class="col-span-4 md:col-span-1">
                  <label class="block text-sm mb-1">게시여부</label>
                  <toggle-button v-model="article.post_yn"
                    :labels="toggleBtn.labels"
                    :height="toggleBtn.height"
                    :width="toggleBtn.width"
                    :font-size="toggleBtn.fontSize"
                    :color="toggleBtn.color"
                    class="my-2" />
                </div>
              </div>

              <div class="grid grid-cols-1 items-center justify-center m-4 z-0">
                <div class="col-span-1">
                  <label class="block text-sm" for="cus_name">내용</label>
                  <div class="my-2 h-96">
                    <editor
                      ref="toastuiEditor"
                      :options="editorOptions"
                      height="auto"
                    />
                  </div>
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
import { apiEditorImageUpload } from '@/api'

import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/ko-kr'
import 'tui-color-picker/dist/tui-color-picker.css'
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'

import { Editor } from '@toast-ui/vue-editor'
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'

export default {
  name: 'userUpdate',
  components: {
    editor: Editor
  },
  data() {
    return {
      // user_seq: this.$route.params.user_seq,
      article: {
        title: '',
        content: '',
        post_yn: false
      },
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
      editorOptions: {
        language: 'ko',
        minHeight: '100%',
        height: '100%',
        previewStyle: 'vertical',
        initialEditType: 'markdown',
        placeholder: '여기에 글을 작성하세요',
        toolbarItems: [
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task'],
          ['table', 'image', 'link'],
          ['code', 'codeblock'],
          ['scrollSync'],
        ],
        plugins: [
          colorSyntax
        ],
        hooks: {
          addImageBlobHook: function (blob, callback) {
            const FORMDATA = new FormData()
            FORMDATA.append('file', blob)
            // 파일 업로드 API
            apiEditorImageUpload(FORMDATA)
              .then(res => {
                const API_DATA = res.data[0]
                if (API_DATA.result) {
                  callback(API_DATA.data.file_url, API_DATA.data.logical_name);
                } else {
                  console.log(API_DATA.messages)
                }
              })
              .catch(error => {
                console.log(error);
              });
            return false;
          }
        }
      }
    }
  },
  methods: {
    createCancel () {

    },

    createApply () {
      const FORMDATA = new FormData()
      FORMDATA.append('title', this.article.title)
      FORMDATA.append('contents', this.$refs.toastuiEditor.invoke('getMarkdown'))
      FORMDATA.append('post_yn', this.article.post_yn == 'true' ? 'Y' : 'N')
      FORMDATA.append('thumbnail_image', '')
      
    }
  },
  mounted() {
    // const ui = this.$refs.toastuiEditor.invoke('getUI')
  }
}
</script>
