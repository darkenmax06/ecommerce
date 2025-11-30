function validateProduct({ title, description, quantity, price, target,showError, imgUris,edit }) {
    
    const validateText = (field, fieldName,MAX_LENGTH=50,MIN_LENGTH=2) => {
        const trimmed = field.trim();
        if (trimmed.length < MIN_LENGTH) {
            showError(`El campo ${fieldName} debe tener al menos ${MIN_LENGTH} caracteres.`);
            return false;
        }
        if (trimmed.length > MAX_LENGTH) {
            showError(`El campo ${fieldName} no debe exceder los ${MAX_LENGTH} caracteres.`);
            return false;
        }
        return true;
    };

    const validateNumber = (field, fieldName,min=1) => {
        if (field < min) {
            showError(`El minimo para el campo ${fieldName} es de: ${min}.`);
            return false;
        }
        return true;
    };    
    
    if (!validateText(title, "Titulo")) return false;
    if (!validateText(description, "Descripcion")) return false;
    if (!validateNumber(target, "Categoria")) return false;
    if (!validateNumber(quantity, "Cantidad")) return false;
    if (!validateNumber(price, "Precio")) return false;

    if (edit) return true

    if (imgUris.length < 1) {
      showError("Para crear un producto es requerido almenos 2 imagenes")
      return false
    }

    for (let img of imgUris){
      if (img.size > 5000000){
         showError(`EL tamaño de las imagenes seleccionadas no puede ser mayor a  5MB.`);
         return false
      }

    }
    return true;
}

export default validateProduct