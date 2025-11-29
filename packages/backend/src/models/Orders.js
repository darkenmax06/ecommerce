class Orders {
  constructor(connection){
    this.connection = connection
  }

  getAll = async () => {
    const [orders] = await this.connection.query(`
      SELECT orderId, status, name, lastName, phone, o.creationDate  FROM Orders o INNER JOIN 
      Status s ON s.statusId = o.statusId AND o.statusId != 3
      INNER JOIN Users u ON u.userId = o.buyerId`)

    const orderToSend = orders.map (res => {
      const orderToSend = {
        orderId: res.orderId,
        status: res.status,
        creationDate: res.creationDate,
        user: {
          name: res.name,
          lastName: res.lastName,
          phone: res.phone
        }
      }

      return orderToSend
    })

    return orderToSend
  }

  getById = async ({orderId}) => {
    const [[order]] = await this.connection.query("SELECT * FROM Orders o INNER JOIN Status s ON s.statusId = o.statusId AND o.orderId = ?",[orderId])
    if (!order) throw {name: "INVALID_ORDER_ID"}
    const [[user]] = await this.connection.query("SELECT * FROM parsed_user WHERE userId = BIN_TO_UUID(?)",[order.buyerId])


    const [productsToSend] = await this.connection.query(`
      SELECT p.productId, op.productId, op.orderId, title, op.quantity, price FROM OrderProducts op INNER JOIN 
      Products p ON p.productId = op.productId AND op.orderId = ?`,[orderId])

    

    let pcts = []

    for (let product of productsToSend) {
      const {productId} = product
      const [imgs] = await this.connection.query(`SELECT * FROM Images WHERE productId = ?`,[productId])
      const imgUris = imgs.map(res => res.imgUri)

      const {orderId,...productToSend} = product

      pcts = [...pcts, {...productToSend,imgUris}]
    }

    const orderToSend = {
      orderId: orderId,
      street: order.street,
      shippingPrice: order.shippingPrice,
      reference: order.street,
      city: order.city,
      province: order.province,
      status: order.status,
      products: pcts,
      user: {
        name: user.name,
        lastName: user.lastName,
        phone: user.phone
      }
    }

    return orderToSend
  }

  getByUser = async ({userId}) => {
    const [orders] = await this.connection.query(`
      SELECT * FROM Orders o INNER JOIN 
      Status s ON s.statusId = o.statusId
      INNER JOIN parsed_user u ON u.userId = BIN_TO_UUID(o.buyerID) AND o.buyerId = UUID_TO_BIN(?)`,[userId])

      console.log(orders)

    const orderToSend = orders.map (res => {
      const orderToSend = {
        orderId: res.orderId,
        status: res.status,
        creationDate: res.creationDate,
        user: {
          name: res.name,
          lastName: res.lastName,
          phone: res.phone
        }
      }

      return orderToSend
    })

    return orderToSend
  }

  createOrder = async ({buyerId,products}) => {
    const [[user]] = await this.connection.query("SELECT * FROM Users WHERE userId = UUID_TO_BIN(?)",[buyerId])
    const [[province]] = await this.connection.query("SELECT * FROM Provinces WHERE provinceId = ?", [user.provinceId])
    const [[city]] = await this.connection.query("SELECT * FROM Cities WHERE cityId = ?",[user.cityId])

    const [{insertId}] = await this.connection.query("INSERT INTO Orders (statusId,buyerId,city,province,street,reference,shippingPrice) VALUES (?,UUID_TO_BIN(?),?,?,?,?,?)",[1,buyerId,city.city,province.province,user.street,user.reference, province.shippingPrice])

    if (!products.length) throw {name: "REQUIRED_PRODUCTS"}

    for (let product of products) {
      const {productId,quantity} = product
      const [[prod]] = await this.connection.query("SELECT * FROM Products WHERE productId = ?",[productId])

      if (!prod) throw {name: "INVALID_PRODUCT_ID"}

      const newQuantity = prod.quantity - quantity
      if (!prod) throw {name: "INVALID_PRODUCT_ID"}
      else if (newQuantity < 0) throw {name: "EXECTED_STOCK"}

      await this.connection.query("INSERT INTO OrderProducts (orderID,productId,quantity) VALUES(?,?,?) ",[insertId,productId,quantity])
      await this.connection.query(` UPDATE Products SET quantity = ? WHERE productId = ?  `, [newQuantity, productId])
    }

    const [[order]] = await this.connection.query("SELECT * FROM Orders o INNER JOIN Status s ON s.statusId = o.statusId AND o.orderId = ?",[insertId])

    const [productsToSend] = await this.connection.query(`
      SELECT p.productId, op.productId, op.orderId, title, op.quantity, price FROM OrderProducts op INNER JOIN 
      Products p ON p.productId = op.productId AND op.orderId = ?`,[insertId])

    

    let pcts = []

    for (let product of productsToSend) {
      const {productId} = product
      const [imgs] = await this.connection.query(`SELECT * FROM Images WHERE productId = ?`,[productId])
      const imgUris = imgs.map(res => res.imgUri)

      const {orderId,...productToSend} = product

      pcts = [...pcts, {...productToSend,imgUris}]
    }
    const orderToSend = {
      orderId: insertId,
      street: order.street,
      shippingPrice: order.shippingPrice,
      reference: order.street,
      city: order.city,
      province: order.province,
      status: order.status,
      products: pcts,
      user: {
        name: user.name,
        lastName: user.lastName,
        phone: user.phone
      }
    }

    return orderToSend
  }

  updateOrder = async ({orderId,statusId}) => {
    const [a] = await this.connection.query(`
      UPDATE Orders 
      SET statusId = ?
      WHERE orderId = ?  
      `, [statusId,orderId])
      
    if (a.affectedRows == 0) throw {name: "INVALID_ORDER_ID"}

    const [[order]] = await this.connection.query("SELECT * FROM Orders o INNER JOIN Status s ON s.statusId = o.statusId AND o.orderId = ?",[orderId])
    const [[user]] = await this.connection.query("SELECT * FROM parsed_user WHERE userId = BIN_TO_UUID(?)",[order.buyerId])

    const [productsToSend] = await this.connection.query(`
      SELECT p.productId, op.productId, op.orderId, title, op.quantity, price FROM OrderProducts op INNER JOIN 
      Products p ON p.productId = op.productId AND op.orderId = ?`,[orderId])

    

    let pcts = []

    for (let product of productsToSend) {
      const {productId} = product
      const [imgs] = await this.connection.query(`SELECT * FROM Images WHERE productId = ?`,[productId])
      const imgUris = imgs.map(res => res.imgUri)

      const {orderId,...productToSend} = product

      pcts = [...pcts, {...productToSend,imgUris}]
    }

    const orderToSend = {
      orderId: order.orderId,
      street: order.street,
      shippingPrice: order.shippingPrice,
      reference: order.street,
      city: order.city,
      province: order.province,
      status: order.status,
      products: pcts,
      user: {
        name: user.name,
        lastName: user.lastName,
        phone: user.phone
      }
    }

    return orderToSend
  }

  deleteOrder = async (orderId) => {
    const [products] = await this.connection.query(
      "SELECT productId, quantity FROM OrderProducts WHERE orderId = ?",
      [orderId]
    )

    for (let p of products) {
      await conn.query(
        "UPDATE Products SET quantity = quantity + ? WHERE productId = ?",
        [p.quantity, p.productId]
      )
    }

    await this.connection.query("DELETE FROM OrderProducts WHERE orderId = ?", [orderId])
    await this.connection.query("DELETE FROM Orders WHERE orderId = ?", [orderId])
    return true
  }
}

export default Orders