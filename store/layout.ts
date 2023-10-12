import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import { LayoutStoreInterface } from '~/interfaces/layout'

export const state = () => <LayoutStoreInterface>({
  colorMode: 'dark'
})

// this is what is exposed to those calling this state
export const getters = getterTree(state, {
  getColorMode: (state: LayoutStoreInterface) => state.colorMode,
})

// this is what is being done during a commit
export const mutations = mutationTree(state, {
  setColorMode (state: LayoutStoreInterface, mode: 'dark' | 'light') {
    state.colorMode = mode
  }
})

// this calls the commit and hides the implementation from the Ui
export const actions = actionTree(
  { state, getters, mutations },
  {
  }
)
