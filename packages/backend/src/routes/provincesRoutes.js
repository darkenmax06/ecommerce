import { Router } from "express";
import jwt from "jsonwebtoken"

function provincesRoutes ({provinceModel,userModel}){
  const router = Router()
  const {SECRET_KEY} = process.env

  router.get("/:province", async(req,res,next) => {
    const {province} = req.params
    console.log(province)

    if (!province) return next({name: "PROVINCE_REQUIRED"})

    try {
      const provinceToSend = await provinceModel.getByName({province})
      res.json(provinceToSend)
    } catch( err) {
      next(err)
    }
  })

  router.get("/", async(req,res,next) => {
    try {
      const provinces = await provinceModel.getAll()
      res.json(provinces)
    } catch( err) {
      next(err)
    }
  })

  router.patch("/:provinceId", async(req,res,next) => {
    const {provinceId} = req.params
    const {shippingPrice} = req.body
    const {authorization} = req.headers

    if (!provinceId) return next({name: "ID_REQUIRED"})

    let token = null
    if (authorization && authorization.toLowerCase("").startsWith("bearer")){
      token = authorization.split(" ")[1]
    }

    if (!token) return next({name:"TOKEN_REQUIRED"})

    try {      
      const verify = jwt.verify(token,SECRET_KEY)
      const user = await userModel.getById({userId: verify.userId})

      if (!user) return next({name:"INVALID_USER_ID"})
      if (user.type !== "seller") return next({name:"INVALID_CREDENTIALS"})
        
      const province = await provinceModel.updatePrice({provinceId,shippingPrice})

      res.json(province)
    } catch( err) {
      next(err)
    }
  })
  return router
}

export default provincesRoutes