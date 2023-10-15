<template>
  <div>
    <CBox
      d="flex"
      py="2"
      borderBottom="1px"
      h="60px"
      px="3"
      alignItems="center"
      justify-content="space-between">
      <c-flex gap="3" align-items="center">
        <c-button bg="transparent" :_hover="{ bg: 'transaprent' }" :_active="{ bg: 'transaprent' }"
          :d="{ base: 'block', md: 'none' }" @click="isOpen = true">
          <c-icon name="menu" />
        </c-button>
      </c-flex>
      <c-box>
        <c-box :d="{ base: 'block', md: 'none' }">
          <AddKnowledge :showFullButton="false" />
        </c-box>
      </c-box>
    </CBox>

    <c-drawer v-if="isOpen" :isOpen="isOpen" size="xs" placement="left" :on-close="close">
      <c-drawer-overlay />
      <c-drawer-content v-bind="mainStyles[colorMode]" px="0" w="65%">
        <c-drawer-body px="0">
          <Sidebar :showFullButton="true" />
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
  inject: ['$chakraColorMode', '$toggleColorMode'],
  data () {
    return {
      mainStyles: {
        dark: {
          bg: 'blue.500',
          color: 'whiteAlpha.900'
        },
        light: {
          bg: 'white',
          color: 'gray.900'
        }
      },
      isOpen: false
    }
  },
  computed: {
    colorMode () {
      return this.$store.getters['layout/getColorMode']
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
    close () {
      this.isOpen = false
    },
    logoutUser () {
      this.$store.commit('auth/logout')
      this.$router.push("/auth/login")
    }
  }
}
</script>
