import { useParams } from "react-router-dom"
import Layout from "../components/elements/Layout"
import CreateTargetForm from "../components/forms/CreateTargetForm"
import useTags from "../hooks/useTags"

function EditTarget () {
  const {targetId} = useParams()
  const {tag} = useTags(false,false,targetId)

  console.log(tag)

  return (
  <Layout>
    {tag && <CreateTargetForm targetData={tag} />}
  </Layout>
  )
}

export default EditTarget