import { useEffect, useState } from "react"    
import { getStatus } from "../services/statusService"
import useUser from "./useUser"


function useStatus (){
  const [status,setStatus] = useState(null)
  const {user} = useUser()

  useEffect(()=> {
    const load = async () => {
      try {
        const {token} = user
        const result = await getStatus({token})
        console.log(result)
        setStatus(result)
      } catch (err){
        console.log(err)
      }
    }

    load()
  },[user])

  return {
    status
  }
}

export default useStatus