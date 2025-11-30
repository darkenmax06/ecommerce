import { StepBack, Undo, Undo2 } from "lucide-react"
import { Link } from "react-router-dom"
import "./notFound.css"

function NotFound ({comment="Pagina no encontrada"}){
  return (
    <section className="nf">
      <div className="nf__container">
        <h2>{comment}</h2>
        <img 
          src="/notFound.png" 
          alt="Not Found Image" />
        <p>Vuelve al principio para poder apoyarte mejor <Link to="/" >Volver <Undo2/> </Link></p>
      </div>
    </section>
  )
}


export default NotFound