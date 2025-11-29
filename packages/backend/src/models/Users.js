class Users {
  constructor(connection){
    this.connection = connection
  }

  createUser = async ({name,lastName,provinceId,cityId,street,reference,phone,email,password}) => {
    console.log(password)
    const type = "buyer"
    const uuid = crypto.randomUUID()

    const [[province]] = await this.connection.query("SELECT * FROM Provinces WHERE provinceId = ?", [provinceId])
    if (!province) throw {name: "INVALID_PROVINCE_ID"}

    const [[city]] = await this.connection.query("SELECT * FROM Cities WHERE cityId = ?", [cityId])
    if (!city) throw {name: "INVALID_CITY_ID"}
    

    await this.connection.query(`
      INSERT INTO Users 
        (userId, name,lastName,type,provinceId,cityId,street,reference,phone,email,password) VALUES
        (UUID_TO_BIN(?),?,?,?,?,?,?,?,?,?,?)  
      `, [uuid,name,lastName,type,provinceId,cityId,street,reference,phone,email,password]) 

    const [[userData]] = await this.connection.query("SELECT * FROM parsed_user WHERE userId = ?",[uuid])
    const {password:p,...userToSend} = userData
    return userToSend
  }

  updateUser = async ({name,lastName,provinceId,cityId,street,reference,phone,email,password,userId}) => {
    const [[province]] = await this.connection.query("SELECT * FROM Provinces WHERE provinceId = ?", [provinceId])
    if (!province) throw {name: "INVALID_PROVINCE_ID"}

    const [[city]] = await this.connection.query("SELECT * FROM Cities WHERE cityId = ?", [cityId])
    if (!city) throw {name: "INVALID_CITY_ID"}

    const [a] = await this.connection.query(`
      UPDATE Users 
      SET name = ?,lastName = ?,provinceId = ?,cityId = ?,street = ?,reference = ?,phone = ?,email = ?,password = ?
      WHERE userId = UUID_TO_BIN(?)  
      `, [name,lastName,provinceId,cityId,street,reference,phone,email,password,userId])

      
    if (a.affectedRows == 0) throw {name: "INVALID_USER_ID"}

    const [[userData]] = await this.connection.query("SELECT * FROM parsed_user WHERE userId = ?",[userId])
    const {password:p,...userToSend} = userData
    return userToSend
  }

  getById = async ({userId}) => {
    const [[userData]] = await this.connection.query("SELECT * FROM parsed_user WHERE userId = ?",[userId])
    if (!userData) throw {name: "INVALID_USER_ID"}
    const {password,...userToSend} = userData
    return userToSend
  }

  getByEmail = async ({email}) => {
    console.log("email ",email)
    const [[user]] = await this.connection.query("SELECT * FROM parsed_user WHERE email = ?",[email])
    console.log("user ",user)
    return user
  }
}

export default Users

