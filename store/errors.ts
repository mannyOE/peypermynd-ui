import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import { ErrorStoreInterface } from '~/interfaces/errors'

export const state = () => <ErrorStoreInterface>({
  error: null,
  status: null
})

// this is what is exposed to those åcalling this state
export const getters = getterTree(state, {
  getError: state => state.error
})

// this is what is being done during a commit
export const mutations = mutationTree(state, {
  setError (state: ErrorStoreInterface, { error, status }) {
    state.status = status
    state.error = error
  }
})

// this calls the commit and hides the implementation from the Ui
export const actions = actionTree(
  { state, getters, mutations },
  {
    handleError: function ({ commit }, error) {
      let message = '', status = 0
      if (error.response) {
        // The error has a response object
        const { data, status } = error.response
        // You can handle different HTTP status codes here
        if (status === 401) {
          // Unauthorized (e.g., invalid credentials)
          message = 'Unauthorized. Please check your credentials.'
        } else if (status === 500) {
          // Internal Server Error
          message = 'Internal Server Error. Please try again later.'
        } else {
          message = data.message
        }
      } else if (error.request) {
        // The request was made but no response was received
        message = 'No response received. The server may be down.'
      } else {
        // Something else happened (e.g., an error in the request configuration)
        message = 'Request error:', error.message
      }
      commit('setError', {
        status, error: message
      })
    },
  }
)
