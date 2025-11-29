import z from "zod"


function stringError (key) {
  return `El campo ${key} es requerido.`
}

function minError (key,caracters) {
  return `El campo ${key} debe tener un minimo de ${caracters} caracteres.`
}

function maxError (key,caracters) {
  return `El campo ${key} puede tener un maximo hasta de ${caracters} caracteres.`
}

function loginUserValidator (req,res,next) {
  const user = req.body

  const schema = z.object({
    email: z.email("El formato del email proporcionado no es valido"),
    password: z.string(stringError("Contraseña")).min(8, minError("Contraseña",8)).max(50, maxError("Contraseña",50)),

  })

  const validation = schema.safeParse(user)

  if (!validation.success) {
    return next(validation.error)
  } next()
}

export default loginUserValidator