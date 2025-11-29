const URI = "/api/targets"

async function getTags (){
  const res = await fetch(URI)
  const result = res.json()
  return result
}

async function getById (targetId){
  const res = await fetch(`${URI}/${targetId}`)
  const result = res.json()
  return result
}


async function create (product,token){
  const options = {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "content-type": "application/json",
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

async function update (target,targetId,token){
  const options = {
    method: "PATCH",
    body: JSON.stringify(target),
    headers: {
      "content-type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  }

  const res = await fetch(`${URI}/${targetId}`,options)

  if (!res.ok){
    const {error} = await res.json()
    throw error
  }

  const result = res.json()
  return result
}

export {
  getTags,
  create,
  getById,
  remove,
  update
}