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
  head: {
    title: "Talk with your documents - Peypermynd",
    link: [
      {
        rel: "canonical",
        href: window.location.origin
      }
    ],
    meta: [
      {
        hid: "description",
        name: "description",
        content:
          "Have a conversation with your documents. Pdfs, Csvs, xlsx, docx, pptx"
      },
      {
        hid: "keywords",
        name: "keywords",
        content:
          "documents, ai, pdfs, csvs, xslx, docx, pptx"
      },
      {
        hid: "robots",
        name: "robots",
        content: "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large"
      },
      {
        hid: "publisher",
        name: "publisher",
        content: "Peypermynd"
      },
      {
        property: "og:type",
        content: "website"
      },
      {
        property: "og:url",
        content: location.origin
      },
      {
        property: "og:title",
        content: "Talk with your documents - Peypermynd"
      },
      {
        property: "og:description",
        content:
          "Have a conversation with your documents. Pdfs, Csvs, xlsx, docx, pptx"
      },
      {
        property: "og:image",
        content: "https://kippa.africa/images/logos/logo-icon-sm.png"
      },
      {
        property: "twitter:card",
        content: "summary_large_image"
      },
      {
        property: "twitter:url",
        content: location.origin
      },
      {
        property: "twitter:title",
        content: "Talk with your documents - Peypermynd"
      },
      {
        property: "twitter:description",
        content:
          "Have a conversation with your documents. Pdfs, Csvs, xlsx, docx, pptx"
      },
      {
        property: "twitter:image",
        content: "https://kippa.africa/images/logos/logo-icon-sm.png"
      }
    ]
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
