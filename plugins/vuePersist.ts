import { Plugin } from '@nuxt/types'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'

const ls = new SecureLS({
  isCompression: false,
  encryptionSecret: process.env.ENCRYPTION_SECRET,
  encodingType: 'aes',
})

const vuexPersist: Plugin = ({ store }) => {
  createPersistedState({
    key: 'peypermynd',
    paths: ['auth', 'layout'],
    storage: {
      getItem: (key) => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: (key) => ls.remove(key),
    },
  })(store)
}

export default vuexPersist
