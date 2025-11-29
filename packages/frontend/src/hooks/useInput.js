import { useEffect, useRef, useState } from "react"

function useInput ({time = 3000,filterTitle} = {}){
  const [value,setValue] = useState('')
  const prevValue = useRef(value)

  const changeValue = value => setValue(value)

  useEffect(()=> {
    if (prevValue.current === value) return 

    const interval = setTimeout(()=> {
      filterTitle(value)
      prevValue.current = value
    },time)

    return ()=> clearTimeout(interval)
  },[value,time,filterTitle])

  return {
    value,
    changeValue
  }
}

export default useInput