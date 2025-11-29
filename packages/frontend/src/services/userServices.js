const URI = "/api/users"

async function Update (user,token){
  const options = {
    method: "PATCH",
    body: JSON.stringify(user),
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

async function create (user){
  const options = {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "content-type": "application/json",
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
  Update,
  create
}