import { useEffect, useMemo, useState } from "react"
import { create, getProduct, getProducts,remove,update } from "../services/productsServices"
import useTags from "./useTags";
import useUser from "./useUser"
import { useNavigate } from "react-router-dom";

function validateProduct({ title, description, quantity, price, target,showError, imgUris,edit }) {
    
    const validateText = (field, fieldName,MAX_LENGTH=50,MIN_LENGTH=2) => {
        const trimmed = field.trim();
        if (trimmed.length < MIN_LENGTH) {
            showError(`El campo ${fieldName} debe tener al menos ${MIN_LENGTH} caracteres.`);
            return false;
        }
        if (trimmed.length > MAX_LENGTH) {
            showError(`El campo ${fieldName} no debe exceder los ${MAX_LENGTH} caracteres.`);
            return false;
        }
        return true;
    };

    const validateNumber = (field, fieldName,min=1) => {
        if (field < min) {
            showError(`El minimo para el campo ${fieldName} es de: ${min}.`);
            return false;
        }
        return true;
    };    
    
    if (!validateText(title, "Titulo")) return false;
    if (!validateText(description, "Descripcion")) return false;
    if (!validateNumber(target, "Categoria")) return false;
    if (!validateNumber(quantity, "Cantidad")) return false;
    if (!validateNumber(price, "Precio")) return false;

    if (edit) return true

    if (imgUris.length < 1) {
      showError("Para crear un producto es requerido almenos 2 imagenes")
      return false
    }

    for (let img of imgUris){
      if (img.size > 5000000){
         showError(`EL tamaño de las imagenes seleccionadas no puede ser mayor a  5MB.`);
         return false
      }

    }
    return true;
}

function useProducts ({category = "Todos",title = "",productId = null,getAll = true} = {}){
  const [products,setProducts] = useState(null)
  const [product,setProduct] = useState(null)
  const [error,setError] = useState(null)
  const navigate = useNavigate()
  const {tags} = useTags()
  const {user}= useUser()

  const clearError = () => setError(null)
  const showError = err => setError(err)

  useEffect(()=> {
    const load = async ()=> {
      if (getAll){
        console.log("getAl")
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
      const {token} = user
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
      const {token} = user
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

      const token = user.token
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
    deleteProducts
  }
}

export default useProducts