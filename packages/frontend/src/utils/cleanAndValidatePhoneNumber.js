

function cleanAndValidatePhoneNumber(rawNumber, showError) {
    const cleanedNumber = rawNumber.replace(/[()\-\s]/g, '');

    if (!/^\d+$/.test(cleanedNumber)) {
        showError("El número de teléfono solo debe contener dígitos (aparte de guiones o paréntesis opcionales).");
        return null;
    }

    if (cleanedNumber.length !== 10) {
        showError("El número de teléfono debe tener exactamente 10 dígitos.");
        return null;
    }

    return cleanedNumber;
}

export default cleanAndValidatePhoneNumber