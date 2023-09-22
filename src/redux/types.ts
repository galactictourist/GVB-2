export interface AuthState {
  id?: string
  wallet?: string
  loading: boolean
}

export interface CausesState { }

export interface TopicState { }

export interface AdminState {
  id?: string
  username?: string
  role?: string
  status?: string
  loading: boolean
  error?: string
}
