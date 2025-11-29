import { Router } from "express";
import jwt from "jsonwebtoken";
import { MercadoPagoConfig, Preference } from "mercadopago";

function OrderRoutes({ orderModel, userModel }) {
  const router = Router();
  const {SECRET_KEY} = process.env

  router.get("/" ,async (req,res,next) => {
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

      const Order = await orderModel.getAll()

      res.json(Order)
    }catch(err){
      return next(err)
    }
  })

  router.get("/users" ,async (req,res,next) => {
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

      const Order = await orderModel.getByUser({userId: verify.userId})

      res.json(Order)
    }catch(err){
      return next(err)
    }
  })

  router.post("/webhook-mp", async (req,res,next)=>{
    const payment = req.body

    console.log({payment})

    const orderId = payment.data.metadata.orderId

    if (!orderId) return res.sendStatus(200)

    if (payment.type === "payment") {
      const details = await mp.payment.get({ id: payment.data.id })

      if (details.status !== "approved") {
        await orderModel.deleteOrder(orderId) // ❌ eliminar order + OrderProducts
      }
    }

    res.sendStatus(200)
  })

  router.get("/:orderId" ,async (req,res,next) => {
    const {orderId} = req.params
    const {authorization} = req.headers

    if (!orderId) return next({name: "ID_REQUIRED"})

    let token = null
    if (authorization && authorization.toLowerCase("").startsWith("bearer")){
      token = authorization.split(" ")[1]
    }

    if (!token) return next({name:"TOKEN_REQUIRED"})

    try {      
      const verify = jwt.verify(token,SECRET_KEY)
      const user = await userModel.getById({userId: verify.userId})

      if (!user) return next({name:"INVALID_USER_ID"})

      const Order = await orderModel.getById({orderId})

      res.json(Order)
    }catch(err){
      return next(err)
    }
  })

  router.post("/", async (req, res, next) => {
    const {products} = req.body
    const {authorization} = req.headers

    const {accessToken,success,failure} = process.env.NODE_ENV == "development"
    ? {accessToken: process.env.DEV_ACCESS_TOKEN,success: process.env.DEV_SUCCESS, failure: process.env.DEV_FAILURE}
    : {accessToken: process.env.PROD_ACCESS_TOKEN,success: process.env.PROD_SUCCESS, failure: process.env.PROD_FAILURE}

    let token = null
    if (authorization && authorization.toLowerCase("").startsWith("bearer")){
      token = authorization.split(" ")[1]
    }

    if (!token) return next({name:"TOKEN_REQUIRED"})

    try {      
      const verify = jwt.verify(token,SECRET_KEY)
      const user = await userModel.getById({userId: verify.userId})

      if (!user) return next({name:"INVALID_USER_ID"})

      const Order = await orderModel.createOrder({buyerId: verify.userId,products})
      // Integracion con mercado pago!
      const client = new MercadoPagoConfig({accessToken});
      const preference = new Preference(client);

      const productsToSend = Order.products.map(res => ({
            id: res.productsId,
            title: res.title,
            unit_price: res.price,
            quantity: res.quantity
          }))
      const productsWithShipping = [...productsToSend, {id: crypto.randomUUID(),title: "Envio", unit_price: Order.shippingPrice, quantity: 1}]

      const result = await preference.create({
        body: {
          items: productsWithShipping,
          payment_methods: {
            excluded_payment_types: [
              { id: "ticket" },
              { id: "atm" },
              { id: "bank_transfer" },
              { id: "digital_currency" },
              { id: "prepaid_card" },
              { id: "voucher_card" }
            ],
            installments: 1
          },

          back_urls: {
            success,
            failure
          },
          metadata: {orderId: Order.orderId},
          notification_url: "http://localhost:4000/api/orders/webhook-mp"
        }
      });
      
      res.json({ url: result.init_point });

    }catch(err){
      return next(err)
    }
  });

  router.patch("/:orderId", async (req, res, next) => {
    const {statusId} = req.body
    const {orderId} = req.params

    const {authorization} = req.headers

    if (!orderId) return next ({name: "ID_REQUIRED"})

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

      const order = await orderModel.updateOrder({statusId,orderId})

      res.json(order)
    }catch(err){
      return next(err)
    }
  });

  return router;
}

export default OrderRoutes