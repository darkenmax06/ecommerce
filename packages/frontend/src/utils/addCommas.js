

function addCommas(num) {
  return new Intl.NumberFormat('en-AR').format(num);
}

export default addCommas