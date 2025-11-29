import Layout from "../components/elements/Layout"
import SigninForm from "../components/forms/SigninForm"
import useUser from "../hooks/useUser"

function EditMe () {
  const {user} = useUser()

  console.log(user)

  return (
  <Layout>
    {user && <SigninForm userData={user} />}
  </Layout>
  )
}

export default EditMe