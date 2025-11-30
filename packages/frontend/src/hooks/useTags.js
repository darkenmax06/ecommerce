import { useEffect, useState } from "react"
import { create, getById, getTags,remove, update} from "../services/tagsServices"
import useUser from "./useUser"
import { useNavigate } from "react-router-dom"


function useTags (all=true,getAll = true,targetId){
  const navigate = useNavigate()
  const [tags,setTags] = useState(null)
  const [tag,setTag] = useState(null)
  const {token} = useUser()
  const [error,setError] = useState(null)

  const clearError = () => setError(null)
  const showError = err => setError(err)

  useEffect(() =>{ 
    const load = async ()=> {
      if (getAll){
        try {
          const result = await getTags()
          if (all) setTags([{targetId: crypto.randomUUID(),target: "Todos"},...result])
          else setTags(result.map(res => res.target)) 

        } catch (err) {
          console.log("errors",err)
        }
      } else if (targetId){
          try {
            const target = await getById(targetId)
            setTag(target)
          } catch(err){
            alert(err)
          }
      }
    }

    load()
  },[getAll,targetId,all])

  const createTags = async (tag) => {
    clearError()
    if (!tag || tag == "") return showError("Debes proporcionar un titulo para la ategoria")

    try {
      console.log(tag)
      await create(tag,token)
      navigate("/targets")
    } catch (err){
      showError(err)
    }
  }

  const deleteTags =  async (targetId) => {
    if (!targetId) return null

    const confirmation = confirm("¿estas seguro que deseas eliminar este articulo?")
    if (!confirmation) return null

    try {
      await remove(token,targetId)

      const filtredTags = tags.filter(res => res.targetId != targetId)
      setTags(filtredTags)

      alert("Categoria eliminada")
    }catch(err){
      alert(err)
    }
  }

  
  const editTags = async ({target,targetId}) => {
    clearError()

    if (target.length < 2) return showError("la categoria debe tener un minimo de 2 caracteres")

    try {
      await update({target},targetId,token)
      navigate("/targets")
    } catch (err) {
      showError(err)
    }

  }

  return {
    tags,
    error,
    createTags,
    deleteTags,
    tag,
    editTags
  }
}

export default useTags