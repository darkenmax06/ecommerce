import { createContext, useState } from "react"

export const userContext = createContext()

function UserProvider ({children}){
  const [user,setUser] = useState(()=> {
    const hasStorage = JSON.parse(localStorage.getItem("user"))
    return hasStorage 
  })

  const saveUser = (user) => {
    const userToSave = JSON.stringify(user)
    setUser(user)
    localStorage.setItem("user",userToSave)
  }

  const logoutUser = ()=> {
    setUser(null)
    localStorage.clear("user")
  }

  return (
    <userContext.Provider value={{user,saveUser,logoutUser}} >
      {children}      
    </userContext.Provider>
  )
}


export default UserProvider