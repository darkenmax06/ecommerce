import { useParams } from "react-router-dom"
import Layout from "../components/elements/Layout"
import useProducts from "../hooks/useProducts"
import P from "../components/sections/Product"
import NotFound from "../components/notFound/NotFound"
import MainLoader from "../components/loaders/MainLoader"


function Product (){
  const {id} = useParams()
  const {product,loading} = useProducts({productId:id})
  
  return (
    <Layout>
      {product && <P {...product} />}
      {(loading == false && !product) && <NotFound comment="Producto no encontrado." />}
      {(loading == true && !product) && <MainLoader  />}
    </Layout>
  )
}

export default Product