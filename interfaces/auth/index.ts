export interface UserAccountInterface {
  firstName: string
  lastName: string
  email: string
  username: string
}

export interface AuthStoreInterface {
  user: UserAccountInterface | null
  token: string | null
  isLoggedIn: boolean
}