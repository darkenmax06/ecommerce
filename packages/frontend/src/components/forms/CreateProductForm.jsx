import { Edit, MoveRight } from "lucide-react"
import "./createProduct.css"
import { useState } from "react"
import "./select.css"
import useTags from "../../hooks/useTags"
import Select from "./Select"
import useProducts from "../../hooks/useProducts"


function CreateProductsForm ({productData}) {
  const {tags} = useTags(false)
  const [data,setData] = useState(()=> productData ? productData: { title: "", description: "", quantity: "", price: "", target:"" })
  const {createProduct,error,editProducts} = useProducts()
  const [previewImages,setPreviewImages] = useState([])

  const handleChange = e => {
    const {name,value} = e.target

    setData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)

    const imgUrls = files.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }))

    setPreviewImages(imgUrls)
  }

  const handleSubmit = e => {
    e.preventDefault()


    const formData = new FormData(e.target)
    formData.append("target",data.target)

    if (!productData) createProduct(formData)
    else editProducts(data)
  }

  console.log(data)

  const Sign = ()=>  <> Crear Producto <MoveRight/> </> 
  const Edith = ()=>  <> Editar Producto <Edit/> </> 

  return (
    <section className="pf">
      <form className="pf__form" onSubmit={handleSubmit} >
        <h2 className="pf__title">{ productData? "Editar Producto" : "Crear Producto" }</h2>

        <div className="pf__section">
          <h4 className="pf__subtitle">Informacion personal</h4>
          <div className="pf__inputs">
            <div className="pf__img-input" style={{display: productData||previewImages.length > 0 ? "none":"block"}} >  
              <label htmlFor="file"> Da un click aca y añade las imagenes del produto <br /> <span>Puedes añadir un maximo de hasta 6 imagenes.</span> </label> 
              <input type="file" onChange={handleFileChange}  name="imgUris" multiple id="file" accept=".jpg,.jpeg,.png" /> 
            </div>

            {previewImages.length > 0 && (
              <div className="pf__preview-container">
                {previewImages.map((img, i) => (
                  <img
                    key={i}
                    src={img.url}
                    className="pf__preview-img"
                    alt={`preview-${i}`}
                  />
                ))}
              </div>
            )}

            <input 
              type="text" 
              placeholder="titulo" 
              name="title" 
              value={data.title}
              minLength={2}
              maxLength={50}
              required
              onChange={handleChange}
              className="pf__input"/>
              
            <Select 
              tags={tags} 
              placeholder={"Selecciona la categoria"}
              name="target"
              data={data.target}
              cb={handleChange}/>
            <textarea 
              name="description" 
              id="description"
              placeholder="Descripcion" 
              value={data.description}
              minLength={2}
              maxLength={50}
              required
              onChange={handleChange}
              className="pf__input"
              ></textarea>
              
            <input 
              type="number" 
              placeholder="Cantidad" 
              value={data.quantity}
              min={1}
              required
              onChange={handleChange}
              name="quantity" 
              className="pf__input" />

            <input 
              type="number" 
              placeholder="precio" 
              value={data.price}
              min={1}
              required
              onChange={handleChange}
              name="price" 
              className="pf__input" />
              
          </div>
        </div>

        {error && <p>{error}</p>}

        <button className="pf__button">
          {
            productData
            ? <Edith/>
            : <Sign/>
          }
        </button>
      </form>
    </section>
  )
}

export default CreateProductsForm

