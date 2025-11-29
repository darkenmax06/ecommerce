import { Router } from "express";
import jwt from "jsonwebtoken";
import createCommentValidator from "../middlewares/createCommentValidator.js"


function commentRoutes({ userModel, commentModel }) {
  const router = Router();
  const {SECRET_KEY} = process.env

  router.get("/:productId" ,async (req,res,next) => {
    const {productId} = req.params

    if (!productId) return next ({name: "ID_REQUIRED"})

    try {
      const comments = await commentModel.getByProductId({productId})
      if (!comments) return next ({name: "INVALID_PRODUCT_ID"})
      res.json(comments)
    } catch (err){
      return next(err)
    }
  })


  router.post("/", createCommentValidator , async (req, res, next) => {
    const {comment,productId} = req.body
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

      const commentToSend = await commentModel.createComment({comment,userId: verify.userId,productId})
      res.json(commentToSend)
    }catch(err){
      return next(err)
    }
  });

  router.delete("/:commentId" ,async (req,res,next) => {
    const {commentId} = req.params
    const {authorization} = req.headers

    if (!commentId) return next({name: "ID_REQUIRED"})

    let token = null
    if (authorization && authorization.toLowerCase("").startsWith("bearer")){
      token = authorization.split(" ")[1]
    }

    if (!token) return next({name:"TOKEN_REQUIRED"})

    try {      
      const verify = jwt.verify(token,SECRET_KEY)
      const user = await userModel.getById({userId: verify.userId})

      if (!user) return next({name:"INVALID_USER_ID"})

      await commentModel.deleteComment({commentId, userId: verify.userId})
      res.json({message: "comentario eliminado"})
    } catch (err){
      return next(err)
    }
  })

  return router;
}

export default commentRoutes;
