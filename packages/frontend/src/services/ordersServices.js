const URI = "/api/orders"

async function getOrders ({token}){
  const options = {headers: {"Authorization": `Bearer ${token}`}}

  const res = await fetch(`${URI}/users`,options)
  const result = res.json()
  return result
}

async function getAllorders ({token}){
  const options = {headers: {"Authorization": `Bearer ${token}`}}

  const res = await fetch(URI,options)
  const result = res.json()
  return result
}

async function getByOrderId ({orderId,token}){
  const options = {headers: {"Authorization": `Bearer ${token}`}}

  const res = await fetch(`${URI}/${orderId}`,options)
  const result = res.json()
  return result
}

async function update (statusId,token,orderId){

  const options = {
    method: "PATCH",
    body: JSON.stringify({statusId}),
    headers: {
      "content-type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  }

  const res = await fetch(`${URI}/${orderId}`,options)

  if (!res.ok){
    const {error} = await res.json()
    throw error
  }

  const result = res.json()
  return result
}

async function buyItem ({products,token}){
  const options = {
    method: "POST",
    body: JSON.stringify({products}),
    headers: {
      "Authorization": `Bearer ${token}`,
      "content-type": "application/json"
    }
  }

  const res = await fetch(URI,options)

  if (!res.ok){
    const {error} = await res.json()
    throw error
  }

  const result = res.json()
  return result
}

export {
  getOrders,
  getByOrderId,
  getAllorders,
  update,
  buyItem
}