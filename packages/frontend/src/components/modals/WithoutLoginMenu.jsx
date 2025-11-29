import { Link } from "react-router-dom"
import { LogIn,UserCheck } from "lucide-react"

function WithoutLoginMenu (){
  return (
    <ul className="user-menu">
        <li>
            <Link to="/login" >
                <LogIn/>
                Iniciar sesion
            </Link>
        </li>

        <li>
            <Link to="/signin" >
                <UserCheck/>
                Crear cuenta
            </Link>
        </li>
    </ul>
  )
}

export default WithoutLoginMenu