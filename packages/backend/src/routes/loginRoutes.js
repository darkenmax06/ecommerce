import { Router } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import loginUserValidator from "../middlewares/loginUserValidator.js"

function loginRoutes ({userModel}) {  
  const router = Router()
  const {SECRET_KEY} = process.env

  router.post("/", loginUserValidator,async (req,res,next) => {
    const {email,password} = req.body
    console.log(email)

    try {
      const user = await userModel.getByEmail({email})
      console.log(user)
      if (!user) return next ({name:"INVALID_LOGIN"})

      const {password:dbPassword,userId,...restOfUser} = user
      const isCorrectPassword = await bcrypt.compare(password,dbPassword)
      if (!isCorrectPassword) return next ({name:"INVALID_LOGIN"})

      const token = jwt.sign({userId: user.userId},SECRET_KEY)
      const userToSend = {
        ...restOfUser,
        token
      }

      res.json(userToSend)
    } catch (err){
      return next(err)
    }
  })

  return router
}

export default loginRoutes