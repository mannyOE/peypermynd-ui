<template>
  <CFlex direction="column" justify="center" alignItems="center" h="75vh">
    <CText fontWeight="bolder" fontSize="2xl" color="">Get Started</CText>
    <c-link to="/auth/login" as="nuxt-link" w="100%" mt="5">
      <CButton variant-color="blue" w="100%">
        Login
      </CButton>
    </c-link>
    <c-link to="/auth/signup" as="nuxt-link" w="100%" mt="4">
      <CButton variant-color="blue" w="100%">
        Register
      </CButton>
    </c-link>
  </CFlex>
</template>

<script lang="js">

export default {
  name: 'IndexPage',
  components: {
  },
  data () {
    return {

    }
  },
  computed: {

  },
  methods: {

  }
}
</script>
