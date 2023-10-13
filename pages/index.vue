<template>
  <div class="container">
    <CBox
      v-bind="mainStyles[colorMode]"
      d="flex"
      w="100vw"
      flex-dir="column"
      minH="100vh">
      <CFlex v-if="isLoggedIn" justify-content="start">
        <CBox :w="{ base: '0px', md: '25%' }" :d="{ base: 'none', md: 'block' }">
          <Sidebar />
        </CBox>
        <CBox :w="{ base: '100%', md: '75%' }" :d="{ base: 'block' }">
          <Navbar />
          <nuxt-child />
        </CBox>
      </CFlex>

      <CBox v-else :d="{ base: 'block' }">
        <!-- <Navbar /> -->
        <nuxt-child />
      </CBox>

    </CBox>
  </div>
</template>

<script lang="js">

export default {
  name: 'IndexPage',
  inject: ['$chakraColorMode', '$toggleColorMode'],
  data () {
    return {
      showModal: false,
      mainStyles: {
        dark: {
          bg: 'blue.500',
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
    },
    isLoggedIn () {
      return this.$store.getters['auth/isLoggedIn']
    }
  },
  methods: {
  }
}
</script>
