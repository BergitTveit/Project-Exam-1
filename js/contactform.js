export function displayContactForm() {
  const contactFormContainer = document.querySelector("#contactForm");
  // const contactform = document.createElement("div");

  const formTitle = document.createElement("h1");
  formTitle.textContent = "Get in touch";

  const firstNameInput = createInput(
    "text",
    "Enter your first name",
    "firstName"
  );
  const lastNameInput = createInput("text", "Enter your last name", "lastName");
  const emailInput = createInput("email", "Enter your email", "email");
  // Create telefon number input
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
    ],
    "alteration"
  );

  //Is the -- select alteration-- choseable? Make sure to make it not a valid option.

  const messageLabel = document.createElement("span");
  messageLabel.textContent = "What do you need help with?";

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
  contactForm.appendChild(bridalRadio);
  contactForm.appendChild(otherRadio);
  contactForm.appendChild(createLineBreak());
  contactForm.appendChild(dateOfWedding);
  contactForm.appendChild(createLineBreak());
  contactForm.appendChild(alterationOption);
  contactForm.appendChild(createLineBreak());
  contactForm.appendChild(messageLabel);
  contactForm.appendChild(createLineBreak());
  contactForm.appendChild(messageTextarea);
  contactForm.appendChild(createLineBreak());
  contactForm.appendChild(sendContactFormButton);
  // contactFormContainer.appendChild(contactForm);
}

function createInput(type, placeholder, id) {
  const input = document.createElement("input");
  input.type = type;
  input.placeholder = placeholder;
  input.id = id;
  return input;
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
  select.style.display = "none";

  options.forEach((optionText) => {
    const option = document.createElement("option");
    option.value = optionText;
    option.text = optionText;
    select.appendChild(option);
  });

  return select;
}

function createLineBreak() {
  return document.createElement("br");
}

function sendContactForm() {
  // Make this, how to send it to the api? Can i solve this?
}

// <form onsubmit="return false"></form>
displayContactForm();
