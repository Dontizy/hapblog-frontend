// import {
//   createContext,
//   useCallback,
//   useContext,
//   useEffect,
//   useMemo,
//   useState,
//   type ReactNode,
// } from 'react'
// import type { User } from '@/lib/types'
// import { users } from '@/lib/mock-data'

// interface AuthState {
//   user: User | null
//   token: string | null
//   loading: boolean
//   login: (email: string, password: string) => Promise<void>
//   register: (name: string, email: string, password: string) => Promise<void>
//   logout: () => void
//   updateUser: (patch: Partial<User>) => void
// }

// const STORAGE_KEY = 'inkwell.auth'

// const AuthContext = createContext<AuthState | undefined>(undefined)

// // NOTE: This is a mock auth layer that mimics a JWT bearer-token flow.
// // Swap the bodies of login/register/logout with real fetch calls to your
// // API and store the returned token to integrate the backend later.
// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [token, setToken] = useState<string | null>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     try {
//       const raw =
//         typeof window !== 'undefined'
//           ? window.localStorage.getItem(STORAGE_KEY)
//           : null
//       if (raw) {
//         const parsed = JSON.parse(raw) as { token: string; userId: string }
//         const found = users.find((u) => u.id === parsed.userId)
//         if (found) {
//           setUser(found)
//           setToken(parsed.token)
//         }
//       }
//     } catch {
//       // ignore corrupt storage
//     }
//     setLoading(false)
//   }, [])

//   const persist = useCallback((nextUser: User, nextToken: string) => {
//     setUser(nextUser)
//     setToken(nextToken)
//     window.localStorage.setItem(
//       STORAGE_KEY,
//       JSON.stringify({ token: nextToken, userId: nextUser.id }),
//     )
//   }, [])

//   const login = useCallback(
//     async (email: string, _password: string) => {
//       await new Promise((r) => setTimeout(r, 600))
//       const found =
//         users.find((u) => u.email.toLowerCase() === email.toLowerCase()) ??
//         users[0]
//       persist(found, `mock.jwt.${found.id}.${Date.now()}`)
//     },
//     [persist],
//   )

//   const register = useCallback(
//     async (name: string, email: string, _password: string) => {
//       await new Promise((r) => setTimeout(r, 700))
//       const newUser: User = {
//         id: `u${Date.now()}`,
//         name,
//         username: name.toLowerCase().replace(/\s+/g, ''),
//         email,
//         avatar: '/avatars/sam.png',
//         bio: 'New to Inkwell. Just getting started.',
//         role: 'user',
//         joinedAt: new Date().toISOString().slice(0, 10),
//         followers: 0,
//         following: 0,
//       }
//       persist(newUser, `mock.jwt.${newUser.id}.${Date.now()}`)
//     },
//     [persist],
//   )

//   const logout = useCallback(() => {
//     setUser(null)
//     setToken(null)
//     window.localStorage.removeItem(STORAGE_KEY)
//   }, [])

//   const updateUser = useCallback((patch: Partial<User>) => {
//     setUser((prev) => {
//       if (!prev) return prev
//       const next = { ...prev, ...patch }
//       const raw = window.localStorage.getItem(STORAGE_KEY)
//       if (raw) {
//         const parsed = JSON.parse(raw)
//         window.localStorage.setItem(
//           STORAGE_KEY,
//           JSON.stringify({ ...parsed, userId: next.id }),
//         )
//       }
//       return next
//     })
//   }, [])

//   const value = useMemo(
//     () => ({ user, token, loading, login, register, logout, updateUser }),
//     [user, token, loading, login, register, logout, updateUser],
//   )

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
// }

// export function useAuth() {
//   const ctx = useContext(AuthContext)
//   if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
//   return ctx
// }
