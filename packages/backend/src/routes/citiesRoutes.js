import { Router } from "express";

function citiesRoutes ({cityModel}){
  const router = Router()

  router.get("/:cityId", async(req,res,next) => {
    const {cityId} = req.params

    if (!cityId) return next({name: "ID_REQUIRED"})

    try {
      const provinces = await cityModel.getByProvinceId({cityId})
      res.json(provinces)
    } catch( err) {
      next(err)
    }
  })

  return router
}

export default citiesRoutes