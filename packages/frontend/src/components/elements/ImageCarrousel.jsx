import {useRef} from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import "./imageCarrousel.css"

function ImageCarrousel ({imgUris,title}){
  const containerRef = useRef()

  const handleScroll = (dir) => {
    if (containerRef.current){
      const element = containerRef.current
      const {width} = element.getBoundingClientRect()
      const scrollWidth = width
      const currentScroll = element.scrollLeft

      return dir == "left" ? element.scrollTo(scrollWidth + currentScroll,0) : element.scrollTo(currentScroll - scrollWidth,0)
    }
  }

  return (
    <div className="carrousel__imgbox"  >
      <div className="carrousel__imgs__container" ref={containerRef} >
        {imgUris.map(res => <img key={res} src={`/api/public/${res}`} alt={title} />)}
      </div>
      <div className="carrousel__imgs__actions">
        <button onClick={()=> handleScroll("right")} >
          <ArrowLeft/>
        </button>

        <button onClick={()=> handleScroll("left")} >
          <ArrowRight/>
        </button>
      </div>
    </div>
  )
}

export default ImageCarrousel