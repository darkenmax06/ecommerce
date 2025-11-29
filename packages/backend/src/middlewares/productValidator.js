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


// {title,description,target,price,userId,quantity,imgsUri}

function productValidator (req,res,next) {
  const user = req.body

  const schema = z.object({
    title: z.string(stringError("titulo")).min(2, minError("titulo",2)).max(50, maxError("titulo",50)),
    description: z.string(stringError("descripcion")).min(2, minError("descripcion",2)).max(300, maxError("descripcion",300)),
    targetId: z.string(stringError("targetId")),
    price: z.string(stringError("precio")).min(0, "el minimo para un precio es $0"),
    quantity: z.string(stringError("cantidad")).min(0, "el minimo para una cantidad es 0")
  })

  const validation = schema.safeParse(user)

  if (!validation.success) {
    return next(validation.error)
  } next()
}

export default productValidator