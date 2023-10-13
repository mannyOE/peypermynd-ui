import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import { AuthStoreInterface, UserAccountInterface } from '~/interfaces/auth'

export const state = () => <AuthStoreInterface>({
  user: null,
  token: null,
  isLoggedIn: false
})

// this is what is exposed to those calling this state
export const getters = getterTree(state, {
  user: (state: AuthStoreInterface) => state.user,
  token: (state: AuthStoreInterface) => state.token,
  isLoggedIn: (state: AuthStoreInterface) => state.isLoggedIn
})

// this is what is being done during a commit
export const mutations = mutationTree(state, {
  logout: (state: AuthStoreInterface): void => {
    state.user = null
    state.token = null
    state.isLoggedIn = false
  },
  setUser (state: AuthStoreInterface, user: UserAccountInterface) {
    state.user = user
  },
  setUserToken (state: AuthStoreInterface, token: string) {
    state.token = token
    state.isLoggedIn = true
  }
})

// this calls the commit and hides the implementation from the Ui
export const actions = actionTree(
  { state, getters, mutations },
  {
    logout: ({ commit }) => {
      commit('logout')
    },
    loginAction: async function ({ commit, dispatch }, payload) {
      try {
        const result = await this.$axios.post('/api/auth/login', payload)
        const { data: { user, token } } = result
        commit('setUser', user)
        commit('setUserToken', token)
        return true
      } catch (error) {
        dispatch("errors/handleError", error, { root: true })
        return false
      }
    },
    registerAccountAction: async function ({ dispatch }, payload) {
      try {
        await this.$axios.post('/api/user', payload)
        return true
      } catch (error) {
        dispatch("errors/handleError", error, { root: true })
        return false
      }
    }
  }
)
