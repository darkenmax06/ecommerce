import InputAlert from "./InputAlert";
import { CircleAlert } from "lucide-react";


function ErrorAlert ({error,clearError}){

  console.log({error})
  return (
    <InputAlert 
      color="red" 
      content={error}
      action={clearError} >
      <CircleAlert  />
    </InputAlert>
  )
}

        // TIPOS DE ALERTAS FUTURAS
        // <InputAlert color="blue" content="la nocheeee me hace volvereer enloquecer asasdhadjasd asdasda skjd asdas kd asd sadh" ><MessageCircle  /></InputAlert>
        // <InputAlert color="yellow" content="la nocheeee me hace volvereer enloquecer asasdhadjasd asdasda skjd asdas kd asd sadh" ><AlertTriangle  /></InputAlert>
        // <InputAlert color="green" content="la nocheeee me hace volvereer enloquecer asasdhadjasd asdasda skjd asdas kd asd sadh" ><Check  /></InputAlert>
        // <InputAlert color="purple" content="la nocheeee me hace volvereer enloquecer asasdhadjasd asdasda skjd asdas kd asd sadh" ><Notebook  /></InputAlert>

export default ErrorAlert