class Status {
  constructor(connection){
    this.connection = connection
  }

  getAll = async () => {
    const [status]  = await this.connection.query("SELECT * FROM Status")
    return status
  }
}

export default Status