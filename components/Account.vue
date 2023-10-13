<template>
  <c-popover
    initialFocusRef="#next"
    placement="bottom">
    <c-popover-trigger>
      <CIconButton
        :variant-color="colorMode === 'light' ? 'gray.200' : 'gray.600'"
        :icon="'user'"
        :_focus="{ outline: 'none' }"
        :color="colorMode === 'light' ? 'gray.600' : 'gray.50'" />
    </c-popover-trigger>
    <c-popover-content
      z-index="4"
      color="white"
      background-color="blue.700"
      border-color="blue.700">
      <c-popover-header pt="4" font-weight="bold" border="0">
        Accounts
      </c-popover-header>
      <c-popover-close-button />
      <c-popover-body>
        <CButton w="100%" variant-color="blue" @click="$emit('logout')">Logout</CButton>
      </c-popover-body>
    </c-popover-content>
  </c-popover>
</template>

<script lang="js">
export default {
  props: ["colorMode"],
  components: {

  }
}
</script>

<style scoped></style>