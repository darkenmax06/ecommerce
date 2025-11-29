import { Edit, MoveRight } from "lucide-react"
import "./createTargetForm.css"
import { useState } from "react"
import "./select.css"
import useTags from "../../hooks/useTags"


function CreateTargetForm ({targetData}) {
  const [data,setData] = useState(()=> targetData ? targetData: { target:"" })
  const {createTags,error,editTags} = useTags()

  const handleChange = e => {
    const {name,value} = e.target

    setData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()


    if (!targetData) createTags(data)
    else editTags(data)
  }

  const Sign = ()=>  <> Crear Categoria <MoveRight/> </> 
  const Edith = ()=>  <> Editar Categoria <Edit/> </> 

  return (
    <section className="pt">
      <form className="pt__form" onSubmit={handleSubmit} >
        <h2 className="pt__title">{ targetData? "Editar Categoria" : "Crear Categoria" }</h2>

        <div className="pt__section">
          <div className="pt__inputs">
            <input 
              type="text" 
              placeholder="categoria" 
              name="target" 
              value={data.target}
              minLength={2}
              maxLength={50}
              required
              onChange={handleChange}
              className="pt__input"/>
              
          </div>
        </div>

        {error && <p>{error}</p>}

        <button className="pt__button">
          {
            targetData
            ? <Edith/>
            : <Sign/>
          }
        </button>
      </form>
    </section>
  )
}

export default CreateTargetForm

