import "./select.css"
import { useEffect, useState } from "react"

function Select ({placeholder= "Selecciona",tags,cb,name,data,autoUpdate = true}){
  const [value,setValue] = useState(data || placeholder)
  const [isVisible,setIsVisible] = useState(false)

  const handleSelect = value => {
    setValue(value)
    cb({target:{name,value}})
  }

  useEffect(()=> {
    if (data && autoUpdate){
      setValue(data)
      cb({target:{name,value:data}})
    }
  },[data])

  const handleVisibility = ()=> setIsVisible(!isVisible)
 
  return (
      <div className="filter" onClick={handleVisibility} >
        <div className="filter__selected-value"  >
          {value}
        </div>
        
        <ul className={isVisible ? "filter__list active": "filter__list"} >
          {
            (tags && tags.length > 0) 
            ? tags.map(res => <li key={res} className="filter__item" onClick={()=> handleSelect(res)} > { res} </li>)
            : <li className="filter__item"> Debes llenar el campo anterior </li>
          }
        </ul>
      </div>
  )
}

export default Select