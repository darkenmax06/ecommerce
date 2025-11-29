import { useParams } from "react-router-dom"
import Layout from "../components/elements/Layout"
import CreateProductsForm from "../components/forms/CreateProductForm"
import MyProducts from "../components/sections/Myproducts"
import useProducts from "../hooks/useProducts"

function EditProducts () {
  const {productId} = useParams()
  const {product} = useProducts({productId})

  return (
  <Layout>
    {product && <CreateProductsForm productData={product} />}
  </Layout>
  )
}

export default EditProducts