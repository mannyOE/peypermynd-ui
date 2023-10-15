<template>
  <div class="container">
    <CFlex :px="{ base: '4', md: '20' }" py="10" gap="10" justify-content="space-between">
      <CBox :w="{ md: '40%', base: '100%' }" boxShadow="lg" bg="blue.800" rounded="lg" minH="600px" p="10">
        <CFlex direction="column" justify="space-between">
          <CBox minH="550px">
            <nuxt-child />
          </CBox>
          <CFlex h="50px" direction="column">
            <CBox textAlign="center" color="gold" fontWeight="bolder">
              PEYPERMYND
            </CBox>
            <CFlex justify="center" fontSize="xs" gap="2">
              <nuxt-link to="/tos">Terms of use</nuxt-link>|<nuxt-link to="/privacy-policy">Privacy policy</nuxt-link>
            </CFlex>
          </CFlex>
        </CFlex>
      </CBox>
      <CBox w="60%" :d="{ base: 'none', md: 'block' }">

      </CBox>
    </CFlex>
  </div>
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
