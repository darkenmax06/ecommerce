import './targets.css'
import useTags from "../../hooks/useTags"
import TargetCard from '../cards/TargetCard'
import { Plus } from 'lucide-react'


function Target ({title = "Categorias"}) {
  const {tags,deleteTags} = useTags()


  return (
    <section className="targets" id="products" >
      <div className="targets__container">
        <h2 className="targets__title subtitle">
          {title}
        </h2>
            <a className='targets__button' href="/targets/create" > <Plus/> Crear etiquetas</a>

            <div className="targets__box">
              {tags && tags.map(res => {
                if (res.target == "Todos") return null
                return <TargetCard key={res.targetId} {...res} deleteTags={deleteTags}  />
              })}
              {(!tags) && <h3>cargando</h3>}
              {(tags && tags.length < 1) && <h3>No haz agregado niniguna target aun</h3>}
            </div>

      </div>
    </section>
  )
}

export default Target