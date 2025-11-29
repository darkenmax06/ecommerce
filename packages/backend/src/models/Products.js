class Products {
  constructor(connection){
    this.connection = connection
  }

  getAll = async () => {
    const [products] = await this.connection.query("SELECT * FROM Products")
    let parsedProducts = []

    for (const product of products){
      const {productId} = product 
      const [imgUris] = await this.connection.query("SELECT imgUri,productId FROM Images WHERE productId = ?",[productId])
       product.imgUris = imgUris.map(res => res.imgUri)

       const [[target]] = await this.connection.query("SELECT target,targetId FROM Targets WHERE targetId = ?",[product.targetId])
       product.target = target.target

       const {userId,targetId, ...restOfProduct} = product
       parsedProducts.push(restOfProduct)

    }


    return parsedProducts
  }

  createProduct = async ({title,description,targetId,price,userId,quantity,imgUris}) => {
    await this.connection.query(`
      INSERT INTO Products 
        (title, description,targetId,price,userId,quantity) VALUES
        (?,?,?,?,UUID_TO_BIN(?),?)  
      `, [title,description,targetId,price,userId,quantity]) 

    const [[product]] = await this.connection.query("SELECT * FROM Products WHERE title = ? AND quantity = ?",[title,quantity])

    let query = "INSERT INTO Images (imgUri, productId) VALUES "
    const productId = product.productId

    const values = imgUris.reduce((acc,val)=>{
      return acc.concat(` ("${val}",${productId})`)
    },"").trim().split(" ").join()

    query = query.concat(values)
    await this.connection.query(query)
    product.imgUris = [...imgUris]

    const [[target]] = await this.connection.query("SELECT target,targetId FROM Targets WHERE targetId = ?",[product.targetId])
    product.target = target.target


    const {userId:u,targetId:t,...restOfProduct} = product

    return restOfProduct
  }

  getById = async ({productId}) => {
    const [[product]] = await this.connection.query("SELECT * FROM Products WHERE productId = ?",[productId])

    if (!product) throw {name: "INVALID_PRODUCT_ID"}

    const [imgUris] = await this.connection.query("SELECT imgUri,productId FROM Images WHERE productId = ?",[productId])
    product.imgUris = imgUris.map(res => res.imgUri)

    const [[target]] = await this.connection.query("SELECT target,targetId FROM Targets WHERE targetId = ?",[product.targetId])

    product.target = target.target

    // const [comments] = await this.connection.query("SELECT c.commentId, u.userId, c.userId, c.productId, comment, name, lastName,createAt FROM Comments c INNER JOIN Users u ON u.userId = c.userId AND c.productId = ?",[product.productId])

    // product.comments = comments.map(res => {
    //   const {userId,productId,...restOfComment} = res
    //   return restOfComment 
    // })

    const {userId,targetId, ...restOfProduct} = product

    return restOfProduct
  }

  updateProducts = async ({title,description,targetId,price,quantity,productId}) => {
    const [a] = await this.connection.query(`
      UPDATE Products 
      SET title = ?,description = ?,targetId = ?,price = ?,quantity = ?
      WHERE productId = ?  
      `, [title,description,targetId,price,quantity,productId])
      
    if (a.affectedRows == 0) throw {name: "INVALID_PRODUCT_ID"}

    const [[product]] = await this.connection.query("SELECT * FROM Products WHERE productId = ?",[productId])

    if (!product) throw {name: "INVALID_PRODUCT_ID"}

    const [imgUris] = await this.connection.query("SELECT imgUri,productId FROM Images WHERE productId = ?",[productId])
    product.imgUris = imgUris.map(res => res.imgUri)

    const [[target]] = await this.connection.query("SELECT target,targetId FROM Targets WHERE targetId = ?",[product.targetId])
    product.target = target.target
    const {userId,targetId: t, ...restOfProduct} = product

    return restOfProduct
  }

  deleteProduct = async ({productId}) => {
    const [a] = await this.connection.query(`
      DELETE FROM Products WHERE productId = ? 
      `, [productId])

    if (a.affectedRows == 0) throw {name: "INVALID_PRODUCT_ID"}

    await this.connection.query(`
      DELETE FROM Comments WHERE productId = ? 
      `, [productId])
    return true
  }
}

export default Products