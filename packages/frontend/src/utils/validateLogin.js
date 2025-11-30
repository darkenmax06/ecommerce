function validateLogin({  password, email, showError }) {
    
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
 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
        showError("El formato del email no es válido.");
        return false;
    }

    if (!validateText(password, "password",50,8)) return false;

    return true;
}

export default validateLogin