import {Link} from "react-router-dom"
import "./about.css"

function About (){
  return (
    <section className="about">
      <div className="about__container">
        <picture className="about__imgbox">
          <video src="/about.mp4"  
                    autoPlay 
                    muted 
                    loop
                     ></video>
        </picture>

        <div className="about__textbox">
          <h4 className="about__subtitle">
            Sobre nosotros
          </h4>
          <h2 className="about__title">
            Creando tendencias
          </h2>

          <p>
            En The Real Fat no seguimos modas, las creamos.
            No vendemos ropa, vendemos actitud. Cada pieza está pensada para quienes saben lo que valen y no tienen miedo de mostrarlo.

            <br />
            <br />

            Mezclamos el lujo con la esencia de la calle, creando artículos premium que reflejan poder, confianza y estilo real.
            Aquí no hay copias, solo originalidad y flow auténtico.

            <br />
            <br />

            Viste el éxito. <br />
            Refleja poder. <br />
            Sé parte del movimiento. <br /><br />

            👉 Explora la colección y haz que el mundo vea quién eres.
          </p>

          <Link  to="/#products" className="about__btn">
            Explorar productos
          </Link>
        </div>
      </div>
    </section>
  )
}

export default About