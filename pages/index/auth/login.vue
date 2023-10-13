<template>
  <form autocomplete="off" @submit.prevent="submitForm">
    <CFlex direction="column" justify="center" alignItems="center" h="75vh">
      <CText fontWeight="bolder" fontSize="2xl" color="">Welcome back</CText>
      <CText fontWeight="medium" fontSize="sm" color="">Let's get you back in</CText>
      <CBox fontSize="xs" mt="10" w="100%">
        <CFormControl isRequired :isInvalid="errors.email">
          <CFormLabel for="floating-input">Email address</CFormLabel>
          <CInput
            v-model="payload.email"
            type="email"
            autocomplete="off"
            id="floating-input"
            color="white"
            bg="black"
            border="1px"
            borderColor="blue.700"
            :_hover="{ bg: 'black' }"
            variant="filled"
            class="custom-input-class"
            placeholder="solomon.lar@gmail.com" />
        </CFormControl>
      </CBox>

      <CBox fontSize="xs" mt="5" w="100%">
        <CFormControl isRequired>
          <CFormLabel for="floating-input-password">Password</CFormLabel>
          <c-input-group size="md">
            <CInput
              v-model="payload.password"
              pr="4.5rem"
              :type="show ? 'text' : 'search'"
              id="floating-input-password"
              color="white"
              bg="black"
              border="1px"
              :autocomplete="show ? 'off' : 'new-password'"
              :class="show ? '' : 'password'"
              borderColor="blue.700"
              :_hover="{ bg: 'black' }"
              variant="filled"
              placeholder="********" />
            <c-input-right-element>
              <c-button h="1.75rem" outline="none" :_focus="{ outline: 'none' }" :_active="{ bg: 'transparent' }"
                :_hover="{ bg: 'transparent' }" bg="transparent" mr="5" size="sm"
                @click="show = !show">
                {{ show ? 'Hide' : 'Show' }}
              </c-button>
            </c-input-right-element>
          </c-input-group>
        </CFormControl>
      </CBox>
      <CButton :isLoading="isSubmitting" py="5" type="submit" :_focus="{ outline: 'none' }"
        :isDisabled="$v.payload.$invalid" mt="5"
        variant-color="blue"
        w="100%">
        Login
      </CButton>
      <CFlex :w="{ base: '100%', md: '80%' }" my="4" gap="2">
        Don't have an account already? <c-link color="blue.500" to="/auth/signup" as="nuxt-link">
          Register here
        </c-link>
      </CFlex>
    </CFlex>
  </form>
</template>

<script lang="js">
import { mapActions, mapGetters } from "vuex"
import { required, email } from 'vuelidate/lib/validators'
import {
  CBox, CText, CInput, CFormControl, CFormLabel, CFormHelperText, CButton
} from '@chakra-ui/vue'

export default {
  name: 'IndexPage',
  components: {
    CBox, CText, CInput, CFormControl, CFormLabel, CFormHelperText, CButton
  },
  data () {
    return {
      show: false,
      errors: {},
      isSubmitting: false,
      payload: {
        email: "",
        password: ""
      }
    }
  },
  watch: {
    getError (val) {
      this.$toast({
        title: 'Failed',
        description: val,
        status: 'error',
        duration: 2000,
        isClosable: false
      })
    }
  },
  validations () {
    return {
      payload: {
        email: { required, email }, // Matches this.contact.email
        password: { required }
      }
    }
  },
  computed: {
    ...mapGetters('errors', ['getError'])
  },
  methods: {
    ...mapActions('auth', ['loginAction']),
    async submitForm () {
      this.isSubmitting = true
      const done = await this.loginAction(this.payload)
      this.isSubmitting = false
      if (done) {
        this.$router.push('/app')
      }
    },
  }
}
</script>

<style scoped>
.password {
  -webkit-text-security: disc;
}

.password::-webkit-search-cancel-button {
  display: none;
}
</style>
