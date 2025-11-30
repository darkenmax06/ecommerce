import { X } from "lucide-react"
import "./inputAlert.css"

function InputAlert ({color="blue",content,children, action= ()=>{}}){
  const colors = ["red","blue","yellow","green","purple"]
  
  const currentColor = colors.find(res=> res==color) 

  return (
    <div aria-modal className={currentColor ? `ia ${color}` : `ia default`}>
      {children}
      <p>
        {content}
      </p>
      <button onClick={action} >
        <X/>
      </button>
    </div>
  )
}

export default InputAlert