import { useParams } from "react-router-dom"
import Layout from "../components/elements/Layout"
import CreateProductsForm from "../components/forms/CreateProductForm"
import useProducts from "../hooks/useProducts"
import NotFound from "../components/notFound/NotFound"
import MainLoader from "../components/loaders/MainLoader"

function EditProductsPage () {
  const {productId} = useParams()
  const {product} = useProducts({productId})

  return (
  <Layout>
    {product
    ? <CreateProductsForm productData={product} />
    : <MainLoader/>}
  </Layout>
  )
}

export default EditProductsPage