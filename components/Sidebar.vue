<template>
  <CFlex h="100vh">
    <c-box w="50px" h="100%" d="flex" flex-direction="column" justify-content="space-between">
      <c-box>
      </c-box>
      <c-box>
        <Account :colorMode="colorMode" @logout="logoutUser" />
      </c-box>
    </c-box>
    <c-box h="100%" w="100%" px="3">
      <AddKnowledge :showFullButton="showFullButton" />
      <c-flex flex-direction="column" gap="3" mt="5">
        <c-flex v-for="(conversation, i) of conversations" :key="`conversation_${i}`" :_hover="{ bg: 'blue.800' }"
          border-radius="lg" px="3" py="2" :bg="current === conversation.uuid ? 'blue.800' : ''"
          cursor="pointer"
          align-items="center" minH="50px"
          @click="() => goTo(conversation.uuid)">
          {{ conversation.title }}
        </c-flex>
      </c-flex>
    </c-box>
  </CFlex>
</template>

<script lang="js">

export default {
  name: 'IndexPage',
  components: {
  },
  props: [
    'showFullButton'
  ],
  data () {
    return {

    }
  },
  computed: {
    colorMode () {
      return this.$store.getters['layout/getColorMode']
    },
    conversations () {
      return this.$store.getters['conversations/getConversations']
    },
    current () {
      return this.$route.query.uuid
    }
  },
  methods: {
    toggleColorMode () {
      if (this.colorMode === 'dark') {
        this.$store.commit('layout/setColorMode', 'light')
      } else {
        this.$store.commit('layout/setColorMode', 'dark')
      }
    },
    logoutUser () {
      this.$store.commit('auth/logout')
      this.$router.push("/auth/login")
    },
    goTo (uuid) {
      this.$router.push({ query: { ...this.$route.query, uuid } })
    }
  }
}
</script>
