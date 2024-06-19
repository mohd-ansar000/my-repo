// Function to parse query string parameters from the URL


function getQueryParams(qs) {
    qs = qs.substring(1);   // remove leading  '?' from the beginning
    let params = {};        // Creates an empty object params. Which will hold key-value pairs
    let tokens = qs.split("&");       // Split the query string into array tokens using delimiter &
    for (let i = 0; i < tokens.length; i++) { // This loop goes through each token in the array
        // Split each token into key and value using '=' as delimiter
        let pairs = tokens[i].split("=");

        // decodeURIComponent is used to decode any percent encoded characters in key and value
        let key = decodeURIComponent(pairs[0]);
        let value = decodeURIComponent(pairs[1] || "");
        // Replace + with space in the value
        value = value.replace(/\+/g, ' ');

        // Add key-value pairs to the params object
        params[key] = value;
    }
    // Returns the params object
    return params;
}

// Get query parameters from the URL
let queryParams = getQueryParams(window.location.search);

// Extract the First Name from the Full Name
function getFirstName(fullName) {
    fullName = fullName.trim();
    const nameParts = fullName.split(' ');
    return nameParts[0];
}

let firstName = getFirstName(queryParams.fullname);
let email = queryParams.email;


// Generate a 4-digit random number
let otp = Math.floor(1000 + Math.random() * 9000);
console.log("Generated OTP: ", otp);

// Store data in sessionStorage
sessionStorage.setItem('firstName', firstName);
sessionStorage.setItem('email', email);
sessionStorage.setItem('otp', otp);

// Retrieve data from sessionStorage
firstName = sessionStorage.getItem('firstName');
email = sessionStorage.getItem('email');
otp = sessionStorage.getItem('otp');

// Shows the complete message to the user
let messageElement = document.getElementById("message");
messageElement.innerHTML = `Dear ${firstName}<br>Thank you for your inquiry. A 4 digit verification number has been sent to your email: <b>${email}</b>, please enter it in the following box and submit for confirmation:`;

// Validate OTP function
let attempts = 0;
function validateOTP() {
    let enteredOtp = document.getElementById('otp').value;
    let otpError = document.getElementById('otp-error');

    // Retrieve the verification number from sessionStorage
    let storedOtp = sessionStorage.getItem('otp');

    // If user entered otp matches with random generated otp then
    if (enteredOtp == storedOtp) {
        document.getElementById('otp-form').innerHTML = 'Validation Successful!';
        setTimeout(function() {
            window.location.href = 'https://www.pixel6.co'; // Redirect to Pixel6 home page 
        }, 2000);

        // user entered otp does not match with random generated otp
    } else {
        attempts++;
        if (attempts >= 3) {
            document.getElementById('otp-form').innerHTML = 'Validation Failed!';
            setTimeout(function() {
                window.location.href = 'https://www.pixel6.co/404'; // Redirect to 404 page (optional)
            }, 2000);
        } else {
            otpError.innerHTML = 'Invalid OTP, please try again.';
            document.getElementById('otp').value = '';
        }
    }
}
