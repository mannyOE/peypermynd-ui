import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import { HistoryStore, HistoryInputData } from '~/interfaces/conversations'

export const state = () => <HistoryStore>({
  history: {}
})

// this is what is exposed to those calling this state
export const getters = getterTree(state, {
  getHistory: (state) => (knowledgeId: string) => state.history && state.history[knowledgeId] ? state.history[knowledgeId] : [],
})

// this is what is being done during a commit
export const mutations = mutationTree(state, {
  setHistory (state: HistoryStore, data: HistoryInputData) {
    const copyData = { ...state.history }
    if (copyData[data.knowledgeId]) {
      copyData[data.knowledgeId].push(data.details)
    } else {
      copyData[data.knowledgeId] = [data.details]
    }
    state.history = copyData
  }
})

// this calls the commit and hides the implementation from the Ui
export const actions = actionTree(
  { state, getters, mutations },
  {
    setHistory: function ({ commit }, data: HistoryInputData) {
      commit('setHistory', data)
    },
  }
)
