const form = document.getElementById("form");
const userName = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("ConfirmPassword");
const submitButton = document.querySelector("button");

//check required fields
function checkRequired(formFields) {
  formFields.forEach((field, i) => {
    if (field.value.trim() === "") {
      showError(field, `${getFieldName(field)} is required`);
    } else {
      showSuccess(field);
    }
  });
}

//checking the length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be atleast ${min} characters `
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters `
    );
  } else {
    showSuccess(input);
  }
}

//Maling the field name to capital
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//validating the email
function validateEmail(email) {
  const errorMessage = "Email is not valid";
  function validateEmailRegex(email) {
    //validating the email using regex
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  if (validateEmailRegex(email.value)) {
    showSuccess(email);
  } else {
    showError(email, errorMessage);
  }
}

function validatePassword(password) {
  var passwordExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  if (passwordExp.test(password.value)) {
    showSuccess(password);
  } else {
    showError(
      password,
      "Password must have a alphabet, number, special character with length 6-16 "
    );
  }
}

//validating password matche
function validatePasswords(password, confirmPassword) {
  if (password.value === confirmPassword.value) {
    showSuccess(confirmPassword);
  } else {
    showError(confirmPassword, "Passwords do not match");
  }
}

//Show error message and add error class
function showError(input, errorMessage) {
  const formControl = input.parentElement; //this will get the parent element
  formControl.className = "form-control error";
  formControl.querySelector("small").innerHTML = errorMessage;
}

//add success class
function showSuccess(input) {
  const formControl = input.parentElement; //this will get the parent element
  formControl.className = "form-control success";
}

//event listener on submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  //console.log(e);
  checkRequired([userName, email, password, confirmPassword]);
  checkLength(userName, 3, 15);
  //checkLength(password, 6, 25);
  validateEmail(email);
  validatePassword(password);
  validatePasswords(password, confirmPassword);
});
