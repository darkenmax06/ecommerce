import { Edit, MoveRight } from "lucide-react"
import "./signinForm.css"
import { useState } from "react"
import "./select.css"
import useAddress from "../../hooks/useAddress"
import useUser from "../../hooks/useUser"
import Select from "./Select"
import { Link } from "react-router-dom"
import ErrorAlert from "../inputAlerts/ErrorAlert"
import ButtonLoader from "../loaders/ButtonLoader"

const userSchema = {
  name: "", lastName: "", cityId: "", provinceId: "", street: "", reference: "", phone: "", email: "", password: "", confirmPassword: ""
}

function SigninForm ({userData}) {
  const {createUser,error,updateUser,loading,clearError} = useUser()
  const {cities,provinces,updateCity,updateProvince,province,city} = useAddress({province: userData?.province, city: userData?.city})
  const [data,setData] = useState(()=> userData ?? {...userSchema, confirmPassword: userSchema.password})


  const handleChange = e => {
    const {name,value} = e.target

    if (name == "cityId" || name == "provinceId") {
      let id = null

      if (name == "cityId")  id = updateCity(value)
      else   id = updateProvince(value)

      setData(prev => ({...prev, [name]: id }))

    } else {
      setData(prev => ({...prev, [name]: value }))
    }
  }

  const handleSubmit = e => {
    e.preventDefault()

    if(loading) return null

    if (userData) updateUser(data)
    else createUser(data)
  }

  const Sign = ()=>  <> Crear cuenta {loading ? <ButtonLoader/> : <MoveRight/>} </> 
  const Edith = ()=>  <> Editar perfil {loading ? <ButtonLoader/>: <Edit/>} </> 


  return (
    <section className="signin">
      <form className="signin__form" onSubmit={handleSubmit} >
        <h2 className="signin__title">{
          userData
          ? "Editar cuenta"
          : "Crear cuenta"
          }</h2>

        <div className="signin__section">
          <h4 className="signin__subtitle">Informacion personal</h4>
          <div className="signin__inputs">
            <input 
              type="text" 
              placeholder="Nombres" 
              name="name" 
              value={data.name}
              minLength={2}
              maxLength={50}
              required
              onChange={handleChange}
              className="signin__input"/>
            <input 
              type="text" 
              placeholder="Apellidos" 
              value={data.lastName}
              minLength={2}
              maxLength={50}
              required
              onChange={handleChange}
              name="lastName" 
              className="signin__input" />
          </div>
        </div>

        <div className="signin__section">
          <h4 className="signin__subtitle">Direccion y contacto</h4>
          <div className="signin__inputs">
            <Select 
              tags={ provinces ? provinces.map(res => res.province) : [] } 
              placeholder="Selecciona la provincia" 
              name="provinceId"
              cb={handleChange}
              data={province && province.province} />
            <Select 
              tags={ cities && cities.map(res => res.city) } 
              placeholder="Selecciona la localidad"
              name="cityId"
              cb={handleChange}             
              data={city &&city.city}/>

            <input 
              type="text" 
              placeholder="calle, numero, etc." 
              name="street" 
              value={data.street}
              onChange={handleChange}
              minLength={2}
              maxLength={100}
              required
              className="signin__input span"  />

            <input 
              type="text" 
              placeholder="referencia (Opcional)" 
              name="reference"
              onChange={handleChange}
              minLength={2}
              maxLength={50}
              value={data.reference}
              className="signin__input"  />

            <input 
              type="number" 
              placeholder="celular (solo numero)"
              name="phone" 
              required
              value={data.phone}
              onChange={handleChange}
              className="signin__input"  />
          </div>
        </div>

        <div className="signin__section">
          <h4 className="signin__subtitle">Datos de inicio de sesion</h4>
          <div className="signin__inputs">
            <input 
              type="text" 
              placeholder="Correo" 
              name="email"
              value={data.email}
              maxLength={50}
              required
              onChange={handleChange}
              className="signin__input span"  />
            <input 
              type="password" 
              minLength={2}
              maxLength={50}
              placeholder="Contraseña" 
              name="password"
              value={data.password} 
              onChange={handleChange}
              className="signin__input"  />
            <input 
              type="password" 
              minLength={2}
              maxLength={50}
              placeholder="confirmar contraseña" 
              name="confirmPassword"
              value={data.confirmPassword} 
              onChange={handleChange}
              className="signin__input"  />
          </div>
        </div>

        {error && <ErrorAlert error={error} clearError={clearError} />}

        <button className="signin__button">
          {
            userData
            ? <Edith/>
            : <Sign/>
          }
        </button>

        {!userData && <p>¿Ya tienes una cuenta? logueate <Link to="/login" >Aqui</Link> </p> }
      </form>
    </section>
  )
}

export default SigninForm

