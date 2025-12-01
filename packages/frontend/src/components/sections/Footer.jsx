import { Link } from "react-router-dom"
import { MdiWhatsapp } from "../../assets/icons/Whatsapp"
import { MdiInstagram } from "../../assets/icons/Instagram"
import "./footer.css"
import { LineMdTiktok } from "../../assets/icons/Tiktok"

function Footer (){
  return (
    <footer className="footer">
      <div className="footer__container">
        <nav className="footer__nav">
          <h3>Secciones</h3>
          <ul>
            <li>
              <Link>
              Inicio
              </Link>
            </li>

            <li>
              <Link>
              Sobre nosotros
              </Link>
            </li>

            <li>
              <Link>
              Productos
              </Link>
            </li>

            <li>
              <Link>
              Contacto
              </Link>
            </li>
          </ul>
        </nav>

        <div className="footer__info">
          <img src="/logow.png" className="footer__logo" />
          <p>
            Redefinimos el lujo urbano; Una fusion de elegancia y actitud. No sigues tendencias, las creas.
          </p>
          <span>
            The real fat @ All right reserved
          </span>
        </div>

        <div className="footer__social">
          <a href="">
            <MdiWhatsapp/>
          </a>
          <a target="blank" href="https://www.instagram.com/therealfatdv/">
            <MdiInstagram/>
          </a>
          <a href="">
            <LineMdTiktok/>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer