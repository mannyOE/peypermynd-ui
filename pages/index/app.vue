<template>
  <c-flex flex-direction="column" justify-content="space-between" h="91.5%" class="container">
    <c-box h="78vh" overflow-y="scroll" d="flex" justify-content="center" id="messages" ref="scrollContainer">
      <c-box :w="{ base: '100%', md: '60%' }" p="4">
        <c-box v-for="(history, i) of chatHistory" :key="`history_${i}`" :id="`message-${i}`" d="flex"
          flex-direction="column" gap="2">
          <c-box bg="blue.800" px="4" py="2" border-radius="lg">
            {{ history[0] }}
          </c-box>
          <c-box bg="blue.800" px="4" py="2" mb="8" border-radius="lg">
            {{ history[1] }}
          </c-box>
        </c-box>
      </c-box>
    </c-box>
    <c-flex justify="center" align-items="center" h="100px" bg="blue.800">
      <c-box v-if="$route.query.uuid" :w="{ base: '100%', md: '60%' }" py="4" px="4" bg="" h="100%">
        <form @submit.prevent="sendMessage">
          <c-form-control>
            <c-input-group>
              <c-input v-model="question" :is-disabled="progress" border-radius="lg" h="50px" placeholder="Send a message"
                w="100%"
                bg="transparent" />
              <c-input-right-element>
                <c-button :is-loading="progress" type="submit" top="5px" outline="none" :_focus="{ outline: 'none' }"
                  :_active="{ bg: 'transparent' }"
                  :_hover="{ bg: 'transparent' }" bg="transparent">
                  <c-icon name="send" />
                </c-button>
              </c-input-right-element>
            </c-input-group>
            <c-form-helper-text>
              Ask a question about the document you uploaded
            </c-form-helper-text>
          </c-form-control>
        </form>

      </c-box>
    </c-flex>
  </c-flex>
</template>

<script lang="js">
import { mapGetters } from "vuex"

export default {
  name: 'IndexPage',
  middleware: 'auth',
  components: {

  },
  data () {
    return {
      question: "",
      progress: false
    }
  },
  mounted () {
    this.loadConversations()
  },
  watch: {
    chatHistory () {
      this.scrollToBottom()
    }
  },
  computed: {
    ...mapGetters('history', ['getHistory']),
    conversations () {
      return this.$store.getters['conversations/getConversations']
    },
    currentConversation () {
      return this.conversations.find(e => e.uuid === this.$route.query.uuid)
    },
    chatHistory () {
      if (this.currentConversation) {
        return this.getHistory(this.$route.query.uuid)
      }
      return []
    }
  },
  methods: {
    scrollToBottom () {
      const messages = document.getElementById('messages')
      let count = this.chatHistory.length
      const messagesid = document.getElementById(`message-${count - 1}`)
      if (messagesid && messages) {
        messages.scrollTop = messagesid.offsetTop - 10
      }
    },
    async loadConversations () {
      await this.$store.dispatch('conversations/fetchAllConversations')
    },
    async sendMessage () {
      this.progress = true
      await this.$store.dispatch('conversations/sendMessage', {
        knowledgeId: this.$route.query.uuid,
        question: this.question,
        history: this.chatHistory
      })
      this.question = ''
      this.progress = false
    }
  }
}
</script>
