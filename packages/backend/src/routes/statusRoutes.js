import { Router } from "express";
import jwt from "jsonwebtoken";


function statusRoutes({ statusModel, userModel }) {
  const router = Router();
  const {SECRET_KEY} = process.env

  router.get("/" ,async (req,res,next) => {
    const {authorization} = req.headers

    console.log(authorization)

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

      const status = await statusModel.getAll()

      res.json(status)
    }catch(err){
      return next(err)
    }
  })

  return router;
}

export default statusRoutes;
