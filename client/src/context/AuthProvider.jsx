import {createContext, useContext, useState} from 'react'

const AuthContext = createContext()



const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)

    const login = (user) =>{
        setUser(user)
    }
    const logout = () =>{
        localStorage.removeItem('token')
    }
  return (
    <AuthContext.Provider value={{user,login,logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider
