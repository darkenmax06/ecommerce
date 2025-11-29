const URI = "/api/status"

async function getStatus ({token}){
  const options = {
    headers: {
      "authorization": `Bearer ${token}`
    }
  }
  const res = await fetch(URI,options)
  const result = res.json()
  return result
}


export {
  getStatus
}