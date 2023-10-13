<template>
  <form autocomplete="off" @submit.prevent="submitForm">
    <CFlex direction="column" justify="center" alignItems="center" h="75vh">
      <CText fontWeight="bolder" fontSize="2xl" color="">Welcome</CText>
      <CText fontWeight="medium" fontSize="sm" color="">It's good to have you with us</CText>
      <CFlex fontSize="xs" mt="10" w="100%" gap="3" :direction="{ base: 'column', md: 'row' }">
        <CBox :w="{ base: '100%', md: '50%' }">
          <CFormControl isRequired :isInvalid="errors.firstName">
            <CFormLabel for="floating-firstname">First name</CFormLabel>
            <CInput
              v-model="payload.firstName"
              type="text"
              autocomplete="off"
              id="floating-firstname"
              color="white"
              bg="black"
              border="1px"
              borderColor="blue.700"
              :_hover="{ bg: 'black' }"
              variant="filled"
              class="custom-input-class"
              placeholder="Solomon" />
          </CFormControl>
        </CBox>
        <CBox :w="{ base: '100%', md: '50%' }">
          <CFormControl isRequired :isInvalid="errors.lastName">
            <CFormLabel for="floating-lastname">Last name</CFormLabel>
            <CInput
              v-model="payload.lastName"
              type="text"
              autocomplete="off"
              id="floating-lastname"
              color="white"
              bg="black"
              border="1px"
              borderColor="blue.700"
              :_hover="{ bg: 'black' }"
              variant="filled"
              class="custom-input-class"
              placeholder="Lar" />
          </CFormControl>
        </CBox>
      </CFlex>
      <CBox fontSize="xs" mt="3" w="100%">
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

      <CBox fontSize="xs" mt="3" w="100%">
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

      <CBox fontSize="xs" mt="3" w="100%">
        <CFormControl isRequired :isInvalid="errors.username">
          <CFormLabel for="floating-username">Username</CFormLabel>
          <CInput
            v-model="payload.username"
            type="text"
            autocomplete="off"
            id="floating-username"
            color="white"
            bg="black"
            border="1px"
            borderColor="blue.700"
            :_hover="{ bg: 'black' }"
            variant="filled"
            class="custom-input-class"
            placeholder="solomon223" />
        </CFormControl>
      </CBox>
      <CButton py="5" :_focus="{ outline: 'none' }" :isDisabled="$v.payload.$invalid" mt="5" variant-color="blue"
        w="100%">
        Register
      </CButton>
      <CFlex :w="{ base: '100%', md: '60%' }" my="4" gap="2">
        Have an account already? <c-link to="/auth/login" as="nuxt-link">
          Login
        </c-link>
      </CFlex>
    </CFlex>
  </form>
</template>

<script lang="js">
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
      payload: {
        email: "",
        password: "",
        username: "",
        firstName: "",
        lastName: ""
      }
    }
  },
  validations () {
    return {
      payload: {
        email: { required, email }, // Matches this.contact.email
        password: { required },
        username: { required },
        firstName: { required },
        lastName: { required }
      }
    }
  },
  computed: {

  },
  methods: {
    submitForm () {
      this.$v.formData.$touch()

      if (!this.$v.formData.$invalid) {
        // Form is valid, submit the data
        // Perform your API request or other actions here
      } else {
        // Form is invalid, display an error message or take appropriate action
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
