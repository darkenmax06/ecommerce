class Provinces {
  constructor(connection){
    this.connection = connection
  }

  getByName = async ({province}) => {
    const [[provinceToSend]] = await this.connection.query(`SELECT * FROM Provinces WHERE province = ?`,[province])
    return provinceToSend
  }

  getAll = async () => {
    const [provinces] = await this.connection.query(`SELECT * FROM Provinces`)
    return provinces
  }

  updatePrice = async ({provinceId,shippingPrice}) => {
    const [a] = await this.connection.query(`
      UPDATE Provinces 
      SET shippingPrice = ?
      WHERE provinceId = ?  
      `, [shippingPrice,provinceId])
      
    if (a.affectedRows == 0) throw {name: "INVALID_PROVINCE_ID"}

    const [[province]] = await this.connection.query("SELECT * FROM Provinces WHERE provinceId=?",[provinceId])

    return province
  }
}

export default Provinces