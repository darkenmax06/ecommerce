import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(persist((set)=> {
  return {
    user: null,
    saveUser: (user) => set({user}),
    logoutUser: ()=> set({user: null})
  }
},{
  name: "user"
}))

export default useUserStore