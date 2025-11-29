import { useParams } from "react-router-dom"
import Layout from "../components/elements/Layout"
import useProducts from "../hooks/useProducts"
import P from "../components/sections/Product"
import useComments from "../hooks/useComments"


function Product (){
  const {id} = useParams()
  const {product} = useProducts({productId:id})
  const {comments,createComment,error} = useComments({productId: id}) 

  return (
    <Layout>
      {product && <P comments={comments} {...product} createComment={createComment} error={error} />}
    </Layout>
  )
}

export default Product