import cleanAndValidatePhoneNumber from "./cleanAndValidatePhoneNumber"

function validateUser({ name, lastName, cityId, provinceId, street, password, phone, email, showError, confirmPassword }) {
    
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
    
    if (!validateText(name, "Nombre")) return false;
    if (!validateText(lastName, "Apellido")) return false;
    if (!provinceId) {
      showError(`El campo Provincia debe ser seleccionado.`);
      return false;
    }
     if (!cityId) {
      showError(`El campo localidad debe ser selecionado.`);
      return false;
    }
    if (!validateText(street, "Calle",100,2)) return false;


    const validatedNumber = cleanAndValidatePhoneNumber(phone, showError);
    if (validatedNumber === null) {
        return false;
    }
 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
        showError("El formato del email no es válido.");
        return false;
    }

    if (!validateText(password, "password",50,8)) return false;

    if (password !== confirmPassword) {
       showError(`las contraseñas no coinciden`);
       return false;
    }


    return true;
}

export default validateUser