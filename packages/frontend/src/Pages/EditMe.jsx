import SigninFormComponent from "../components/forms/SigninForm"
import NotFound from "../components/notFound/NotFound"
import useUser from "../hooks/useUser"

function EditMePage () {
  const {user} = useUser()

  return (
    <>
      {user
        ? <SigninFormComponent userData={user} />
        : <NotFound comment="No hay un usuario para realizar esta accion" />
      }
    </>
  )
}

export default EditMePage