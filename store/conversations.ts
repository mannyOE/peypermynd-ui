import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import { ConversationStore, Conversation } from '~/interfaces/conversations'

export const state = () => <ConversationStore>({
  conversations: []
})

// this is what is exposed to those calling this state
export const getters = getterTree(state, {
  getConversations: state => state.conversations
})

// this is what is being done during a commit
export const mutations = mutationTree(state, {
  setConversations (state: ConversationStore, data: Conversation[]) {
    state.conversations = data
  }
})

// this calls the commit and hides the implementation from the Ui
export const actions = actionTree(
  { state, getters, mutations },
  {
    startConversation: async function ({ dispatch, rootGetters }, payload) {
      const authorization = `Bearer ${rootGetters["auth/token"]}`
      try {
        const result = await this.$axios.post('/api/files', payload, {
          headers: {
            Authorization: authorization,
            "Content-Type": "multipart/form-data"
          }
        })
        await dispatch('fetchAllConversations')
        return result.data
      } catch (error) {
        dispatch("errors/handleError", error, { root: true })
        return false
      }
    },
    fetchAllConversations: async function ({ dispatch, rootGetters, commit }, payload) {
      const authorization = `Bearer ${rootGetters["auth/token"]}`
      try {
        const result = await this.$axios.get('/api/chat', {
          headers: {
            Authorization: authorization
          }
        })
        commit('setConversations', result.data)
        return true
      } catch (error) {
        dispatch("errors/handleError", error, { root: true })
        return false
      }
    },
    sendMessage: async function ({ dispatch, rootGetters, commit }, payload) {
      const authorization = `Bearer ${rootGetters["auth/token"]}`
      try {
        const result = await this.$axios.post(`/api/chat`, payload, {
          headers: {
            Authorization: authorization
          }
        })
        dispatch("history/setHistory", {
          knowledgeId: payload.knowledgeId,
          details: [payload.question, result.data.text]
        }, { root: true })
        return result.data
      } catch (error) {
        dispatch("errors/handleError", error, { root: true })
        return false
      }
    },
  }
)
