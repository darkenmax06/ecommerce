import { useParams } from "react-router-dom"
import useProducts from "../hooks/useProducts"
import P from "../components/sections/Product"
import NotFound from "../components/notFound/NotFound"
import MainLoader from "../components/loaders/MainLoader"


function ProductPage (){
  const {id} = useParams()
  const {product,loading} = useProducts({productId:id})
  
  return (
    <>
      {product && <P {...product} />}
      {(loading == false && !product) && <NotFound comment="Producto no encontrado." />}
      {(loading == true && !product) && <MainLoader  />}
    </>
  )
}

export default ProductPage