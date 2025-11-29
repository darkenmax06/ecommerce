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

function targetValidator (req,res,next) {
  const user = req.body

  const schema = z.object({
    target: z.string(stringError("Target")).min(2, minError("Target",2)).max(30, maxError("Target",30)),
  })

  const validation = schema.safeParse(user)

  if (!validation.success) {
    return next(validation.error)
  } next()
}

export default targetValidator