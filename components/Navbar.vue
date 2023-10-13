<template>
  <CBox
    d="flex"
    py="2"
    borderBottom="1px"
    h="60px"
    px="3"
    alignItems="center"
    justify-content="space-between">
    <CBox>
      <c-button bg="transparent" :_hover="{ bg: 'transaprent' }" :_active="{ bg: 'transaprent' }"
        :d="{ base: 'block', md: 'none' }">
        <c-icon name="menu" />
      </c-button>
    </CBox>
    <c-box>
      <c-button bg="transparent" :_hover="{ bg: 'transaprent' }" :_active="{ bg: 'transaprent' }"
        :d="{ base: 'block', md: 'none' }">
        <c-icon name="plus" />
      </c-button>
    </c-box>
  </CBox>
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
          bg: 'gray.700',
          color: 'whiteAlpha.900'
        },
        light: {
          bg: 'white',
          color: 'gray.900'
        }
      }
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
    logoutUser () {
      this.$store.commit('auth/logout')
      this.$router.push("/auth/login")
    }
  }
}
</script>
