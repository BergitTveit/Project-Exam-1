export function displayContactForm() {
  const contactFormContainer = document.querySelector(".form");
  const contactform = document.createElement("div");

  const formTitle = document.createElement("h1");
  formTitle.textContent = "Get in touch";

  contactFormContainer.appendChild(contactform);
  contactform.appendChild(formTitle);
}



<form onsubmit="return false">
</form>


<input type="text" placeholder="Enter your last name" id="lastName" />
<br></br>
<input type="text" placeholder="Enter your first name" id="firstName" />
<br></br>
<input type="radio" id="bridal" name="enquiry" value="wedding"> Bridal alterations
 <input type="radio" id="other" name="enquiry" value="other"> Other enquiries
 <br></br>
 <input type="email" placeholder="Enter your email" id="email" />
    

 {/* IF other show options*/}
<select id="alteration">
 <option disabled selected value> -- select alteration -- </option>
 <option value="Suit">Suit</option>
 <option value="Trousers">Trousers</option>
 <option value="Dress">Dress</option> 
 <option value="Outerwear">Outerwear</option>
 <option value="Repairs">Repairs</option>
 <option value="Custom">Custom requests</option>
</select>
<br><br></br>
<span>What is your question?</span>
<br>
<textarea id="question" rows="4"></textarea>
<br><br>
<button onclick="sendContact();">Send contact</button>



{/* /* CREATE A FORM : NAME. LAST NAME, EMAIL, Tel Number, TEXT/ENQUIRY, OPTION BUTTONS: If BRIDAL : Show DATE OF WEDDING */ */}
'