class Cities {
  constructor(connection){
    this.connection = connection
  }
  getByProvinceId = async ({cityId}) => {
    const [cities] = await this.connection.query(`SELECT * FROM Cities WHERE provinceId = ?`,[cityId])
    return cities
  }
}

export default Cities