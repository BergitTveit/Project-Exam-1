function validateTextField(fieldId, minLength) {
  let fieldValue = document.getElementById(fieldId).value;
  console.log("FIELDVALDUE", fieldValue, fieldId);
  if (fieldValue.trim() === "" || fieldValue.length < minLength) {
    alert(`${fieldId} must be longer than ${minLength}`);
    return false;
  } else {
    return true;
  }
}

function validateEmail(emailId) {
  let emailValue = document.getElementById(emailId).value;
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailValue)) {
    alert(`${fieldId} not a valid email adresss.`);
    return false;
  } else {
    return true;
  }
}
function validatePhoneNumber(phoneNumberId) {
  let phoneValue = document.getElementById(phoneNumberId).value;
  let phoneRegex = /^\d{8}$/;
  if (!phoneRegex.test(phoneValue)) {
    alert(`${phoneNumberId} not a valid phone number.`);
    return false;
  } else {
    return true;
  }
}

function validateDateofWedding(DOWId) {
  let dateValue = document.getElementById(DOWId).value;
  let selectedDate = new Date(dateValue);
  let todayDate = Date.now();
  let minDate = new Date(todayDate.getTime() + 3 * 7 * 24 * 60 * 60 * 1000);

  if (selectedDate < minDate) {
    alert("Online requests must be made three weeks before, if not call.");
    //  (INSERT TEXT OR CALL FUNCTION???)
    return false;
  } else {
    return true;
  }
}

function validateContactForm() {
  if (!validateTextField("firstName", 5)) {
    return false;
  }

  if (!validateTextField("lastName", 5)) {
    return false;
  }
  if (!validateTextField("subject", 15)) {
    return false;
  }
  if (!validateTextField("message", 25)) {
    return false;
  }
  if (!validateEmail("email")) {
    return false;
  }
  if (!validatePhoneNumber("phonenumber")) {
    return false;
  }
  return true;
}
validateContatForm();
