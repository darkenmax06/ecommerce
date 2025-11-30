import { useEffect, useMemo, useState } from "react"
import { create, getProduct, getProducts,remove,update } from "../services/productsServices"
import useTags from "./useTags";
import useUser from "./useUser"
import { useNavigate } from "react-router-dom";
import validateProduct from "../utils/validateProduct";

function useProducts ({category = "Todos",title = "",productId = null,getAll = true} = {}){
  const [products,setProducts] = useState(null)
  const [product,setProduct] = useState(null)
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(null)
  const navigate = useNavigate()
  const {tags} = useTags()
  const {token}= useUser()

  const clearError = () => setError(null)
  const showError = err => setError(err)

  useEffect(()=> {
    const load = async ()=> {
      if (getAll){
        try {
          const result = await getProducts()

          // obtener solo la 1ra Imagen
          const parsedResult = result.map(res=> ({...res,imgUri:res.imgUris[0]}))
          setProducts(parsedResult)
        } catch (err) {
          console.log("errors",err)
        }
      } 

      if (productId) {
        try {
          const result = await getProduct({productId})
          setProduct(result)
        } catch (err){
          console.error("error", err)
        } finally {
          setLoading(false)
        }
      }
    }
    
    load()
  },[getAll,productId])


  const filterProducts = useMemo(()=> {
    return products && products.filter(res =>  
      (title == "" || res.title.toLocaleLowerCase().includes(title.toLocaleLowerCase())) &&
      (category == "Todos" || res.target == category)
    )
  },[category,products,title])


  const createProduct = async (product) => {
    clearError()
    const objectForValidate = Object.fromEntries(product)

    objectForValidate.imgUris = product.getAll("imgUris")

    const isValidProduct = validateProduct({...objectForValidate,showError})
    if (!isValidProduct) return null


    const target =tags.find(res => res.target == objectForValidate.target).targetId

    product.append("targetId",target)
    product.delete("target")

    try {
      await create(product,token)
      navigate("/products")
    } catch (err) {
      showError(err)
    }

  }

  const editProducts = async (product) => {
    clearError()


    const isValidProduct = validateProduct({...product,edit: true})
    if (!isValidProduct) return null

    const target = tags.find(res => res.target == product.target).targetId

    const parsedProduct = {...product}

    parsedProduct.targetId = target + ""
    parsedProduct.price = product.price + ""
    parsedProduct.quantity = product.quantity +""

    delete parsedProduct.target

    const {productId,...productToSend} = parsedProduct

    try {
      await update(productToSend,token,productId)
      navigate("/products")
    } catch (err) {
      showError(err)
    }

  }

  const deleteProducts = async ({productId}) => {
    if (!productId) return null

    try {
      const confirmation = confirm("¿estas seguro que deseas eliminar este articulo?")
      if (!confirmation) return null

      await remove(token,productId)

      const filtedProducts = products.filter(res => res.productId !== productId)
      setProducts(filtedProducts)

      alert("producto eliminado")
    }catch(err){
      alert(err)
    }
  }
  

  return {
    products: filterProducts,
    product,
    editProducts,
    createProduct,
    error,
    deleteProducts,
    loading
  }
}

export default useProducts