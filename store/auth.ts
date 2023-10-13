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
    state.token = null,
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
    handleError: function ({ commit }, error) {
      if (error.response) {
        // The error has a response object
        const { data, status } = error.response
        console.error(`Request failed with status ${status}`)
        console.error('Error data:', data)

        // You can handle different HTTP status codes here
        if (status === 401) {
          // Unauthorized (e.g., invalid credentials)
          console.error('Unauthorized. Please check your credentials.')
        } else if (status === 500) {
          // Internal Server Error
          console.error('Internal Server Error. Please try again later.')
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received. The server may be down.')
      } else {
        // Something else happened (e.g., an error in the request configuration)
        console.error('Request error:', error.message)
      }
    },
    loginAction: async function ({ commit, dispatch }, payload) {
      try {
        const result = await this.$axios.post('/api/auth/login', payload)
        const { data: { user, token } } = result
        commit('setUser', user)
        commit('setUserToken', token)
      } catch (error) {
        dispatch('handleError', error)
      }
    }
  }
)
