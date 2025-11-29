import { Router } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import createUserValidator from "../middlewares/createUserValidator.js";

function userRoutes ({userModel}) {  
  const router = Router()
  const {SECRET_KEY} = process.env

  router.post("/", createUserValidator ,async (req,res,next) => {
    const {name,lastName,provinceId,cityId,street,reference,phone,email,password} = req.body

    const SALT_ROUNDS = 8
    const passwordHashed = await bcrypt.hashSync(password,SALT_ROUNDS)

    try {
      const user = await userModel.createUser({name,lastName,provinceId,cityId,street,reference,phone,email,password:passwordHashed})
      const token = jwt.sign({userId: user.userId},SECRET_KEY)
      const {userId,...restOfUser} = user
      const userToSend = {
        ...restOfUser,
        token
      }
      res.json(userToSend)
    } catch (err){
      if (err.code == "ER_DUP_ENTRY") return next({name: "EXISTING_EMAIL"})
      return next(err)
    }
  })

  router.patch("/", createUserValidator ,async (req,res,next) => {
    const {name,lastName,provinceId,cityId,street,reference,phone,email,password} = req.body
    const {authorization} = req.headers
    
    let token = null
    if (authorization && authorization.toLowerCase("").startsWith("bearer")){
      token = authorization.split(" ")[1]
    }

    if (!token) return next({name:"TOKEN_REQUIRED"})          

    const SALT_ROUNDS = 8
    const passwordHashed = await bcrypt.hashSync(password,SALT_ROUNDS)

    try {
      const verify = jwt.verify(token,SECRET_KEY)
      const userToVerify = await userModel.getById({userId: verify.userId})

      if (!userToVerify) return next({name:"INVALID_USER_ID"})

      const user = await userModel.updateUser({name,lastName,provinceId,cityId,street,reference,phone,email,password:passwordHashed,userId:verify.userId})

      const tokenToSend = jwt.sign({userId: user.userId},SECRET_KEY)
      const {userId,...restOfUser} = user
      const userToSend = {
        ...restOfUser,
        token: tokenToSend
      }
      res.json(userToSend)
    } catch (err){
      if (err.code == "ER_DUP_ENTRY") return next({name: "EXISTING_EMAIL"})
      return next(err)
    }
  })

  return router
}

export default userRoutes