import { useParams } from "react-router-dom"
import Layout from "../components/elements/Layout"
import CreateTargetForm from "../components/forms/CreateTargetForm"
import useTags from "../hooks/useTags"
import NotFound from "../components/notFound/NotFound"
import MainLoader from "../components/loaders/MainLoader"

function EditTarget () {
  const {targetId} = useParams()
  const {tag} = useTags(false,false,targetId)

  return (
  <Layout>
    {tag 
    ? <CreateTargetForm targetData={tag} />
    : <MainLoader/>
    }
  </Layout>
  )
}

export default EditTarget