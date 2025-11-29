import { Router } from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import crypto from "crypto";
import path, { extname } from "path";
import { fileURLToPath } from "url";
import productValidator from "../middlewares/productValidator.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const destination = path.join(__dirname, "../../public/");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, destination),
  filename: (req, file, cb) => {
    const filename = crypto.randomUUID() + extname(file.originalname).toLowerCase();
    cb(null, filename);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5000000 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpg|jpeg|png/;
    const mimetype = fileTypes.test(file.mimetype);
    const extnameValid = fileTypes.test(extname(file.originalname).toLowerCase());

    if (mimetype && extnameValid) return cb(null, true);
    cb({ name: "MulterError", code: "NO_SUPPORTED_FILE" });
  },
}).array("imgUris",6);

function productRoutes({ userModel, productModel }) {
  const router = Router();
  const {SECRET_KEY} = process.env

  router.get("/" ,async (req,res,next) => {
    try {
      const targets = await productModel.getAll()
      res.json(targets)
    } catch (err){
      return next(err)
    }
  })

  router.get("/:productId" ,async (req,res,next) => {
    const {productId} = req.params

    if (!productId) return next ({name: "ID_REQUIRED"})

    try {
      const product = await productModel.getById({productId})
      if (!product) return next ({name: "INVALID_PRODUCT_ID"})
      res.json(product)
    } catch (err){
      return next(err)
    }
  })


  router.post("/", upload, productValidator, async (req, res, next) => {
    const {title,description,targetId,price,quantity} = req.body
    const {authorization} = req.headers

    if (req.files.length < 1) return next ({name: "MISSING_IMAGES"})

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

      const imgUris = req.files.map(res => res.filename)
      const product = await productModel.createProduct({title,description,targetId,price,quantity,imgUris,userId: verify.userId})

      res.json(product)
    }catch(err){
      return next(err)
    }
  });

  router.patch("/:productId",  productValidator, async (req, res, next) => {
    const {title,description,targetId,price,quantity} = req.body
    const {productId} = req.params
    console.log(productId)
    const {authorization} = req.headers

    if (!productId) return next ({name: "ID_REQUIRED"})

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

      const product = await productModel.updateProducts({title,description,targetId,price,quantity,productId})

      res.json(product)
    }catch(err){
      return next(err)
    }
  });

  router.delete("/:productId" ,async (req,res,next) => {
    const {productId} = req.params
    const {authorization} = req.headers

    if (!productId) return next({name: "ID_REQUIRED"})

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

      await productModel.deleteProduct({productId})
      res.json({message: "product eliminado"})
    } catch (err){
      return next(err)
    }
  })

  return router;
}

export default productRoutes;
