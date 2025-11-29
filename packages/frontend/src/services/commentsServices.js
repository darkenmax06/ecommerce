const URI = "/api/comments"

async function getByProduct ({productId}){
  const uri = `${URI}/${productId}` 
  const res = await fetch(uri)
  const result = res.json()
  return result
}

async function create ({comment,productId,token}){
  const options = {
    method: "POST",
    body: JSON.stringify({comment,productId}),
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

  const result = await res.json()
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
  getByProduct,
  create,
  remove
}