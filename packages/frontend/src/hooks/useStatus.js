import { useEffect, useState } from "react"    
import { getStatus } from "../services/statusService"
import useUser from "./useUser"


function useStatus (){
  const [status,setStatus] = useState(null)
  const {token} = useUser()

  useEffect(()=> {
    const load = async () => {
      try {
        const result = await getStatus({token})
        console.log(result)
        setStatus(result)
      } catch (err){
        console.log(err)
      }
    }

    load()
  },[token])

  return {
    status
  }
}

export default useStatus