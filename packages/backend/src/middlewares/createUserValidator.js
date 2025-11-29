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

function createUserValidator (req,res,next) {
  const user = req.body

  const schema = z.object({
    name: z.string(stringError("Nombre")).min(2, minError("Nombre",2)).max(50, maxError("Nombre",50)),
    lastName: z.string(stringError("Apellidos")).min(2, minError("Apellidos",2)).max(50, maxError("Apellidos",50)),
    provinceId: z.number(stringError("Provincia")),
    cityId: z.number(stringError("Ciudad")),
    street: z.string(stringError("Calle")).min(2, minError("Calle",2)).max(100, maxError("Calle",100)),
    reference: z.string(stringError("Referencia")).max(100, maxError("Referencia",100)).optional(),
    phone: z.string("El formato del numero de telefono no es valido").min(10, minError("numero de telefono",10)).max(15, maxError("numero de telefono",15)),
    email: z.email("El formato del email proporcionado no es valido"),
    password: z.string(stringError("Contraseña")).min(8, minError("Contraseña",8)).max(50, maxError("Contraseña",50)),

  })

  const validation = schema.safeParse(user)

  if (!validation.success) {
    return next(validation.error)
  } next()
}

export default createUserValidator