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

function createCommentValidator (req,res,next) {
  const user = req.body

  const schema = z.object({
    comment: z.string(stringError("Comentario")).min(2, minError("Comentario",2)).max(300, maxError("Comentario",300)),
    productId: z.number(stringError("productId"))
  })

  const validation = schema.safeParse(user)

  if (!validation.success) {
    return next(validation.error)
  } next()
}

export default createCommentValidator