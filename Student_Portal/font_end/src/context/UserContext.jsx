import { useState } from "react"
import { createContext, useContext } from "react"



export const UserContext = createContext({
  name : "hassan",
  email : "dev.hassanali63@gmail.com"
})

export const UserContextProvider = ({children}) =>{
  const [activeUserData, setActiveUserData] = useState('')

  return (
    <UserContext.Provider value={{activeUserData, setActiveUserData}}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () =>{
  return useContext(UserContext)
}


