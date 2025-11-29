import "dotenv/config"
import express from "express"
import userRoutes from "./routes/userRoutes.js"
import morgan from "morgan"
import loginRoutes from "./routes/loginRoutes.js"
import errorHandler from "./errorHandler.js"
import targetRoutes from "./routes/targetRoutes.js"
import path from "path"
import { fileURLToPath } from "url"
import productRoutes from "./routes/productRoutes.js"
import commentRoutes from "./routes/commentsRoutes.js"
import OrderRoutes from "./routes/orderRoutes.js"
import paymentsRoute from "./routes/paymentsRoute.js"
import provincesRoutes from "./routes/provincesRoutes.js"
import citiesRoutes from "./routes/citiesRoutes.js"
import statusRoutes from "./routes/statusRoutes.js"

function server ({userModel,targetModel,productModel,commentModel,orderModel,provinceModel,cityModel,statusModel}){
  const app = express()
  app.use(morgan("dev"))
  app.use(express.json())

  app.use("/api/users", userRoutes({userModel}))
  app.use("/api/targets", targetRoutes({targetModel,userModel}))
  app.use("/api/products", productRoutes({productModel,userModel}))
  app.use("/api/login", loginRoutes({userModel}))
  app.use("/api/comments", commentRoutes({commentModel,userModel}))
  app.use("/api/orders", OrderRoutes({orderModel,userModel}))
  app.use("/api/provinces", provincesRoutes({provinceModel,userModel}))
  app.use("/api/cities", citiesRoutes({cityModel}))
  app.use("/api/status", statusRoutes({statusModel,userModel}))
  app.use("/api/payments", paymentsRoute())
  app.get("/hola", (req,res)=> {
    res.json({message:'adios'})
  })

  app.use(errorHandler)
  
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Servir la carpeta "public" como estática
  // Public
  app.use("/api/public", express.static(path.join(__dirname, "../public")));

  // React build
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));

  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
  });
  

  const port = process.env.PORT || 3000

  app.listen(port, ()=> console.log("server on port: ",port))
}

export default server