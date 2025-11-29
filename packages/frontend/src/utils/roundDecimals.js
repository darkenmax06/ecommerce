function roundDecimals ({number}){
  const divide = number.toString().split(".")
  let [int,float] = divide

  if (!float) return parseInt(int) 
    
  float = float.substring(0,2)
  
  const merge = int.concat(".").concat(float)
  const result = parseFloat(merge)

  return result
}

export {
  roundDecimals
}