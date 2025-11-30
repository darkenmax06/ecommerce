import { useState, useEffect } from "react";
import { getCityByProvinceId, getProvinces, update } from "../services/addressServices";
import useUser from "./useUser";

function useAddress ({province: p, city: c}){
  const [city,setCity] = useState(null) 
  const [cities,setCities] = useState(null) 
  const [province,setProvince] = useState(null)
  const [provinces,setProvinces] = useState(null)
  const {token} = useUser()


  useEffect(()=> {
    const load = async ()=> {
      if (c && p){
        try {
          const PROVINCES = await getProvinces()
          const provinceToSave = PROVINCES.find(res => res.province == p)

          const CITIES = await getCityByProvinceId({provinceId: provinceToSave.provinceId})
          const cityToSave = CITIES.find(res => res.city == c)

          setProvince(provinceToSave)
          setProvinces(PROVINCES)

          setCities(CITIES)
          setCity(cityToSave)
        }catch(err ){
          console.log(err)
        }
      } else {
        try {
          const p = await getProvinces()
          setProvinces(p)
        }catch(err ){
          console.log(err)
        }
      }
    }

    load()
  },[p,c])


  useEffect(()=> { 
    const load = async ()=> {
      if (province){
        try {
          const c = await getCityByProvinceId({provinceId: province.provinceId})
          setCities(c)
        }catch(err ){
          console.log(err)
        }
      }
    }

    load()
  },[province])

  const updatePrice = async ({shippingPrice,provinceId}) => {
    if (shippingPrice < 1) return alert("El precio no puede ser negativo")

    try {
      const result = await update({shippingPrice,provinceId,token})
      return result
    }catch(err){
      console.log(err)
    }
  }

  const updateCity = (city) => {
    const c = cities.find(res => res.city == city.trim())
    setCity(c)
    return c.cityId
  }
  const updateProvince = (province) => {
    const p = provinces.find(res => res.province == province.trim())
    setProvince(p)
    return p.provinceId
  }

  return {
    city,
    province,
    cities,
    provinces,
    updateCity,
    updateProvince,
    updatePrice
  }
}

export default useAddress