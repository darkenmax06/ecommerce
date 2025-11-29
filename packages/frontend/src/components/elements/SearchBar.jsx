import useInput from "../../hooks/useInput"
import useTags from "../../hooks/useTags"
import { useState } from "react"

function SearchBar ({filter,filterCategory,filterTitle}){
  const {value,changeValue} = useInput({filterTitle,time: 300})
  const [isVisible,setIsVisible] = useState(false)
  const {tags} = useTags()

  const handleFilter = value => filterCategory(value)
  const handleVisibility = () => setIsVisible(!isVisible)
  const handleChange = e => changeValue(e.target.value)
 
  return (
    <form className="search">
      <input type="text" placeholder="Buscar producto" value={value} onChange={handleChange}/>
      <div className="filter" onClick={handleVisibility} >
        <div className="filter__selected-value">
          {filter.category}
        </div>
        
        <ul className={isVisible ? "filter__list active": "filter__list"} >
          {
            tags && tags.map(res => <li key={res.targetId} className="filter__item" onClick={()=> handleFilter(res.target)} > { res.target} </li>)
          }
        </ul>
      </div>
    </form>
  )
}

export default SearchBar