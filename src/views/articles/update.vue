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
                <div class="col-span-4 md:col-span-3">
                  <label class="block text-sm mb-1" for="title">제목</label>
                  <input class="w-full px-5 py-1 text-2xl text-gray-700 outline-none border-transparent border-b-2 hover:border-blue-400 focus:border-blue-400 focus:bg-white duration-200" id="title" name="title" type="text" required="true" placeholder="글 제목">
                </div>
                <div class="col-span-4 md:col-span-1">
                  <label class="block text-sm mb-1">게시여부</label>
                  <toggle-button v-model="post_yn"
                    :labels="toggleBtn.labels"
                    :height="toggleBtn.height"
                    :width="toggleBtn.width"
                    :font-size="toggleBtn.fontSize"
                    :color="toggleBtn.color" />
                </div>
              </div>

              <div class="grid grid-cols-1 items-center justify-center mx-4">
                <div class="col-span-1">
                  <label class="block text-sm mb-1" for="cus_name">내용</label>
                  <ckeditor 
                    :editor="editor"
                    v-model="editorData"
                    :config="editorConfig" 
                    @drop.prevent
                    @dragover.prevent
                    tag-name="textarea"
                    class="w-full rounded resize-y" >
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
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
import '@ckeditor/ckeditor5-build-classic/build/translations/ko'
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat'
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'
import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials'
import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold'
import LinkPlugin from '@ckeditor/ckeditor5-link/src/link'
import Code from '@ckeditor/ckeditor5-basic-styles/src/code'
import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock'
import Font from '@ckeditor/ckeditor5-font/src/font'
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight'
import Heading from '@ckeditor/ckeditor5-heading/src/heading'
import HeadingButtonsUI from '@ckeditor/ckeditor5-heading/src/headingbuttonsui'
import Image from '@ckeditor/ckeditor5-image/src/image'
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption'
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle'
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar'
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload'
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize'
import BlockToolbar from '@ckeditor/ckeditor5-ui/src/toolbar/block/blocktoolbar'
import Indent from '@ckeditor/ckeditor5-indent/src/indent'
import Link from '@ckeditor/ckeditor5-link/src/link'
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock'
import List from '@ckeditor/ckeditor5-list/src/list'
import Table from '@ckeditor/ckeditor5-table/src/table'
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar'

export default {
  name: 'articleUpdate',
  data() {
    return {
      user_seq: this.$route.params.user_seq,
      userInfo: [],
      
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

      editor: ClassicEditor,
      editorData: '',
      editorConfig: { 
        language: 'ko',
        height: '500px',
        plugins: [
          Autoformat,
          Alignment,
          EssentialsPlugin,
          BoldPlugin,
          LinkPlugin,
          Code,
          CodeBlock,
          Font,
          Highlight,
          Heading,
          HeadingButtonsUI,
          Image,
          ImageCaption,
          ImageStyle,
          ImageToolbar,
          ImageUpload,
          ImageResize,
          BlockToolbar,
          Indent,
          IndentBlock,
          Link,
          List,
          Table,
          TableToolbar
        ],
        toolbar: {
          items: [
            'heading',
            'bold',
            'link',
            'highlight',
            'alignment',
            'imageUpload',
            '|',
            'indent',
            'outdent',
            'bulletedList',
            'numberedList',
            '|',
            'code',
            'codeblock',
            '|',
            'fontSize',
            'fontFamily',
            'fontColor',
            'fontBackgroundColor',
            'insertTable',
            '|',
            'undo',
            'redo',
          ]
        },
        image: {
          toolbar: [
            "imageStyle:side",
            "|",
            "imageTextAlternative"
          ]
        },
        table: {
          contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"]
        },
        // blockToolbar: [
        //   "heading1",
        //   "heading2",
        //   "heading3",
        //   "|",
        //   "bulletedList",
        //   "numberedList",
        //   "|",
        //   "imageUpload"
        // ],
      }
    }
  },
  methods: {
    createCancel () {

    },

    createApply () {
      
    },
  },
  mounted() {
    // const ui = this.$refs.toastuiEditor.invoke('getUI')
  }
}
</script>
