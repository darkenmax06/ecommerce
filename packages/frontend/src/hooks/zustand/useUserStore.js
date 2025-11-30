import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(persist((set)=> {
  return {
    user: null,
    token: null,
    saveUser: (user) => {
      set({user,token: user.token})
    },
    logoutUser: ()=> set({user: null})
  }
},{
  name: "user"
}))

export default useUserStore