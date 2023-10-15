<template>
  <div id="dropzone">
    <c-input id="file-input" :accept="accept" type="file" d="none" :multiple="multiple" />
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { PropType } from 'vue/types'

export default Vue.extend({
  components: {
  },
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String as PropType<string>,
      default: '.pdf, .csv, .docx, .doc, .xls, .xlsx'
    }
  },
  data () {
    return {
    }
  },
  computed: {

  },
  mounted () {
    const dropzone = document.getElementById('dropzone')

    if (dropzone) {
      // Add 'dragover' class when a file is dragged over the dropzone
      dropzone.addEventListener('dragover', (event) => {
        event.preventDefault()
        dropzone.classList.add('dragover')
      })

      // Remove 'dragover' class when a file is dragged out of the dropzone
      dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('dragover')
      })

      // Handle file drop
      dropzone.addEventListener('drop', (event) => {
        event.preventDefault()
        dropzone.classList.remove('dragover')

        const file = event.dataTransfer?.files[0]
        // Do something with the dropped files (e.g., upload them)
        if (file) {
          this.$emit('file-added', file)
        }
      })

      // Trigger file input when the dropzone is clicked
      dropzone.addEventListener('click', () => {
        const fileInput = document.getElementById('file-input')
        if (fileInput) {
          fileInput.click()
        }
      })

      // Handle file selection from the file input
      const fileInput = document.getElementById('file-input') as HTMLInputElement
      if (fileInput) {
        fileInput.addEventListener('change', () => {
          if (fileInput.files) {
            const files = fileInput.files[0]
            // Do something with the selected files (e.g., upload them)
            this.$emit('file-added', files)
          }
        })
      }
    }
  },
  methods: {

  }
})
</script>

<style scoped>
.dragover {
  background-color: #F7FAFC;
}
</style>
