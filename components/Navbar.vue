<template>
  <CBox
    d="flex"
    w="100vw"
    py="2"
    borderBottom="1px"
    min="40px"
    alignItems="center"
    justify-content="space-between">
    <CBox>
      <CIconButton
        :display="{ base: 'block', md: 'none' }"
        :variant="colorMode === 'light' ? 'gray.200' : 'gray.600'"
        mr="3"
        border="1px"
        borderColor="gray.400"
        :icon="colorMode === 'light' ? 'moon' : 'sun'"
        :aria-label="`Switch to ${colorMode === 'light' ? 'dark' : 'light'
          } mode`
          "
        @click="toggleColorMode" />
    </CBox>
    <CBox>
      <CIconButton
        :variant="colorMode === 'light' ? 'gray.200' : 'gray.600'"
        mr="3"
        border="1px"
        borderColor="gray.400"
        :icon="colorMode === 'light' ? 'moon' : 'sun'"
        :aria-label="`Switch to ${colorMode === 'light' ? 'dark' : 'light'
          } mode`
          "
        @click="toggleColorMode" />
    </CBox>
  </CBox>
</template>

<script lang="js">
import {
  CBox,
  CButton,
  CAvatarGroup,
  CAvatar,
  CAvatarBadge,
  CModal,
  CModalContent,
  CModalOverlay,
  CModalHeader,
  CModalFooter,
  CModalBody,
  CModalCloseButton,
  CIconButton,
  CFlex,
  CHeading
} from '@chakra-ui/vue'

export default {
  name: 'IndexPage',
  components: {
    CBox,
    CButton,
    CAvatarGroup,
    CAvatar,
    CAvatarBadge,
    CModal,
    CModalContent,
    CModalOverlay,
    CModalHeader,
    CModalFooter,
    CModalBody,
    CModalCloseButton,
    CIconButton,
    CFlex,
    CHeading
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
    }
  }
}
</script>
