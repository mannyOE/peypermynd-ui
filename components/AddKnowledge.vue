<template>
  <div>
    <CButton v-if="showFullButton" mt="3" bg="blue.800" :_hover="{ bg: 'blue.800' }" :_active="{ bg: 'blue.800' }"
      gap="4" w="100%" @click="open">
      <c-icon name="plus"></c-icon>
      <c-text fontWeight="bold" fontSize="sm">
        New chat
      </c-text>
    </CButton>

    <div v-else>
      <CButton mt="3" bg="blue.800" :_hover="{ bg: 'blue.800' }" :_active="{ bg: 'blue.800' }"
        :d="{ base: 'none', md: 'flex' }" gap="4" w="100%" @click="open">
        <c-icon name="plus"></c-icon>
        <c-text fontWeight="bold" fontSize="sm">
          New chat
        </c-text>
      </CButton>

      <c-button bg="transparent" :_hover="{ bg: 'transaprent' }" :_active="{ bg: 'transaprent' }"
        :d="{ base: 'block', md: 'none' }" @click="open">
        <c-icon name="plus" />
      </c-button>
    </div>

    <c-drawer :placement="placement" :on-close="close" :isOpen="isOpen">
      <c-drawer-overlay />
      <c-drawer-content :minH="{ base: '320px', md: '100%' }">
        <c-drawer-header borderBottomWidth="1px">Start a conversation</c-drawer-header>
        <c-drawer-body>
          <c-box>
            <label for="">Upload document</label>
            <FileUploader @file-added="handleFile">
              <div>
                <c-box mt="1" bg="" h="100px" border-color="gray.300" cursor="pointer" borderWidth="2px"
                  border-style="dashed"
                  border-radius="lg"
                  p="5"
                  d="flex"
                  justify-content="center">
                  <c-box bg="" w="75%" d="flex" flex-direction="column" align-items="center">
                    <c-box w="100%" d="flex" justify-content="center">
                      <c-box v-if="uploading">
                        <c-spinner size="sm" />
                      </c-box>
                      <!-- <img v-else class="h-16" src="@/assets/icons/icon_upload.svg"> -->
                    </c-box>
                    <c-box mt="1" font-size="xs">
                      <span>Click to upload</span> or drag and drop
                    </c-box>
                    <c-box font-size="xs" d="flex" justify-content="center" w="100%">
                      <div v-for="(item, index) of allowedFiles" :key="item" class="uppercase mr-1">
                        <span class="lowercase">
                          {{ index === (allowedFiles.length - 1) ? ' or ' : '' }}
                        </span>
                        <span>
                          {{ item.replace('.', '') }}{{ index === (allowedFiles.length - 1) ? ' ' : ', ' }}
                        </span>
                      </div>
                    </c-box>
                  </c-box>
                </c-box>
                <c-box mt="1" font-size="xs" v-if="file">
                  {{ file.name }}
                </c-box>
              </div>
            </FileUploader>

            <c-flex mt="3" justify-content="end">
              <c-button :is-disabled="!file" :is-loading="uploading" variant-color="blue" w="100%" @click="submitFile">
                Start
              </c-button>
            </c-flex>
          </c-box>
        </c-drawer-body>
      </c-drawer-content>
    </c-drawer>
  </div>
</template>

<script lang="js">

export default {
  name: 'IndexPage',
  components: {
  },
  props: ['showFullButton'],
  data () {
    return {
      isOpen: false,
      uploading: false,
      file: null,
      placement: this.getPlacement(),
      allowedFiles: ['.pdf', '.csv', '.docx', '.doc', '.xls', '.xlsx']
    }
  },
  created () {
    window.addEventListener('resize', this.updatePlacement)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.updatePlacement)
  },
  computed: {
  },
  methods: {
    open () {
      this.isOpen = true
    },
    close () {
      this.isOpen = false
    },
    getPlacement () {
      const width = window.innerWidth

      if (width < 576) {
        return 'bottom' // Extra Small
      } else if (width < 768) {
        return 'bottom' // Small
      } else {
        return 'right' // Large
      }
    },
    updatePlacement () {
      this.placement = this.getPlacement()
    },
    handleFile (file) {
      this.file = file
    },
    async submitFile () {
      this.uploading = true
      const formData = new FormData()
      formData.append("file", this.file)
      const data = await this.$store.dispatch('conversations/startConversation', formData)
      this.$router.push({ query: { ...this.$route.query, uuid: data.uuid }, path: "/app" })
      this.uploading = false
      this.close()
    }
  }
}
</script>
