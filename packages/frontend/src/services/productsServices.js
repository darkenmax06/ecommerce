const URI = "/api/products"

async function getProducts (){
  const res = await fetch(URI)
  const result = res.json()
  return result
}

async function getProduct ({productId}){
  const uri = `${URI}/${productId}` 
  const res = await fetch(uri)
  const result = res.json()
  return result
}

async function create (product,token){
  const options = {
    method: "POST",
    body: product,
    headers: {
      "Authorization": `Bearer ${token}`
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

async function update (product,token,userId){

  const options = {
    method: "PATCH",
    body: JSON.stringify(product),
    headers: {
      "content-type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  }

  const res = await fetch(`${URI}/${userId}`,options)

  if (!res.ok){
    const {error} = await res.json()
    throw error
  }

  const result = res.json()
  return result
}

async function remove (token,userId){

  const options = {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }

  const res = await fetch(`${URI}/${userId}`,options)

  if (!res.ok){
    const {error} = await res.json()
    throw error
  }

  const result = res.json()
  return result
}

export {
  getProducts,
  create,
  getProduct,
  update,
  remove
}