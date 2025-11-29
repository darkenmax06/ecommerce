const PROVINCE_URI = "/api/provinces"
const CITY_URI = "/api/cities"

async function getProvinces (){
  const uri = `${PROVINCE_URI}` 
  const res = await fetch(uri)
  const result = res.json()
  return result
}

async function gerProvinceByName ({province}){
  const uri = `${PROVINCE_URI}/${province}` 
  const res = await fetch(uri)
  const result = res.json()
  return result
}


async function getCityByProvinceId ({provinceId}){
  const uri = `${CITY_URI}/${provinceId}` 
  const res = await fetch(uri)
  const result = res.json()
  return result
}


async function update ({shippingPrice,token,provinceId}){
  const options = {
    method: "PATCH",
    body: JSON.stringify({shippingPrice}),
    headers: {
      "Authorization": `Bearer ${token}`,
      "content-type": "application/json"
    }
  }

  const res = await fetch(`${PROVINCE_URI}/${provinceId}`,options)

  if (!res.ok){
    const {error} = await res.json()
    throw error
  }

  const result = await res.json()
  return result
}


export {
  getProvinces,
  getCityByProvinceId,
  gerProvinceByName,
  update
}