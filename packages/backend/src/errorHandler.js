function errorHandler (err,req,res,next){
  const {name} = err

  console.log(name)
  console.log(err)

  const errorStore = {
    "INVALID_LOGIN": ()=> res.status(400).json({error: "El email o la contraseña proporcionadas no son correctas."}),
    "Error": ()=> {
      const {code} = err

      if (code ==  "ER_DUP_ENTRY") return res.status(409).json({error: "Ya existe un usuario con ese email"})
    },
  "MulterError": ()=> {
      const {code} = err

      if (code ==  "LIMIT_UNEXPECTED_FILE") return res.status(400).json({error: "Solo se permite un maximo de 6 imagenes"})
    },
  "JsonWebTokenError": ()=> res.status(401).json({error: "El token de acceso proporcionado no es valido."}),
  "EXISTING_TARGET": ()=> res.status(409).json({error: "Ya existe un target con esa descripcion"}),
  "EXISTING_EMAIL": ()=> res.status(409).json({error: "Ya existe un usuario con ese email"}) ,
  "MISSING_IMAGES": ()=> res.status(400).json({error: "Se requiere almenos una imagen para completar esta accion"}) ,
  "TOKEN_REQUIRED": ()=> res.status(401).json({error: "Debes proporcionar un token de acceso para realizar esta accion"}) ,
  "INVALID_USER_ID": ()=> res.status(401).json({error: "La id de usuario proporcionada no existe"}),
  "REQUIRED_PRODUCTS": ()=> res.status(401).json({error: "Debe proporcionar productos para crear una orden"}),
  "INVALID_USER_CREATOR": ()=> res.status(401).json({error: "El usuario proporcionado no existe o no es quien creo este recurso"}),
  "EXECTED_STOCK": ()=> res.status(401).json({error: "No existe la cantidad solicitada del producto."}),
  "INVALID_TARGET_ID": ()=> res.status(401).json({error: "La id del target proporcionada no existe"}),
  "INVALID_COMMENT_ID": ()=> res.status(401).json({error: "La id del comentario proporcionada no existe"}),
  "INVALID_ORDER_ID": ()=> res.status(401).json({error: "La id la orden proporcionada no existe"}),
  "INVALID_PRODUCT_ID": ()=> res.status(401).json({error: "La id del producto proporcionada no existe."}),
  "INVALID_PROVINCE_ID": ()=> res.status(401).json({error: "Provincia no encontrada en la Base de datos."}),
  "INVALID_CITY_ID": ()=> res.status(401).json({error: "Sector no encontrada en la Base de datos."}),
  "EXISTING_ELEMENTS_WIDTH_THIS_TARGET": ()=> res.status(400).json({error: "no se puede eliminar el target porque existen productos con este target"}) ,
  "ID_REQUIRED": ()=> res.status(401).json({error: "Es necesario la id del elemento para realizar esta accion."}),
  "INVALID_CREDENTIALS": ()=> res.status(401).json({error: "No tienes los permisos necesarios para realizar esta accion."}),
  "ZodError": ()=> {
    const {message} = err.issues[0]
    return res.status(400).json({error: message})
    },
  "DEFAULT": ()=> res.status(500).json({error: "Ha ocurrido un error"})
  }

  return errorStore[name] ?errorStore[name]():errorStore["DEFAULT"] ()
}

export default errorHandler