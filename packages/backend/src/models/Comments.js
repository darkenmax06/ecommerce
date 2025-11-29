class Comments {
  constructor(connection){
    this.connection = connection
  }

  getByProductId = async ({productId}) => {
    const [comments] = await this.connection.query(`
      SELECT u.userId, c.userId, c.productId, comment,createAt, commentId, name, lastName FROM Comments c  INNER JOIN 
      parsed_user u ON u.userId = BIN_TO_UUID(c.userId) AND c.productId = ?`,[productId])
    return comments
  }

  createComment = async ({comment,userId,productId}) => {
    const [[product]] = await this.connection.query("SELECT * FROM Products WHERE productId = ?",[productId])
    if (!product) throw {name: "INVALID_PRODUCT_ID"}

    const [{insertId}] = await this.connection.query(`
      INSERT INTO Comments 
        (comment, productId,userId) VALUES
        (?,?,UUID_TO_BIN(?))  
      `, [comment,productId,userId]) 

      console.log(insertId)

    const [[commentToSend]] =await this.connection.query(`
      SELECT u.userId, c.userId, c.productId, comment,createAt, commentId, name, lastName FROM Comments c  INNER JOIN 
      parsed_user u ON u.userId = BIN_TO_UUID(c.userId) AND c.commentId = ?`,[insertId])

    return commentToSend
  }

  deleteComment = async ({commentId,userId}) => {
    const [[comment]] = await this.connection.query("SELECT userId FROM Comments WHERE userId = UUID_TO_BIN(?)",[userId])

    if (!comment) throw {name: "INVALID_USER_CREATOR"}

    const [a] = await this.connection.query(`
      DELETE FROM Comments WHERE commentId = ? 
      `, [commentId])

    if (a.affectedRows == 0) throw {name: "INVALID_COMMENT_ID"}
  }
}

export default Comments