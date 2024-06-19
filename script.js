/* Accessing all error elements from index.html file to script.js file */

var fullnameError = document.getElementById("fullname-error");
var emailError = document.getElementById("email-error");
var panError = document.getElementById("pan-error");
var amountError = document.getElementById("amount-error");
var submitError = document.getElementById("submit-error");
var amountInWords = document.createElement("span");
var emiDisplay = document.getElementById("emi-display");
emiDisplay.id = "emi-display";
document.getElementById("amount").parentNode.appendChild(emiDisplay);
var emibtn = document.getElementById("emi-btn");



// Function to validate Full Name
function validateFullName() {
  var fullname = document.getElementById("fullname").value;
  // Regular expression to validate fullName
  // Only Alphabets & speces allowed. Min 2 words each with minimum 4 characters.
  var regex = /^[A-Za-z]{4,}\s[A-Za-z]{4,}(\s[A-Za-z]{4,})*$/;


  // If full name is left blank then
  if (fullname.length == 0) {
    fullnameError.innerHTML = " **Full Name is required";
    return false;
  }

  // if full name does not match with given regular expression then
  if (!regex.test(fullname)) {
    fullnameError.innerHTML =
      " **Minimum 2 words each with atleast 4 characters";
    return false;
  }

  // if Numeric value is entered in the fullName field then
  if (!fullname.match(/^[A-Za-z\s]*$/)) {
    fullnameError.innerHTML = " **Numeric characters are not allowed";
    return false;
  }
 
  // Minimum 4 characters are required
  if (fullname.length < 4) {
    fullnameError.innerHTML = " **Minimum 4 characters required";
    return false;
  }

  // Maximum 20 characters are allowed
  if (fullname.length > 20) {
    fullnameError.innerHTML = " **Full Name should be less than 20 characters";
    return false;
  }

  // Returns true if fullName meets required conditions
  fullnameError.innerHTML = "Valid";
  return true;
}

// Function to validate Email
function validateEmail() {
  var emailId = document.getElementById("email-id").value;

  //Regular expression to validate Email
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  // If Email ID is left blank then
  if (emailId.length == 0) {
    emailError.innerHTML = " **Email is required";
    return false;
  }

  // If Email ID does not match with regular expression then
  if (!regex.test(emailId)) {
    emailError.innerHTML = " **Invalid Email";
    return false;
  }

  // Returns true if Email ID matches with all valid conditions
  emailError.innerHTML = "Valid";
  return true;
}

// Function to validate PAN Card
function validatePAN() {
  var panCardNo = document.getElementById("pan-no").value;


  // Regular expression to validate PAN Card No
  /* 1. Alphanumeric
     2. Min. 10 Characters
     3. must be in this format ABCDE1234F
     */
  let regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;


  // If PAN field is left blank
  if (panCardNo.length == 0) {
    panError.innerHTML = " **PAN is required";
    return false;
  }

  // If PAN does not match with above regular expression then
  if (!regex.test(panCardNo)) {
    panError.innerHTML = " **Invalid PAN";
    return false;
  }

  // If PAN match with all valid conditions. i.e PAN's regular expression
  panError.innerHTML = "Valid";
  return true;
}

// Function to calculate EMI
function calculateEMI() {
  var principal = parseFloat(document.getElementById("amount").value);
  var annualInterestRate = 8.5; // Hardcoded annual interest rate (8.5% per annum)
  var years = 15; // Hardcoded loan term in years


  // If principal = 0 or it is NaN then
  if (isNaN(principal) || principal <= 0) {
    amountError.innerHTML = " **Invalid loan amount";
    emiDisplay.innerHTML = "";
    return false;
  }


  // Calculating monthly interest rate from annual interest rate and no. of installments
  let monthlyInterestRate = annualInterestRate / 12 / 100;
  let numberOfMonths = years * 12;
  let emi =
    (principal *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, numberOfMonths)) /
    (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1);

    // Displaying EMI value to the user
  emiDisplay.innerHTML = "Rs. " + emi.toFixed(2);
  return true;
}

// Function to validate Loan Amount
function validateLoanAmount() {
  var loanAmount = document.getElementById("amount").value;


  // If Amount = 0 then
  if (loanAmount.length == 0) {
    amountError.innerHTML = " **Loan amount is required";
    emiDisplay.innerHTML = "";
    return false;
  }

  // If Amount is not a number
  if (isNaN(loanAmount)) {
    amountError.innerHTML = " **Loan amount must be numeric";
    // amountInWords.innerHTML = '';
    emiDisplay.innerHTML = "";
    return false;
  }

  // Converting Amount from string to number
  loanAmount = Number(loanAmount);

  // If Amount is 0 or less than 0
  if (loanAmount <= 0) {
    amountError.innerHTML = " **Loan amount can't be 0";
    emiDisplay.innerHTML = "";
    return false;
  }

  // If Amount is more than 9 digits
  if (loanAmount > 999999999) {
    amountError.innerHTML = " **Loan amount can't be more than 9 digits.";
    emiDisplay.innerHTML = "";
    return false;
  }
  // If user entered a valid Loan Amount
  amountError.innerHTML = "Valid";
  return true;
}

// Function to validate Data while the submit button is clicked by the user
function validateForm(event) {
// Storing boolean values of all the function in variables.
  var isValidFullName = validateFullName();
  var isValidEmailId = validateEmail();
  var isValidPAN = validatePAN();
  var isValidLoanAmonut = validateLoanAmount();

  // If all functions returns true values then & only then form should be submitted
  if (isValidFullName && isValidEmailId && isValidPAN && isValidLoanAmonut) {
    return true;
  } else {
    // If any one of the values is false then
    submitError.innerHTML = "Please fix the errors to submit";
    return false;
  }
}


