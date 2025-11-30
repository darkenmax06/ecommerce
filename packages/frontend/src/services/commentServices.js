const URL = "/api/contact"

async function createComment(comment){
  const options = {
    method: "POST",
    body: JSON.stringify(comment),
    headers: {"content-type": "application/json"}
  }

  const res = await fetch(URL,options)
  const response = await res.json()

  if (!res.ok) throw {error: response.error}
  else return response
}


export {createComment}