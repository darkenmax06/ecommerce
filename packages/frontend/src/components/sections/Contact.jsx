import { ArrowRight, Instagram, Mail } from "lucide-react"
import { MdiWhatsapp } from "../../assets/icons/Whatsapp"
import useUser from "../../hooks/useUser"
import { useState } from "react"
import "./contact.css"
import useContact from "../../hooks/useContact"
import ErrorAlert from "../inputAlerts/ErrorAlert"

function Contact (){
  const {user} = useUser()
  const {error,sendMessage,clearError} = useContact()
  const [data,setData] = useState({ 
    name:  user ? user.name.concat(" ").concat(user.lastName): "",
    email:  user ? user.email : "",
    message: ""
  })

  const clearData = () => setData({ 
    name:  user ? user.name.concat(" ").concat(user.lastName): "",
    email:  user ? user.email : "",
    message: ""
  })

  const handleChange = e => {
    const {name,value} = e.target
    setData(prev => ({...prev,[name]: value}))
  }

  const handleSubmit = e => {
    e.preventDefault()
    sendMessage({...data,clearData})
  }

  return (
    <section className="contact">
      <div className="contact__container">
        <h2 className="contact__title">Contacto</h2>
        <p>¿Tienes alguna duda?¿Te intersa contactarnos para alguna colaboracion?¿O requieres comunicarte con nosotros para algo mas particular? puedes contactarnos por nuestras distintas vias de contacto</p>
        <div className="contact__methods">
          <div className="contact__ways">
            <a href="https://www.instagram.com/therealfatdv/">
              <Instagram/>
              <p>Instagram <span>@therealfatdv</span></p>
            </a>
            <a href="https://wa.me/5491173681228">
              <MdiWhatsapp/>
              <p>Whatsapp <span>+54 9 11 7368-1228</span></p>
            </a>
            <a href="mailto:info@therealfatdv.com">
              <Mail/>
              <p>Email <span>info@therealfatdv.com</span></p>
            </a>
          </div>

          <form className="contact__form" onSubmit={handleSubmit} >
            <h3 className="form__title">
              Dejanos un comentario
            </h3>

            <div className="form__inputs-container">
              <input 
                type="text"
                minLength={2}
                maxLength={100}
                name="name"
                placeholder="nombre completo"
                value={data.name}
                onChange={handleChange}
                 />
              <input 
                type="email"
                name="email"
                placeholder="nombre completo"
                value={data.email}
                onChange={handleChange}
                 />
              <textarea
                name="message"
                minLength={2}
                maxLength={300}
                value={data.message}
                onChange={handleChange}>

              </textarea>
            </div>

            {error && <ErrorAlert error={error} clearError={clearError} />}

            <button>
              Comentar <ArrowRight></ArrowRight>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact