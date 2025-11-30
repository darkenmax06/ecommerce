import "./loginForm.css"
import useUser from "../../hooks/useUser"
import { useState } from "react"
import { Link } from "react-router-dom"
import ErrorAlert from "../inputAlerts/ErrorAlert"
import { MoveRight } from "lucide-react"
import ButtonLoader from "../loaders/ButtonLoader"

function LoginForm () {
  const {loginUser,error,loading,clearError} = useUser()
  const [user,setUser] = useState({
    email: "",
    password: ""
  })


  const handleForm = e => {
    e.preventDefault()
    loginUser(user)
  }

  const handleChange = e => {
    const {value,name} = e.target

    setUser(prev => ({...prev, [name]: value} ))
  }

  return (
    <section className="login">
      <form className="login__form" onSubmit={handleForm} >
        <h2 className="login__title">Iniciar sesion</h2>
        <div className="login__inputs">
          <input type="email" placeholder="email" name="email" className="login__input"  value={user.email} onChange={handleChange} />
          <input type="password" placeholder="password" name="password" className="login__input" value={user.password} onChange={handleChange} />
        </div>

        {error && <ErrorAlert error={error} clearError={clearError} /> }

        <button className="login__button">
          Iniciar sesion
          {
            loading
            ? <ButtonLoader/>
            :  <MoveRight/>
          }
        </button>
        <p>¿No tienes una cuenta? Creala <Link to="/signin" >Aqui</Link> </p>
      </form>
    </section>
  )
}

export default LoginForm