import { Link } from "react-router-dom"
import "./loginMessage.css"

function LoginMessage () {
  return (
    <div className="lm">
      <h2 className="message" >Inicia sesion para poder comentar los productos</h2>
      <Link to="/login" >Iniciar sesion </Link>
    </div>
  )
}


export default LoginMessage