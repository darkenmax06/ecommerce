import mysql2 from "mysql2/promise"
import Users from "./models/Users.js"
import server from "./index.js"
import Targets from "./models/Targets.js"
import Products from "./models/Products.js"
import Comments from "./models/Comments.js"
import Orders from "./models/Orders.js"
import Provinces from "./models/Provinces.js"
import Cities from "./models/Cities.js"
import Status from "./models/Status.js"

const { DB_USER, DB_PASSWORD, DOCKER_DB_HOST,LOCAL_DB_HOST, DB_PORT, DATABASE, DEV_ENV} = process.env
const config  = { user: DB_USER, password: DB_PASSWORD, host: DEV_ENV == "docker" ? DOCKER_DB_HOST : LOCAL_DB_HOST, port:DB_PORT, database: DATABASE }

let connection = null

try {
  connection = await mysql2.createPool(config)
  console.log("database connected")

} catch (err){
  console.log("Ramses Error", err)
}

const targetModel = new Targets(connection)
const userModel = new Users(connection)
const productModel = new Products(connection)
const commentModel = new Comments(connection)
const orderModel = new Orders(connection)
const provinceModel = new Provinces(connection)
const cityModel = new Cities(connection)
const statusModel = new Status(connection)

server({userModel,targetModel,productModel,commentModel,orderModel,provinceModel,cityModel, statusModel})