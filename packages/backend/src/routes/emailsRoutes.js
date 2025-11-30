import {Router} from "express"
import { sendMail } from "../utils/sendEmails.js"

function emailRoutes (){
  const router = Router()

  router.post("/",async (req,res,next)=> {
    const {name,email,message} = req.body
    try {
      const result = await sendMail({subject: `Comentario de ${name}`, content: `<b>Comentario:</b> <br><br> ${message}`,replyTo: email})
      res.json(result)
    }catch(err){
      next(err)
    }
  })

  return router
}

export default emailRoutes