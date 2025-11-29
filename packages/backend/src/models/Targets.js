class Targets {
  constructor(connection){
    this.connection = connection
  }

  createTarget = async ({target}) => {
    await this.connection.query(`
      INSERT INTO Targets 
        (target) VALUES
        (?)  
      `, [target]) 

    const [[targetToSend]] = await this.connection.query("SELECT * FROM Targets WHERE target=?",[target])
    return targetToSend
  }

  getAll = async () => {
    const [targets] = await this.connection.query("SELECT * FROM Targets")
    return targets
  }

  getById = async ({targetId}) => {
    const [[targets]] = await this.connection.query("SELECT * FROM Targets WHERE targetId = ?",[targetId])
    return targets
  }

  updateTarget = async ({targetId,target}) => {
    const [a] = await this.connection.query(`
      UPDATE Targets 
      SET target = ?
      WHERE targetId = ?  
      `, [target,targetId])
      
    if (a.affectedRows == 0) throw {name: "INVALID_TARGET_ID"}

    const [[targetToSend]] = await this.connection.query("SELECT * FROM Targets WHERE targetId=?",[targetId])

    return targetToSend
  }

  deleteTarget = async ({targetId}) => {
    const [products] = await this.connection.query("SELECT * FROM Products WHERE targetId = ?",[targetId])

    if (products && products.length > 0)throw {name: "EXISTING_ELEMENTS_WIDTH_THIS_TARGET"}

    const [a] = await this.connection.query(`
      DELETE FROM Targets WHERE targetId = ? 
      `, [targetId])

    if (a.affectedRows == 0) throw {name: "INVALID_TARGET_ID"}
    return true
  }
}

export default Targets

