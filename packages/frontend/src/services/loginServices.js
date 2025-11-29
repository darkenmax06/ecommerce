const URI = "/api/login"

async function login ({email,password}){
  const options = {
    method: "POST",
    body: JSON.stringify({email,password}),
    headers: {
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
  login
}