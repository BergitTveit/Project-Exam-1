export function displayContactForm() {
  const contactFormContainer = document.querySelector("#contactForm");

  const formTitle = document.createElement("h1");
  formTitle.textContent = "Get in touch";

  const firstNameInput = createInput(
    "text",
    "Enter your first name",
    "firstName"
  );
  const lastNameInput = createInput("text", "Enter your last name", "lastName");
  const emailInput = createInput("email", "Enter your email", "email");
  const phoneNuImput = createInput("tel", "00000000", "phonenumber", true);

  const bridalRadio = createRadio(
    "enquiry",
    "bridal_radio",
    "wedding",
    "Bridal alterations"
  );
  const otherRadio = createRadio(
    "enquiry",
    "other_radio",
    "other",
    "Other enquiries"
  );

  const dateOfWedding = createDateInput(
    "dateOfWedding",
    "Date of the big day."
  );

  const alterationOption = createSelect(
    [
      "-- select alteration --",
      "Suit",
      "Trousers",
      "Dress",
      "Outerwear",
      "Repairs",
      "Custom",
      "Other Requests",
    ],
    "alteration"
  );

  //Is the -- select alteration-- choseable? Make sure to make it not a valid option.

  const messageLabel = document.createElement("span");
  messageLabel.textContent = "What do you need help with?";
  const subjectInput = createInput("text", "Short description", "subject");
  const messageTextarea = document.createElement("textarea");
  messageTextarea.id = "message";
  messageTextarea.rows = "7";

  const sendContactFormButton = document.createElement("button");
  sendContactFormButton.textContent = "Send us your message/enquiries";
  sendContactFormButton.onclick = sendContactForm();

  bridalRadio.addEventListener("change", function () {
    dateOfWedding.style.display = document.getElementById("bridal_radio")
      .checked
      ? "block"
      : "none";
    alterationOption.style.display = "none";
  });
  otherRadio.addEventListener("change", function () {
    alterationOption.style.display = document.getElementById("other_radio")
      .checked
      ? "block"
      : "none";
    dateOfWedding.style.display = "none";
  });

  contactForm.appendChild(formTitle);
  contactForm.appendChild(firstNameInput);
  contactForm.appendChild(createLineBreak());
  contactForm.appendChild(lastNameInput);
  contactForm.appendChild(createLineBreak());
  contactForm.appendChild(emailInput);
  contactForm.appendChild(createLineBreak());
  contactForm.appendChild(phoneNuImput);
  contactForm.appendChild(createLineBreak());
  contactForm.appendChild(bridalRadio);
  contactForm.appendChild(otherRadio);
  contactForm.appendChild(createLineBreak());
  contactForm.appendChild(dateOfWedding);
  contactForm.appendChild(createLineBreak());
  contactForm.appendChild(alterationOption);
  contactForm.appendChild(createLineBreak());
  contactForm.appendChild(messageLabel);
  contactForm.appendChild(createLineBreak());
  contactForm.appendChild(subjectInput);
  contactForm.appendChild(createLineBreak());
  contactForm.appendChild(messageTextarea);
  contactForm.appendChild(createLineBreak());
  contactForm.appendChild(sendContactFormButton);
  contactForm.appendChild(createLineBreak());
}
// Name (Should be more than 5 characters long)
// Email address (Must be a valid email address)
// Subject (Should be more than 15 characters long)
// Message content (Should be more than 25 characters long)

function createInput(type, placeholder, id, hasPhonePattern = false) {
  const input = document.createElement("input");
  input.type = type;
  input.placeholder = placeholder;
  input.id = id;
  if (hasPhonePattern) {
    input.pattern = "[0-9]{8}";

    console.log("CHECKING INPUT PATTERN:", input.pattern, input.type, input.id);
    input.onchange = function () {
      this.value = addSpacesToPhoneNumber(this.value);
    };
  }

  return input;
} // ASK MILENA
function addSpacesToPhoneNumber(initial) {
  initial = initial.replace(/([0-9]{8})/);
  initial = initial.replace(/([0-9]{3}) ([0-9]{2}) ([0-9]{3})/, "$1 $2");
  console.log(type.initial);
  return initial;
}

function createRadio(name, id, value, label) {
  const radio = document.createElement("input");
  radio.type = "radio";
  radio.name = name;
  radio.id = id;
  radio.value = value;

  const radioLabel = document.createTextNode(" " + label);
  const container = document.createElement("label");
  container.appendChild(radio);
  container.appendChild(radioLabel);

  return container;
}

function createDateInput(id, placeholder) {
  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.id = id;
  dateInput.style.display = "none";
  dateInput.placeholder = placeholder || "Date of the big day";
  return dateInput;
}

function createSelect(options, id) {
  const select = document.createElement("select");
  select.id = id;
  console.log("log 1", id);
  select.style.display = "none";

  options.forEach((optionText) => {
    const option = document.createElement("option");
    option.value = optionText;
    option.text = optionText;

    select.appendChild(option);
  });
  // disableFirstSelectOption(id);

  return select;
}
// ASK MILENA
// function disableFirstSelectOption(selectId) {
//   console.log("log 2", selectId);
//   console.log("log 3", typeof selectId);
//   let selectDropdown = document.getElementById(selectId);

//   console.log("log 4", selectDropdown);
//   let selectionOptions = selectDropdown.getElementsByTagName("option");
//   selectionOptions[0].disabled = true;
// }

function createLineBreak() {
  return document.createElement("br");
}

function sendContactForm() {
  // Make this, how to send it to the api? Can i solve this?
}

// <form onsubmit="return false"></form>
displayContactForm();
