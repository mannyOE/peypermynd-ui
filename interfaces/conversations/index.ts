interface User {
  createdAt: string
  firstName: string
  lastName: string
  username: string
  email: string
}

export interface Conversation {
  createdAt: string
  id: number
  uuid: string
  title: string
  filePath: string
  chatHistory: Record<string, unknown> // You can replace this with the actual chat history type
  user: User
}


export interface ConversationStore {
  conversations: Conversation[]
}

export interface HistoryStore {
  history: any | null
}

export interface HistoryInputData {
  knowledgeId: string
  details: string[]
}