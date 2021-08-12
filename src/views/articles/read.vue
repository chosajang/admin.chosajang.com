<template>
  <main class="md:ml-52">
    <div class="container max-w-full m-auto">
      
      <!--// Card : ST -->
      <div class="">
        <div class="grid grid-cols-12 gap-4"><!--// Card Col : ST -->

          <!--// Form : ST -->
          <div class="col-span-12">
            <div @mousemove="dragBarStart" class="flex flex-col rounded min-w-full bg-white shadow-sm">

              <!--// Form Body : ST -->
              <div class="grid grid-cols-4 gap-4 items-center justify-center m-4">
                <div class="col-span-4 md:col-span-3">
                  <label class="block text-sm mb-1" for="title">제목</label>
                  <input v-model="article.title" class="w-full px-5 py-1 text-xl text-gray-700 outline-none border-transparent border-b-2 border-blue-100 hover:border-blue-400 focus:border-blue-400 focus:bg-white duration-200" id="title" name="title" type="text" required="true" placeholder="글 제목">
                </div>
                <div class="col-span-4 md:col-span-1">
                  <label class="block text-sm mb-1">게시여부</label>
                  <toggle-button v-model="article.post_yn"
                    :labels="toggleBtn.labels"
                    :height="toggleBtn.height"
                    :width="toggleBtn.width"
                    :font-size="toggleBtn.fontSize"
                    :color="toggleBtn.color"
                    :sync="true"
                    class="my-2" />
                </div>
              </div>

              <div class="grid grid-cols-1 items-center justify-center mx-4 z-0">
                <div class="col-span-1">
                  <label class="block text-sm" for="cus_name">내용</label>
                  <div ref="editorWrap" class="h-full">
                    <editor
                      ref="toastuiEditor"
                      v-if="editorRender"
                      height="auto"
                      previewStyle="tab"
                      :initialValue="article.contents"
                      :options="editorOptions"
                    />
                  </div>
                  <div @mousedown="dragBarClick" class="hidden w-full h-4 border bg-gray-100 cursor-pointer rounded text-xs text-gray-600 text-center hover:text-blue-600">
                    <i class="fas fa-sort"></i> 입력창 크기 조절
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-4 gap-4 items-center justify-center m-4">
                <div class="col-span-4 md:col-span-1 h-40">
                  <label class="block text-sm mb-1" for="title">썸네일 이미지</label>
                  <div class="mx-auto h-32 w-52 cursor-pointer relative rounded-lg">
                    <img :src="article.thumbnail_url" onerror="this.src='/assets/images/blog.png'" class="absolute object-none object-scale-down object-center bg-gray-100 h-32 w-full mx-auto inset-0 z-0 rounded-lg" alt="thumbnail image url">
                    <div @click="fileClick" class="opacity-0 hover:opacity-90 bg-gray-400 duration-200 absolute inset-0 z-10 flex justify-center items-center text-2xl text-white rounded-lg">
                      <i class="fas fa-camera"></i>
                    </div>
                    <input v-bind="article.thumbnail_image" @change="fileChange" accept="image/gif, image/jpeg, image/png" type="file" class="hidden" ref="thumbnail_file">
                  </div>
                </div>
                <div class="col-span-4 md:col-span-3 h-40">
                  <label class="block text-sm mb-1">설명글</label>
                  <textarea v-model="article.description" class="h-32 w-full resize-none border-transparent border-2 duration-200 border-gray-200 rounded-lg outline-none focus:border-blue-400 hover:border-blue-400 p-2 text-xl" placeholder="블로그 목록에 표시될 설명 글을 작성하세요" ></textarea>
                </div>
              </div>

              <div class="grid grid-cols-4 items-center m-4">
                <div class="col-span-1">
                  <input type="button" v-on:click="articleDelete" class="rounded bg-gray-100 py-1 px-6 cursor-pointer text-gray-600 w-26 hover:bg-gray-200" value="삭제하기"/>
                </div>
                <div class="col-span-3 md:col-start-2 grid justify-items-end">
                  <div>
                    <input type="button" v-on:click="updateCancel" class="rounded bg-gray-500 py-1 px-6 cursor-pointer text-white w-20 ml-4 hover:bg-gray-600" value="취소"/>
                    <input type="button" v-on:click="updateApply" class="rounded bg-blue-500 py-1 px-6 cursor-pointer text-white w-26 ml-2 hover:bg-blue-600" value="수정하기"/>
                  </div>
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
import { apiArticleUpdate, apiEditorImageUpload, apiArticleRead, apiArticleDelete } from '@/api'

import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/ko-kr'
import 'tui-color-picker/dist/tui-color-picker.css'
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'

import { Editor } from '@toast-ui/vue-editor'
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'

import 'prismjs/themes/prism.css'
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css'
import Prism from 'prismjs'
import 'prismjs/components/prism-clojure.js'
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'

