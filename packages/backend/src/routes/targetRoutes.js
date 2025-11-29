import { Router } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import targetValidator from "../middlewares/targetValidator.js";

function targetRoutes ({userModel,targetModel}) {  
  const router = Router()
  const {SECRET_KEY} = process.env

  router.get("/" ,async (req,res,next) => {
    try {
      const targets = await targetModel.getAll()
      res.json(targets)
    } catch (err){
      return next(err)
    }
  })

  router.get("/:targetId" ,async (req,res,next) => {
    const {targetId} = req.params

    try {
      const target = await targetModel.getById({targetId})
      if (!target) return next ({name: "INVALID_TARGET_ID"})
      res.json(target)
    } catch (err){
      return next(err)
    }
  })

  router.post("/", targetValidator ,async (req,res,next) => {
    const {target} = req.body
    const {authorization} = req.headers

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

      const targetToSend = await targetModel.createTarget({target})
      res.json(targetToSend)
    } catch (err){
      if (err.code == "ER_DUP_ENTRY") return next({name: "EXISTING_TARGET"})
      return next(err)
    }
  })

  router.patch("/:targetId", targetValidator ,async (req,res,next) => {
    const {target} = req.body
    const {targetId} = req.params
    const {authorization} = req.headers

    if (!targetId) return next({name: "ID_REQUIRED"})

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

      const targetToSend = await targetModel.updateTarget({target,targetId})
      res.json(targetToSend)
    } catch (err){
      if (err.code == "ER_DUP_ENTRY") return next({name: "EXISTING_TARGET"})
      return next(err)
    }
  })

  router.delete("/:targetId" ,async (req,res,next) => {
    const {targetId} = req.params
    const {authorization} = req.headers

    if (!targetId) return next({name: "ID_REQUIRED"})

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

      await targetModel.deleteTarget({targetId})
      res.json({message: "target eliminado"})
    } catch (err){
      return next(err)
    }
  })

  return router
}

export default targetRoutes