export default {
  name: 'userUpdate',
  components: {
    editor: Editor
  },
  data() {
    return {
      article_seq: this.$route.params.article_seq,
      editorRender: false,
      article: {
        title: '',
        contents: '',
        post_yn: false,
        thumbnail_image: '',
        description: ''
      },
      imagePreview: '',
      post_yn: false,
      toggleBtn : {
        height: 26,
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
        initialEditType: 'markdown',
        placeholder: '여기에 글을 작성하세요',
        height: 'auto',
        toolbarItems: [
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task'],
          ['table', 'image', 'link'],
          ['code', 'codeblock'],
          ['scrollSync'],
        ],
        plugins: [
          colorSyntax,
          [ codeSyntaxHighlight, { highlighter: Prism } ]
        ],
        hooks: {
          addImageBlobHook: function (blob, callback) {
            const FORMDATA = new FormData()
            FORMDATA.append('file', blob)
            // 파일 업로드 API
            apiEditorImageUpload(FORMDATA)
              .then(res => {
                const API_DATA = res.data
                if (API_DATA.result) {
                  callback(API_DATA.data.file_url, API_DATA.data.logical_name)
                } else {
                  console.log(API_DATA.messages)
                }
              })
              .catch(error => {
                const errorResponse = error.response
                if( errorResponse.status == 400 ) {
                  const errorData = error.response.data.messages
                  let validation_message = ''
                  if( typeof errorData == "object" ) {
                    for ( let item in errorData ) {
                      validation_message += '- ' + item + ' : ' + errorData[item] + '\n'
                    }
                  } else {
                    validation_message = errorData
                  }

                  alert( validation_message )
                }
              })
            return false
          }
        }
      },
      editorWrap: '',
      barDraging: false,
      currentMouseY: 0,
      currentEditorY: 0,
      minEditorY: 384 // h-96 = 24rem = 384px
    }
  },
  methods: {

    fileClick(){
      const fileInput = this.$refs.thumbnail_file;
      fileInput.click();
    },

    fileChange (e) {
      const file = e.target.files[0]
      this.article.thumbnail_image = file
      this.article.thumbnail_url = URL.createObjectURL(file)
    },

    updateCancel () {
      this.$swal({
        title: '수정 취소',
        html: '내용 저장을 취소하고 목록으로 돌아가시겠습니까?<br/>수정한 내용은 저장되지 않습니다',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: `네, 취소합니다`,
        confirmButtonColor: '#FF0000',
        cancelButtonText: `아니오`,
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.back()
        }
      })
    },

    updateApply () {
      const FORMDATA = new FormData()
      FORMDATA.append('article_seq', this.article_seq)
      FORMDATA.append('title', this.article.title)
      FORMDATA.append('contents', this.$refs.toastuiEditor.invoke('getMarkdown'))
      FORMDATA.append('post_yn', this.article.post_yn == true ? 'Y' : 'N')
      
      if( this.article.thumbnail_image ) {
        FORMDATA.append('thumbnail_image', this.article.thumbnail_image)
      }
      FORMDATA.append('description', this.article.description)
      
      this.$swal({
        title: '글 수정하기',
        text: '작성한 글을 수정하시겠습니까?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: `네, 수정합니다`,
        cancelButtonText: `아니오`,
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          
          apiArticleUpdate(FORMDATA)
          .then( () => {
            this.$swal.fire({
              position: 'bottom-end',
              icon: 'success',
              html: '<p class="text-lg">수정 되었습니다<p>',
              width: 300,
              showConfirmButton: false,
              timer: 500
            })
          })
          .catch(error => {
            const errorResponse = error.response
            
            if( errorResponse.status == 400 ) {
              const errorData = error.response.data.messages
              
              let validation_message = ''
              if( typeof errorData == "object" ) {
                for ( let item in errorData ) {
                  validation_message += '- ' + item + ' : ' + errorData[item] + '<br/>'
                }
              } else {
                validation_message = errorData
              }
              
              this.$swal({
                title: '유효성 검사 실패', 
                html: validation_message, 
                icon: 'error'
              })
            }
          })
          
        }
      })
    },

    articleDelete () {
      this.$swal({
        title: '글 삭제하기',
        html: '작성한 글을 삭제하시겠습니까?<p class="text-base text-red-500">*삭제하면 목록에서 사라집니다</p>',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: `네, 삭제합니다`,
        confirmButtonColor: '#FF0000',
        cancelButtonText: `아니오`,
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          apiArticleDelete(this.article_seq)
          .then(() => {
            this.$swal('삭제되었습니다', '', 'success')
            .then(() => {
              this.$router.push({ path: '/articles' })
            })
          })
        }
      })
    },

    dragBarClick(e) {
      this.barDraging = true
      this.currentMouseY = e.clientY
      this.currentEditorY = this.$refs.editorWrap.clientHeight
    },

    dragBarStart(e) {
      if( this.barDraging ){
        let changeY = (this.currentEditorY + (e.clientY - this.currentMouseY))
        if( this.minEditorY < changeY ) {
          this.$refs.editorWrap.style.height = (this.currentEditorY + (e.clientY - this.currentMouseY)) + 'px'
        }
      }
    },

    barDragStop() {
      this.barDraging = false
    },

  },

  created() {

    apiArticleRead(this.article_seq)
    .then(res => {
      if( res.status == 200 ) {
        const apiData = res.data
        this.article = apiData.data
        this.article.post_yn = this.article.post_yn == 'Y' ? true : false
        this.editorRender = true
      } else {
        this.$swal({
          title: '정보 없음',
          html: '요청한 정보가 존재하지 않습니다<br/>목록으로 돌아갑니다',
          icon: 'error'
        }).then(() => { 
          this.$router.push({ path: '/articles' })
        })
      }
    })
  },

  mounted() {
    window.addEventListener('mouseup', this.barDragStop)
  }

}
</script>
